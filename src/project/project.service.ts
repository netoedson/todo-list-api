import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectCommonQuery, UpdateTask } from '../types';
import {
  Project,
  ProjectDocument,
  ProjectSchemaProvider,
} from './schemas/project.schema';
import { Task } from './schemas/task.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectSchemaProvider)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  public create(project: Project): Promise<ProjectDocument> {
    return this.projectModel.create(project);
  }

  public findByUser(userId: Types.ObjectId) {
    return this.projectModel.find({ userId: userId });
  }

  public updateProject(query: ProjectCommonQuery, title: string) {
    return this.projectModel.findOneAndUpdate(
      query,
      { $set: { title } },
      { new: true },
    );
  }

  public removeProject(query: ProjectCommonQuery) {
    return this.projectModel.findOneAndRemove(query);
  }

  public addTasks(query: ProjectCommonQuery, tasks: Task[]) {
    return this.projectModel.findOneAndUpdate(
      query,
      {
        $push: {
          tasks: { $each: tasks },
        },
      },
      { new: true },
    );
  }

  public updateTask(
    taskId: string,
    update: UpdateTask,
    userId: Types.ObjectId,
  ) {
    const mainKey = 'tasks.$.';
    const updateSet = {};

    if (update.completed) {
      updateSet[`${mainKey}completed`] = update.completed;
    }

    if (update.description) {
      updateSet[`${mainKey}description`] = update.description;
    }

    return this.projectModel.findOneAndUpdate(
      { 'tasks._id': taskId, userId },
      { $set: updateSet },
      { new: true },
    );
  }

  public removeTask(taskId: string, userId: Types.ObjectId) {
    return this.projectModel.findOneAndUpdate(
      { 'tasks._id': taskId, userId },
      { $pull: { tasks: { _id: Types.ObjectId(taskId) } } },
      { new: true },
    );
  }

  public async checkIfTaskWasAlreadyComplete(taskId: string): Promise<boolean> {
    const project = await this.projectModel.findOne({
      'tasks._id': taskId,
      tasks: { $elemMatch: { _id: taskId } },
    });

    if (!project) throw new NotFoundException('Task not found');
    

    return project.tasks.pop().completed;
  }
}
