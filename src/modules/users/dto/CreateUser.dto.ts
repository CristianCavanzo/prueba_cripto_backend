import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUser {
    @IsString()
    @Length(3, 50)
    name: string;

    @IsEmail()
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
