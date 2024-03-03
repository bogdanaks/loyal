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
import { Shop } from "./shop.entity";

@Entity({ name: "shop_client" })
export class ShopClient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", type: "bigint" })
  user_id: number;

  @ManyToOne(() => Shop, {
    cascade: true,
  })
  @JoinColumn({ name: "shop_id" })
  shop: Shop;

  @Column({ name: "shop_id", type: "bigint" })
  shop_id: number;

  @Column({ type: "bigint" })
  balance: string;

  @Column({ type: "boolean" })
  is_active: boolean;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
