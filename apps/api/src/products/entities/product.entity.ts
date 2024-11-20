import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Category} from "../../categories/entities/category.entity";
import {OrderItem} from "../../orders/entities/order-item.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 30})
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({type: "json"})
  images: string[];

  @ManyToOne(() => User, (user) => user.products)
  seller: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];

  @Column({type: "float"})
  price: number;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
  modified_at: Date;


}
