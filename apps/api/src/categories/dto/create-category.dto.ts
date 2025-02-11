import {IsArray, IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDto } from "../../products/dto/create-product.dto";

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'List of products for this category',
    type: () => [CreateProductDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}
