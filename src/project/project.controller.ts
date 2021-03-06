import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User as UserDecorator } from 'src/auth/decorator/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectValidationPipe } from './pipes/project-validation.pipe';
import { ProjectService } from './project.service';
import { Project } from './schemas/project.schema';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body(ProjectValidationPipe) body: CreateProjectDto,
    @UserDecorator() user: User,
  ) {
    const payload: Project = {
      title: body.title,
      tasks: [...body.tasks],
      userId: user._id,
    };

    return this.projectService.create(payload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async list(@UserDecorator() user: User) {
    const projects = await this.projectService.findByUser(user._id);

    return {
      total: projects.length,
      projects,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async update(
    @Body() body: Pick<CreateProjectDto, 'title'>,
    @Param('id') projectId: string,
    @UserDecorator() user: User,
  ) {
    const updated = await this.projectService.updateProject(
      projectId,
      user._id,
      body.title,
    );

    if (!updated) throw new ForbiddenException('Operation Denied');

    return {
      newTitle: updated.title,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public removeProject(
    @Param('id') projectId: string,
    @UserDecorator() user: User,
  ) {
    return this.projectService.removeProject(projectId, user._id);
  }
}
