import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: "shop_client" })
export class ShopClient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", type: "integer" })
  user_id: number;

  @Column({ type: "bigint" })
  balance: string;

  @Column({ type: "boolean" })
  is_active: boolean;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
