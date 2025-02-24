import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Req, HttpStatus, HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Public } from '../auth/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Req() req: any, @Body() createProductDto: CreateProductDto) {
    console.log('adding product', createProductDto);
    const userId: number = req.user.id;
    return this.productService.create(createProductDto, userId);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Returns a list of all products.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('user')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Returns a list of all products.' })
  findAllByUser(@Req() req: any) {
    const userId = req.user.id;
    return this.productService.findAllByUserId(userId);
  }

  @Public()
  @Get('category/:id')
  @ApiOperation({ summary: 'Get products by category ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of products in the specified category.',
  })
  findAllByCategory(@Param('id') id: number) {
    return this.productService.findAllByCategory(id);
  }

  @Public()
  @Get('category/slug/:slug')
  @ApiOperation({ summary: 'Get products by category ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of products in the specified category.',
  })
  findAllByCategorySlug(@Param('slug') slug: string) {
    return this.productService.findAllByCategorySlug(slug);
  }

  @Public()
  @Get('category/count/:id')
  @ApiOperation({ summary: 'Get count of the products by category ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a number of products in the specified category.',
  })
  countByCategory(@Param('id') id: number) {
    return this.productService.countByCategory(id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Returns the specified product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
