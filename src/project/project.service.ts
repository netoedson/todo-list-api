import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument, ProjectSchemaProvider } from './schemas/project.schema';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(ProjectSchemaProvider) private readonly projectModel: Model<ProjectDocument>){}

    public create(project: Project): Promise<ProjectDocument>{
        return this.projectModel.create(project);
    }

    public findByUser(userId: Types.ObjectId) {
        return this.projectModel.find({'user': userId});
    }
}
