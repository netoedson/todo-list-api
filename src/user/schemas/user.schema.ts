import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  public _id?: Types.ObjectId;
}

export const UserSchemaProvider = Symbol('UserSchemaProvider').toString();

export const UserSchema = SchemaFactory.createForClass(User);
