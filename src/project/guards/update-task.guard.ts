import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ProjectService } from '../project.service';

@Injectable()
export class UpdateTaskGuard implements CanActivate {

  constructor(private readonly projectService: ProjectService) {}

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { params }: Request = context.switchToHttp().getRequest();
    
    if (params.hasOwnProperty('id')) {
      const taskId = params['id'];
      
      const result = await this.projectService.checkIfTaskWasAlreadyComplete(taskId);

      return !result
    }

    return false;
  }
}
