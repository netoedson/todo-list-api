// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Types } from "mongoose";
import { CreateManyTasksDto } from "./project/dtos/create-many-tasks.dto";
import { CreateTaskDto } from "./project/dtos/create-task.dto";
import { UserDocument } from "./user/schemas/user.schema";

declare global {
    namespace Express {
        export interface Request {
            token: string;
            user: UserDocument
        }
    }
}

export type ProjectCommonQuery = {
    _id: string,
    userId: Types.ObjectId
}

export type CreationTaskRequest = CreateTaskDto | CreateManyTasksDto
export interface UpdateTask {
    completed?: boolean;
    description?: string;
}