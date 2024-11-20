import { IsNotEmpty, IsArray, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
