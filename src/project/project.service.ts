import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Project,
  ProjectDocument,
  ProjectSchemaProvider,
} from './schemas/project.schema';

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

  public updateProject(
    projectId: string,
    userId: Types.ObjectId,
    title: string,
  ) {
    return this.projectModel.findOneAndUpdate(
      { _id: projectId, userId },
      { $set: { title } },
      { new: true },
    );
  }

  public removeProject(projectId: string, userId: Types.ObjectId) {
      return this.projectModel.findOneAndRemove({_id: projectId, userId});
  }
}
