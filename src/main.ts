import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filtter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('TalkTodo API')
    .setDescription('API 문서')
    .setVersion('1.0.1')
    .addServer('http://localhost:3001', '로컬 개발 서버')
    .addServer(process.env.API_URL || 'http://localhost:3001', '운영 서버')
    .addCookieAuth('access_token', { in: 'cookie', type: 'apiKey' })
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, doc, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  app.enableCors({
    origin: ['http://localhost:3000', 'https://talktodo-client.vercel.app', 'http://localhost:3001', process.env.API_URL],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
