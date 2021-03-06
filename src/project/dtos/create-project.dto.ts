import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsArray()
    @IsOptional()
    @Type(() => CreateTaskDto)
    public tasks: CreateTaskDto[];
}