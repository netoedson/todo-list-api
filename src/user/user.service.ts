import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchemaProvider } from './schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(UserSchemaProvider) private readonly userModel: Model<UserDocument>){}

    public create(user: User): Promise<UserDocument> {
        return this.userModel.create(user);
    }

    public findUser (email: string): Promise<UserDocument> {
        return Promise.resolve(this.userModel.findOne({email}));
    }

}
