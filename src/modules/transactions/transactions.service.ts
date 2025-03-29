import { validateOrReject } from 'class-validator';
import { CreateTransactions, GetById, UpdateStatusTransactions } from './dto';
import { TransactionsRepository } from './transactions.repository';
import { TransactionCreate } from './models';
import { TransactionsTypesService } from '@modules/transactionTypes/transactionTypes.service';
import { StatusesService } from '@modules/statuses/statuses.service';
import { Transactions } from '@prisma/client';

export class TransactionsService {
    private transactionsRepository = new TransactionsRepository();
    private transactionsTypesService = new TransactionsTypesService();
    private statusService = new StatusesService();

    async create({ userId, type, amount }: TransactionCreate) {
        const newUser = new CreateTransactions({
            userId,
            amount,
            type,
        });
        await validateOrReject(newUser);
        if (type === 'Deposit') {
            const transactionType =
                await this.transactionsTypesService.getIdTypeTransactionTypeByName(
                    'Deposit'
                );
            return await this.transactionsRepository.create({
                amount,
                idType: transactionType,
                idUser: userId,
                idStatus: 3,
            });
        }
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

        let transaction: Transactions;

        if (status === 'Success') {
            transaction =
                await this.transactionsRepository.updateStatusAndBalance(
                    idTransaction
                );
        } else {
            transaction = await this.transactionsRepository.updateStatus(
                idTransaction,
                statusDb
            );
        }

        return transaction;
    };
}
