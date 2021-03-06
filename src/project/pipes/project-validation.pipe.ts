import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Injectable()
export class ProjectValidationPipe implements PipeTransform {
  transform(value: CreateProjectDto, metadata: ArgumentMetadata) {

    if (!value.tasks) value.tasks = [];

    return value;
  }
}
