import { IsNotEmpty, IsNumber, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'ID of the product being ordered',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product in the order',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Price per unit of the product',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pricePerUnit: number;
}
