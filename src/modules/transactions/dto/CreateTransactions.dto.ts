import { IsIn, IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { TransactionCreate } from '../models';

export class CreateTransactions {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNumber()
    @IsPositive()
    userId: number;

    @IsString()
    @Length(3, 50)
    @IsIn(['Deposit', 'Withdrawal'])
    type: string;

    constructor({ amount, userId, type }: TransactionCreate) {
        this.type = type;
        this.amount = amount;
        this.userId = userId;
    }
}
