import { Type } from "class-transformer";
import { IsArray } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";

export class CreateManyTasksDto {
    @IsArray()
    @Type(() => CreateTaskDto)
    tasks: CreateTaskDto[];
}