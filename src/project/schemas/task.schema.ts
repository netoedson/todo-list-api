import { Schema, Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
    @Prop({required: true})
    public description: string;

    @Prop({default: false})
    public completed?: boolean;

    public createdAt?: Date;

    public updatedAt?: Date;

    public _id?: Types.ObjectId;
}