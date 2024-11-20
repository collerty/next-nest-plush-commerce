import {IsArray, IsNotEmpty, ValidateNested} from "class-validator";
import {Product} from "../../products/entities/product.entity";
import {Type} from "class-transformer";
import {CreateProductDto} from "../../products/dto/create-product.dto";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}
