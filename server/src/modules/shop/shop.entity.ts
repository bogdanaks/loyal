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
  status: AccountBusiness;

  @Column({ name: "status_id", type: "integer" })
  status_id: number;

  @Column({ type: "character varying", length: 100 })
  short_description: string;

  @Column({ type: "character varying", length: 100 })
  description: string;

  @Column({ type: "character varying", length: 100 })
  photo: string;

  @Column({ type: "character varying", array: true, default: [] })
  banners: string[];

  @Column({ type: "jsonb" })
  working_hours: WorkingHours;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
