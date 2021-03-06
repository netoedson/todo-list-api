import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { projectModelsProvider } from './project-models.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule, MongooseModule.forFeature([...projectModelsProvider])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
