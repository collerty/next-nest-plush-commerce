import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import {Product} from "./product/entities/product.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'collert',
      username: 'postgres',
      entities: [Product],
      database: 'next15-nest-plush-commerce',
      synchronize: true,
      logging: true,
    }),
    // UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}