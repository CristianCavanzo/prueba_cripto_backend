import { prisma } from '@config';

export class StatusesRepository {
    private transactionTypes = prisma.statuses;
    async findOneByName(name: string) {
        return await this.transactionTypes.findUnique({
            where: { name },
            select: {
                id: true,
            },
        });
    }
}
