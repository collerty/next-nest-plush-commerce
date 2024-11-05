import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 30})
  name: string;

  @Column({type: "float"})
  price: number;
}
