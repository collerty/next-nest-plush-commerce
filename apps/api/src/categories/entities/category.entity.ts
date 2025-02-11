import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Category {
  @ApiProperty({ description: 'Unique identifier for the category' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Name of the category' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Slug of the category' })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({ description: 'List of products in this category' })
  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];
}
