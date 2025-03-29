import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class UpdateStatusTransactions {
    @IsNumber()
    @IsPositive()
    idTransaction: number;

    @IsString()
    @Length(3, 50)
    status: string;

    constructor(idTransaction: number, status: string) {
        this.idTransaction = idTransaction;
        this.status = status;
    }
}
