import { AsyncModelFactory } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { UserSchema, UserSchemaProvider, UserDocument } from './schemas/user.schema';

export const modelsProviders: AsyncModelFactory[] = [
    {
        name: UserSchemaProvider,
        collection: 'users',
        useFactory: (): unknown => {
            const schema = UserSchema;
            schema.pre<UserDocument>('save', async function () {
                if (this.isModified('password')) {
                    const passwordHashed = await argon2.hash(this.password);
                    this.password = passwordHashed;
                }
            });
            return schema;
        },
    },
];