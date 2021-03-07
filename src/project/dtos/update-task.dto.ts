import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}