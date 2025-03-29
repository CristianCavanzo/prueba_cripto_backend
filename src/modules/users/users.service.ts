import { validateOrReject } from 'class-validator';
import { CreateUser } from './dto';
import { UserRepository } from './users.repository';
import { Users } from '@prisma/client';

export class UserService {
    private userRepository = new UserRepository();

    async createUser(name: string, email: string) {
        const newUser = new CreateUser(name, email);
        await validateOrReject(newUser);

        const existingUser = await this.userRepository.findUserByEmail(email);

        if (existingUser) {
            // throw custom object
            throw {
                customError: true,
                message: 'User with this email already exists',
                property: 'email',
            };
        }

        await this.userRepository.createUserAndBalance(name, email);

        return (await this.userRepository.findUserByEmail(email)) as Users;
    }

    getAllUsers = async () => {
        const users = await this.userRepository.findAllUsers();

        return users;
    };
}
