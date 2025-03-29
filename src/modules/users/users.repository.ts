import { prisma } from '@config';

export class UserRepository {
    users = prisma.users;

    async createUserAndBalance(name: string, email: string) {
        await prisma.$transaction(async (prisma) => {
            const user = await prisma.users.create({
                data: { name, email },
            });
            await prisma.balances.create({
                data: {
                    id_user: user.id,
                    amount: 0,
                },
            });
        });
    }

    async findAllUsers() {
        return await this.users.findMany();
    }

    async findUserByEmail(email: string) {
        return await this.users.findUnique({
            where: { email },
        });
    }
}
