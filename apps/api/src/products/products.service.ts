// src/products/products.service.ts

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from './entities/product.entity';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Category} from '../categories/entities/category.entity';
import {User} from "../users/entities/user.entity";

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product)
      private readonly productsRepository: Repository<Product>,
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
  ) {
  }

  async create(createProductDto: CreateProductDto, sellerId: number): Promise<Product> {
    const {categoryId, ...productData} = createProductDto;

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const seller = await this.usersRepository.findOneBy({id: sellerId});

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${sellerId} not found`);
    }

    const product = this.productsRepository.create({
      ...productData,
      category,
      seller
    });

    console.log(product);

    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({relations: ['category']});
  }

  async findAllByUserId(userId: number): Promise<Product[]> {
    return this.productsRepository.find({where: {seller: {id: userId}}});
  }

  findAllByCategory(id: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {category: {id: id}},
      relations: ['category'], // Ensure the category relationship is loaded
    });
  }

  findAllByCategorySlug(slug: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: {category: {slug: slug}},
      relations: ['category'], // Ensure the category relationship is loaded
    });
  }

  async countByCategory(categoryId: number): Promise<number> {
    return this.productsRepository.count({
      where: {category: {id: categoryId}},
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {id},
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
      id: number,
      updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const {categoryId, ...rest} = updateProductDto;
    Object.assign(product, rest);
    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      if (category) {
        product.category = category;
      }
    }
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
