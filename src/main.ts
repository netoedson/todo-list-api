import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { token } from './auth/middleware/token.middleware';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  app.use(token);

  await app.listen(3000);
}
bootstrap();
