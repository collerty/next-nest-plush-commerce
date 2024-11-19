import {IsNotEmpty} from "class-validator";
import {CreateOrderItemDto} from "./create-order-item.dto";

export class CreateOrderDto {
  @IsNotEmpty()
  items: CreateOrderItemDto[];
}
