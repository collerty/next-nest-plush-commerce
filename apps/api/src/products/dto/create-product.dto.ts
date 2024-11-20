import {IsNotEmpty, IsOptional, IsArray, ArrayMinSize, IsString, IsNumber, Min} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Images associated with the product',
    type: () => [String],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images: string[];

  @ApiProperty({
    description: 'Price of the product',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Category ID of the product',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
