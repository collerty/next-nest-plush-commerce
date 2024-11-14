// src/app.module.ts

import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import {ProductsModule} from "./products/products.module";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      cache: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!typeOrmConfig) {
          throw new Error('TypeORM configuration is not defined');
        }
        return typeOrmConfig;
      },
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
