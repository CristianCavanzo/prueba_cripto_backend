import { StatusesRepository } from './statuses.repository';

export class StatusesService {
    private statusesRepository = new StatusesRepository();

    getIdTypeTransactionTypeByName = async (name: string) => {
        const transactionType = await this.statusesRepository.findOneByName(
            name
        );

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
