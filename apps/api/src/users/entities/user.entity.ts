import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Product} from "../../products/entities/product.entity";
import {Order} from "../../orders/entities/order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, unique: true})
  socialId: string;

  @Column({nullable: false})
  username: string;

  @Column({nullable: false, unique: true})
  email: string;

  @Column({nullable: true})
  password: string;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  modified_at: Date;

  @Column({nullable: true})
  refreshToken: string;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}