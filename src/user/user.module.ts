import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { modelsProviders } from './models.provider';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([...modelsProviders]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
