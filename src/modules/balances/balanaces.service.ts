import { BalancesRepository } from './balances.repository';

export class BalancesService {
    private balancesRepository = new BalancesRepository();

    async getBalanceByUserId(userId: number) {
        const balance = await this.balancesRepository.findOneById(userId);

        if (!balance) {
            // throw custom object
            throw {
                customError: true,
                message: 'Balance not found',
                property: 'userId',
            };
        }

        return balance;
    }
}
