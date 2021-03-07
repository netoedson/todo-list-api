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
import { User as UserDecorator } from '../auth/decorator/user.decorator';
import { ProjectCommonQuery } from '../types';
import { User } from '../user/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { UpdateTaskGuard } from './guards/update-task.guard';
import { AddTasksValidationPipe } from './pipes/add-tasks-validation.pipe';
import { ProjectValidationPipe } from './pipes/project-validation.pipe';
import { ProjectService } from './project.service';
import { Project } from './schemas/project.schema';
import { Task } from './schemas/task.schema';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  //#region Project's CRUD
  @Post()
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
  public async list(@UserDecorator() user: User) {
    const projects = await this.projectService.findByUser(user._id);

    return {
      total: projects.length,
      projects,
    };
  }

  @Put(':id')
  public async update(
    @Body() body: Pick<CreateProjectDto, 'title'>,
    @Param('id') projectId: string,
    @UserDecorator() user: User,
  ) {
    const query: ProjectCommonQuery = {
      _id: projectId,
      userId: user._id,
    };

    const updated = await this.projectService.updateProject(query, body.title);

    if (!updated) throw new ForbiddenException('Operation Denied');

    return {
      newTitle: updated.title,
    };
  }

  @Delete(':id')
  public removeProject(
    @Param('id') projectId: string,
    @UserDecorator() user: User,
  ) {
    const query: ProjectCommonQuery = {
      _id: projectId,
      userId: user._id,
    };

    return this.projectService.removeProject(query);
  }
  //#endregion

  //#region Task's CRUD

  @Post(':id/tasks')
  public async addTasks(
    @Body(AddTasksValidationPipe) body: Task[],
    @Param('id') projectId: string,
    @UserDecorator() user: User,
  ) {
    const query: ProjectCommonQuery = {
      _id: projectId,
      userId: user._id,
    };

    const { tasks } = await this.projectService.addTasks(query, body);

    return {
      result: { tasks, total: tasks.length },
      included: body.length,
    };
  }

  @Put('tasks/:id')
  @UseGuards(UpdateTaskGuard)
  public async updateTask(
    @Body() body: UpdateTaskDto,
    @Param('id') taskId: string,
    @UserDecorator() user: User,
  ) {
    const updated = await this.projectService.updateTask(
      taskId,
      { ...body },
      user._id,
    );

    if (!updated)
      throw new ForbiddenException(
        "You don't have permission to update this task",
      );

    return {
      newDescription: body.description,
    };
  }

  @Put('tasks/:id/complete')
  public async completeTask(
    @Param('id') taskId: string,
    @UserDecorator() user: User,
  ) {
    const updated = await this.projectService.updateTask(
      taskId,
      { completed: true },
      user._id,
    );

    if (!updated)
      throw new ForbiddenException(
        "You don't have permission to complete this task",
      );

    return {
      taskId,
      complete: true
    };
  }

  @Delete('tasks/:id')
  @UseGuards(UpdateTaskGuard)
  public async removeTask(
    @Param('id') taskId: string,
    @UserDecorator() user: User,
  ) {
    const removed = await this.projectService.removeTask(
      taskId,
      user._id
    );

    if (!removed)
      throw new ForbiddenException(
        "You don't have permission to remove this task",
      );

    return {
      taskId,
      removed: true
    };
  }

  //#endregion
}
