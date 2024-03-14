import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { LoyalType } from "./loyal-type.entity";

@Entity({ name: "loyal_program" })
export class LoyalProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LoyalType, (loyalType) => loyalType.id, {
    cascade: true,
  })
  @JoinColumn({ name: "loyal_type_id" })
  loyal_type: LoyalType;

  @Column({ name: "loyal_type_id", type: "integer" })
  loyal_type_id: number;

  @Column({ type: "smallint" })
  percent_bonus: number;

  @Column({ type: "smallint" })
  max_off_check_percent: number;

  @Column({ type: "smallint" })
  reg_bonus: number;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
