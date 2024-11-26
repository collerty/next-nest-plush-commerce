import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  app.use(cookieParser());
  app.enableCors()
  // {
  // origin: 'http://localhost:3000',
  // credentials: true,
  // });

  const config = new DocumentBuilder()
      .setTitle('E-commerce API')
      .setDescription('API documentation for the e-commerce application')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag("Auth")
      .addTag('Products')
      .addTag('Orders')
      .addTag('Categories')
      .addTag("Users")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT || 4000);
}

bootstrap();
