import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegistrationDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public confirmPassword: string;
}