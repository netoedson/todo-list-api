import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User as UserDecorator} from 'src/auth/decorator/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectService } from './project.service';
import { Project } from './schemas/project.schema';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    public async create(@Body() body: CreateProjectDto, @UserDecorator() user: User){
        const payload: Project = { title: body.title, tasks: [...body.tasks], userId: user._id};
        
        return this.projectService.create(payload);
    }
}
