import { prisma } from '@config';

export class UserRepository {
    async createUser(name: string, email: string) {
        return await prisma.users.create({
            data: { name, email },
        });
    }

    async findAllUsers() {
        return await prisma.users.findMany();
    }

    async findUserByEmail(email: string) {
        return await prisma.users.findUnique({
            where: { email },
        });
    }
}
