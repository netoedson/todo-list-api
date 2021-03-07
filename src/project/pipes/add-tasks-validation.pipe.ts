import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreationTaskRequest } from '../../types';
import { CreateManyTasksDto } from '../dtos/create-many-tasks.dto';
import { Task } from '../schemas/task.schema';

@Injectable()
export class AddTasksValidationPipe implements PipeTransform {
  transform(value: CreationTaskRequest, metadata: ArgumentMetadata): Task[] {
    let tasks: Task[] = [];

    if (this.isManyTask(value)) {
      tasks = [...value.tasks.map(va => ({description: va.description, completed: false }))];
    } else {
      tasks.push(value);
    }

    return tasks;
  }

  private isManyTask(request: CreationTaskRequest): request is CreateManyTasksDto {
    return (request as CreateManyTasksDto).tasks !== undefined;
  }
}
