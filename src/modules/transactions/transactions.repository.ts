import { prisma } from '@config';

export class TransactionsRepository {
    private transactions = prisma.transactions;

    dataToReturn = {
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
    };

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
            ...this.dataToReturn,
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
            ...this.dataToReturn,
        });
    }

    updateStatusAndBalance = async (idTransaction: number) => {
        return await prisma.$transaction(async (prisma) => {
            const transaction = await prisma.transactions.update({
                where: {
                    id: idTransaction,
                },
                data: {
                    id_status: 1,
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
            const newTransaction = await prisma.transactions.findUnique({
                where: {
                    id: transaction.id,
                },
                ...this.dataToReturn,
            });
            return newTransaction;
        });
    };

    async getById(idTransaction: number) {
        return await this.transactions.findUnique({
            where: {
                id: idTransaction,
            },
        });
    }
    discountBalance = async (
        amount: number,
        userId: number,
        transaction: {
            amount: number;
            idType: number;
            idUser: number;
            idStatus: number;
        }
    ) => {
        return prisma.$transaction(async (prisma) => {
            await prisma.balances.update({
                where: {
                    id_user: userId,
                },
                data: {
                    amount: {
                        decrement: amount,
                    },
                },
            });
            return await prisma.transactions.create({
                data: {
                    id_user: transaction.idUser,
                    amount: transaction.amount,
                    id_type: transaction.idType,
                    id_status: transaction.idStatus,
                },
                ...this.dataToReturn,
            });
        });
    };

    getAll = async () => {
        return await this.transactions.findMany({
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
    };
}
