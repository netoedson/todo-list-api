// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserDocument } from "./user/schemas/user.schema";

declare global {
    namespace Express {
        export interface Request {
            token: string;
            user: UserDocument
        }
    }
}