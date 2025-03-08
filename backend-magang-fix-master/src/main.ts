import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors();
  app.use(cookieParser());
  // app.use(csurf());

  const config = new DocumentBuilder()
    .setTitle('API Magang')
    .setDescription('REST API untuk aplikasi Magang Mahasiswa Politeknik Statistika STIS')
    .setVersion('1.0')
    .addTag('Magang')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  // await app.listen(3000, 'localhost');

  await app.listen(process.env.PORT);
}
bootstrap();
