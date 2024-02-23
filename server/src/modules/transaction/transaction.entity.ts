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
import { LoyalType } from "../loyal/loyal-type.entity";

@Entity({ name: "transaction" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: "shop_id" })
  shop: Shop;

  @Column({ name: "shop_id", type: "bigint" })
  shop_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", type: "bigint" })
  user_id: number;

  @ManyToOne(() => LoyalType)
  @JoinColumn({ name: "loyal_type_id" })
  loyal_type: LoyalType;

  @Column({ name: "loyal_type_id", type: "bigint" })
  loyal_type_id: number;

  @Column({ type: "boolean" })
  is_accrual: boolean;

  @Column({ type: "bigint" })
  check_amount: string;

  @Column({ type: "bigint" })
  bonus_amount: string;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
