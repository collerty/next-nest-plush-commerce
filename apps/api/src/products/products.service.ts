// src/products/products.service.ts

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from './entities/product.entity';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Category} from "../categories/entities/category.entity";

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product)
      private readonly productsRepository: Repository<Product>,

      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>
  ) {
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {categoryId, ...productData} = createProductDto;

    const category = await this.categoryRepository.findOneBy({id: categoryId});
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const product = this.productsRepository.create({
      ...productData,
      category,
    });

    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findAllByCategory(id: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {category: {id: id}},
      relations: ['category'], // Ensure the category relationship is loaded
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
