// src/products/products.controller.ts

import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Public} from "../auth/public.decorator";

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get('category/:id')
  findAllByCategory(@Param('id') id: number) {
    return this.productService.findAllByCategory(id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
