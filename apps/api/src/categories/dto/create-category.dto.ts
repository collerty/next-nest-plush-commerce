import {IsNotEmpty} from "class-validator";
import {Product} from "../../products/entities/product.entity";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  products?: Product[];
}
