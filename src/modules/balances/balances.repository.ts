import { prisma } from '@config';

export class BalancesRepository {
    private balances = prisma.balances;

    createBalance(userId: number) {
        return this.balances.create({
            data: {
                id_user: userId,
                amount: 0,
            },
        });
    }

    async findOneById(userId: number) {
        return this.balances.findUnique({
            where: {
                id_user: userId,
            },
        });
    }

    async updateBalance(amount: number, userId: number) {
        return this.balances.update({
            where: {
                id_user: userId,
            },
            data: {
                amount: {
                    increment: amount,
                },
            },
        });
    }

}
