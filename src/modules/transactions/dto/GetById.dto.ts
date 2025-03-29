import { IsNumber, IsPositive } from 'class-validator';

export class GetById {
    @IsNumber()
    @IsPositive()
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}
