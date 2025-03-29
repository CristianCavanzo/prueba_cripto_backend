import { validateOrReject } from 'class-validator';
import { CreateTransactions } from './dto';
import { TransactionsRepository } from './transactions.repository';
import { TransactionCreate } from './models';
import { TransactionsTypesService } from '@modules/transactionTypes/transactionTypes.service';

export class TransactionsService {
    private transactionsRepository = new TransactionsRepository();
    private transactionsTypesService = new TransactionsTypesService();

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
    }
}
