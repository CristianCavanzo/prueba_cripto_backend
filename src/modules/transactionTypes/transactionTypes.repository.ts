import { prisma } from '@config';

export class TransactionsTypesRepository {
    private transactionTypes = prisma.transactionTypes;
    async findOneByName(name: string) {
        return await this.transactionTypes.findUnique({
            where: { name },
        });
    }
    async findIdByName(name: string) {
        const transactionType = await this.transactionTypes.findUnique({
            where: { name },
            select: { id: true },
        });

        return transactionType?.id;
    }
}
