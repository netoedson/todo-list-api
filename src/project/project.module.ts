import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { projectModelsProvider } from './project-models.provider';

@Module({
    imports: [MongooseModule.forFeature([...projectModelsProvider])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
