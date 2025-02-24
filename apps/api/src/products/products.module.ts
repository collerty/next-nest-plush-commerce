import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Category} from "../categories/entities/category.entity";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, User])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
