import { BalancesService } from '@modules/balances/balanaces.service';
import { StatusesService } from '@modules/statuses/statuses.service';
import { TransactionsTypesService } from '@modules/transactionTypes/transactionTypes.service';
import { Transactions } from '@prisma/client';
import { validateOrReject } from 'class-validator';
import { CreateTransactions, GetById, UpdateStatusTransactions } from './dto';
import { TransactionCreate, TransactionsWithoutIds } from './models';
import { TransactionsRepository } from './transactions.repository';

export class TransactionsService {
    private transactionsRepository = new TransactionsRepository();
    private transactionsTypesService = new TransactionsTypesService();
    private statusService = new StatusesService();
    private balanceService = new BalancesService();

    async create({ userId, type, amount }: TransactionCreate) {
        const newUser = new CreateTransactions({
            userId,
            amount,
            type,
        });
        await validateOrReject(newUser);
        const transactionType =
            await this.transactionsTypesService.getIdTypeTransactionTypeByName(
                type
            );
        const objectTransaction = {
            amount,
            idType: transactionType,
            idUser: userId,
        };

        let transaction: Transactions | undefined = undefined;

        if (type === 'Deposit') {
            transaction = await this.transactionsRepository.create({
                ...objectTransaction,
                idStatus: 3,
            });
        }
        if (type === 'Withdrawal') {
            const haveBalance = await this.balanceService.getBalanceByUserId(
                userId
            );
            if (Number(haveBalance.amount) < amount) {
                throw {
                    customError: true,
                    message: 'Insufficient funds',
                    property: 'amount',
                };
            }
            transaction = await this.transactionsRepository.discountBalance(
                amount,
                userId,
                {
                    ...objectTransaction,
                    idStatus: 1,
                }
            );
        }
        return transaction;
    }

    getAllByIdUser = async (userId: number) => {
        const validation = new GetById(userId);
        await validateOrReject(validation);

        const transactions = await this.transactionsRepository.findAllByIdUser(
            userId
        );
        if (!transactions) {
            throw {
                customError: true,
                message: 'Transaction not found',
                property: 'userId',
            };
        }
        return transactions;
    };

    updateStatus = async (idTransaction: number, status: string) => {
        const updateStatus = new UpdateStatusTransactions(
            idTransaction,
            status
        );

        await validateOrReject(updateStatus);

        const { id: statusDb } =
            await this.statusService.getIdTypeTransactionTypeByName(status);

        const existTransaction = await this.transactionsRepository.getById(
            idTransaction
        );

        if (
            !existTransaction ||
            existTransaction.id_status !== 3 ||
            !statusDb
        ) {
            throw {
                customError: true,
                message: 'Transaction not found',
                property: 'idTransaction',
            };
        }

        let transaction: TransactionsWithoutIds | undefined = undefined;

        if (status === 'Success') {
            const transactionT =
                await this.transactionsRepository.updateStatusAndBalance(
                    idTransaction
                );
            if (!transactionT) {
                throw {
                    customError: true,
                    message: 'Transaction not found',
                    property: 'idTransaction',
                };
            }
            transaction = transactionT;
        } else {
            transaction = await this.transactionsRepository.updateStatus(
                idTransaction,
                statusDb
            );
        }

        return transaction;
    };

    getAll = async () => {
        const transactions = await this.transactionsRepository.getAll();
        return transactions;
    };
}
