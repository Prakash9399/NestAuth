import { IsEmail,IsString,MinLength } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email:string

    @IsString()
    @MinLength(4)
    password:string;
}