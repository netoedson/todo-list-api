import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { token } from './auth/middleware/token.middleware';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.use(helmet());
  app.enableCors();
  app.use(token);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
