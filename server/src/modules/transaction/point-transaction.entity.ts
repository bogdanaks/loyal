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
import { Shop } from "../shop/shop.entity";

@Entity({ name: "point_transaction" })
export class PointTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, {
    cascade: true,
  })
  @JoinColumn({ name: "shop_id" })
  shop: Shop;

  @Column({ name: "shop_id", type: "integer" })
  shop_id: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", type: "integer" })
  user_id: number;

  @Column({ type: "boolean" })
  is_accrual: boolean;

  @Column({ type: "bigint" })
  check_amount: number;

  @Column({ type: "integer" })
  point_amount: number;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
