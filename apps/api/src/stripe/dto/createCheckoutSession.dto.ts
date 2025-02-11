import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @ApiProperty({ description: 'ID of the product' })
  @IsInt()
  @Min(1)
  productId: number;

  @ApiProperty({ description: 'Quantity of the product to be purchased' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: 'List of products with their quantity to be purchased',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @ApiProperty({
    description: 'Customer email for sending receipt and updates',
    example: 'customer@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  // Optionally, you can add other properties like shipping address, currency, etc.
}
