import { prisma } from '@config';

export class TransactionsRepository {
    private transactions = prisma.transactions;

    async create({
        amount,
        idStatus,
        idType,
        idUser,
    }: {
        amount: number;
        idType: number;
        idUser: number;
        idStatus: number;
    }) {
        return await this.transactions.create({
            data: {
                id_user: idUser,
                amount,
                id_type: idType,
                id_status: idStatus,
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                type: {
                    select: {
                        name: true,
                    },
                },
                status: {
                    select: {
                        name: true,
                    },
                },
            },
            omit: {
                id_status: true,
                id_type: true,
                id_user: true,
            },
        });
    }

    async findAllByIdUser(userId: number) {
        return await this.transactions.findMany({
            where: {
                id_user: userId,
            },
            include: {
                type: {
                    select: {
                        name: true,
                    },
                },
                status: {
                    select: {
                        name: true,
                    },
                },
            },
            omit: {
                id_status: true,
                id_type: true,
                id_user: true,
            },
        });
    }

    async updateStatus(idTransaction: number, idStatus: number) {
        return await this.transactions.update({
            where: {
                id: idTransaction,
            },
            data: {
                id_status: idStatus,
            },
        });
    }

    updateStatusAndBalance = async (idTransaction: number) => {
        return await prisma.$transaction(async (prisma) => {
            const transaction = await prisma.transactions.update({
                where: {
                    id: idTransaction,
                },
                data: {
                    id_status: 2,
                },
            });
            await prisma.balances.update({
                where: {
                    id_user: transaction.id_user,
                },
                data: {
                    amount: {
                        increment: transaction.amount,
                    },
                },
            });
            return transaction;
        });
    };

    async getById(idTransaction: number) {
        return await this.transactions.findUnique({
            where: {
                id: idTransaction,
            },
        });
    }
}
