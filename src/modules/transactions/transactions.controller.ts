import { ApiResponse } from '@models';
import { returnParsedError } from '@utils';
import { Request, Response } from 'express';
import { TransactionsWithoutIds } from './models';
import { TransactionsService } from './transactions.service';
import { Transactions } from '@prisma/client';

export class TransactionsController {
    private transactionsService = new TransactionsService();

    create = async (req: Request, res: Response) => {
        const response: ApiResponse<TransactionsWithoutIds> = {
            data: undefined,
            error: false,
            status: 200,
        };
        try {
            const { user_id, type, amount } = req.body;
            const transaction = await this.transactionsService.create({
                userId: user_id,
                type,
                amount,
            });
            response.data = transaction;
        } catch (error) {
            const newError = returnParsedError(error);
            response.error = true;
            response.data = newError.error;
            response.status = newError.status;
        }
        res.status(response.status).json(response);
    };

    getAllByIdUser = async (req: Request, res: Response) => {
        const response: ApiResponse<TransactionsWithoutIds[]> = {
            data: undefined,
            error: false,
            status: 200,
        };
        try {
            const { user_id } = req.params;
            const transaction = await this.transactionsService.getAllByIdUser(
                Number(user_id)
            );
            response.data = transaction;
        } catch (error) {
            const newError = returnParsedError(error);
            response.error = true;
            response.data = newError.error;
            response.status = newError.status;
        }
        res.status(response.status).json(response);
    };
    updateStatus = async (req: Request, res: Response) => {
        const response: ApiResponse<Transactions> = {
            data: undefined,
            error: false,
            status: 200,
        };
        try {
            const { transaction_id } = req.params;
            const { status } = req.body;
            const transaction = await this.transactionsService.updateStatus(
                Number(transaction_id),
                status
            );
            response.data = transaction;
        } catch (error) {
            const newError = returnParsedError(error);
            response.error = true;
            response.data = newError.error;
            response.status = newError.status;
        }
        res.status(response.status).json(response);
    };
}
