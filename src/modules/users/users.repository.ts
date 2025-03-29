import { prisma } from '@config';

export class UserRepository {
    users = prisma.users;
    async createUser(name: string, email: string) {
        return await this.users.create({
            data: { name, email },
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
