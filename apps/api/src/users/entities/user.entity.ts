import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class User {
  @ApiProperty({ description: 'Unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Social media ID for the user', required: false })
  @Column({ nullable: true, unique: true })
  socialId: string;

  @ApiProperty({ description: 'User icon',  })
  @Column({ nullable: false, default: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" })
  profileIcon: string;

  @ApiProperty({ description: 'Username of the user' })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({ description: 'Email of the user' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the user (hashed)' })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({ description: 'Timestamp when the user was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ description: 'Timestamp when the user was last modified' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @ApiProperty({ description: 'Refresh token of the user (if any)', required: false })
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty({ description: 'List of products created by the user' })
  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @ApiProperty({ description: 'List of orders made by the user' })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
