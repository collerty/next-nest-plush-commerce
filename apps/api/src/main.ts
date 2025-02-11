import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {ValidationPipe} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {json} from "body-parser";
import {getBodyParserOptions} from "@nestjs/platform-express/adapters/utils/get-body-parser-options.util";
import {urlencoded} from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: false
  });


  app.use(json(getBodyParserOptions(true, {limit: '50mb'})));
  app.use(urlencoded(getBodyParserOptions(true, {limit: '50mb'})));
  app.use(express.json());
  app.use(cookieParser())

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 4000;
  await app.listen(PORT);
}

bootstrap();
