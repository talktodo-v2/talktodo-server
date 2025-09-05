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
    .setVersion('1.0.2')
    .addServer('/')
    .addCookieAuth('access_token', { in: 'cookie', type: 'apiKey' })
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, doc, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.json(doc);
  });

  app.enableCors({
    origin: ['http://localhost:3000', 'https://talktodo-client.vercel.app', 'http://localhost:3001', process.env.API_URL],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
