import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationDto } from './dtos/registration.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async register(@Body() body: RegistrationDto) {
    const { name, email } = await this.userService.create(body);

    return { name, email };
  }
}
