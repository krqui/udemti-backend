import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();
// voy a seguir el tutorial de: https://www.youtube.com/watch?v=SkDHvfyXdsQ
// primero con elephantsql.com