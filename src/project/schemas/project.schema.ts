import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from './task.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: [Task], default: [] })
  tasks: Task[];

  public _id?: Types.ObjectId;
  
  public createdAt?: Date;

  public updatedAt?: Date;
}

export const ProjectSchemaProvider = Symbol('ProjectSchemaProvider').toString();

export const ProjectSchema = SchemaFactory.createForClass(Project);
