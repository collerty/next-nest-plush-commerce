import {PartialType} from '@nestjs/mapped-types';
import {CreateOrderDto} from './create-order.dto';
import {IsEnum, IsOptional} from "class-validator";
import {OrderStatus} from "../entities/order.entity";

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

}
