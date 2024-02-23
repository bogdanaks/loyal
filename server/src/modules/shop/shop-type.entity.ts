import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "shop_type" })
export class ShopType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "character varying", length: 100 })
  title: string;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
