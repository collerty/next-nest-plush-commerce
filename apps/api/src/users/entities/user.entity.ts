import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  socialId: string;

  @Column({nullable: false, unique: true})
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
}