import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  username: string;

  @Column({nullable: false, unique: true})
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  modified_at: Date;

  @Column({nullable: true}) // Add this field to store refresh token
  refreshToken: string;
}