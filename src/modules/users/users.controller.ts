import { ApiResponse } from '@models';
import { Users } from '@prisma/client';
import { returnParsedError } from '@utils';
import { Request, Response } from 'express';
import { UserService } from './users.service';

export class UserController {
    private userService = new UserService();

    createUser = async (req: Request, res: Response) => {
        const response: ApiResponse<Users> = {
            data: undefined,
            error: false,
            status: 200,
        };
        try {
            const { name, email } = req.body;
            const user = await this.userService.createUser(name, email);
            response.data = user;
        } catch (error) {
            const newError = returnParsedError(error);
            response.error = true;
            response.data = newError.error;
            response.status = newError.status;
        }
        res.status(response.status).json(response);
    };

    getAllUsers = async (req: Request, res: Response) => {
        const response: ApiResponse<Users[]> = {
            data: undefined,
            error: false,
            status: 200,
        };
        try {
            const users = await this.userService.getAllUsers();
            response.data = users;
        } catch (error) {
            const newError = returnParsedError(error);
            response.error = true;
            response.data = newError.error;
            response.status = newError.status;
        }
        res.status(response.status).json(response);
    };
}
