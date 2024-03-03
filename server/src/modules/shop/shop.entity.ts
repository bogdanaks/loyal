import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ShopType } from "../shop/shop-type.entity";
import { AccountBusiness } from "../account/account-business.entity";
import { WorkingHours } from "./interfaces";
import { ShopStatus } from "./shop-status.entity";
import { LoyalProgram } from "../loyal/loyal-program.entity";

@Entity({ name: "shop" })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "character varying", length: 100 })
  title: string;

  @ManyToOne(() => ShopType, {
    cascade: true,
  })
  @JoinColumn({ name: "type_id" })
  type: ShopType;

  @Column({ name: "type_id", type: "integer" })
  type_id: number;

  @ManyToOne(() => ShopType, {
    cascade: true,
  })
  @JoinColumn({ name: "owner_id" })
  owner: AccountBusiness;

  @Column({ name: "owner_id", type: "integer" })
  owner_id: number;

  @ManyToOne(() => ShopStatus, {
    cascade: true,
  })
  @JoinColumn({ name: "status_id" })
  status: ShopStatus;

  @Column({ name: "status_id", type: "integer" })
  status_id: number;

  @ManyToOne(() => LoyalProgram)
  @JoinColumn({ name: "loyal_program_id" })
  loyal_program: LoyalProgram;

  @Column({ name: "loyal_program_id", type: "integer" })
  loyal_program_id: number;

  @Column({ type: "character varying", length: 100 })
  short_description: string;

  @Column({ type: "character varying", length: 500 })
  description: string;

  @Column({ type: "character varying", length: 100 })
  photo: string;

  @Column({ type: "jsonb" })
  banners: Record<string, string>;

  @Column({ type: "jsonb" })
  working_hours: WorkingHours;

  @Column({ type: "character varying", length: 10 })
  phone: string;

  @Column({ type: "character varying", length: 100 })
  address: string;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
