import { TransactionsTypesRepository } from './transactionTypes.repository';

export class TransactionsTypesService {
    private transactionsTypesRepository = new TransactionsTypesRepository();

    getIdTypeTransactionTypeByName = async (name: string) => {
        const transactionType =
            await this.transactionsTypesRepository.findIdByName(name);

        if (!transactionType) {
            throw {
                customError: true,
                message: 'Transaction type not found',
                property: 'name',
            };
        }

        return transactionType;
    };
}
