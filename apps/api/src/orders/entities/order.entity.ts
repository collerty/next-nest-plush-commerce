import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../../products/entities/product.entity";
import {JoinTable} from "typeorm/browser";
import {User} from "../../users/entities/user.entity";
import {OrderItem} from "./order-item.entity";
import {ApiProperty} from "@nestjs/swagger";

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (item) => item.order, {cascade: true})
  items: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column()
  sessionId: string;

  @ApiProperty({ description: 'Timestamp when the user was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

}
