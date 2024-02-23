import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "loyal_type" })
export class LoyalType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "character varying", length: 100 })
  title: string;

  @Column({ type: "character varying", length: 100 })
  icon: string;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
