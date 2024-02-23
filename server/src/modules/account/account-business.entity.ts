import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "account_business" })
export class AccountBusiness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "character varying", length: 100 })
  name: string;

  @Column({ type: "character varying", length: 11 })
  phone: string;

  @Column({ type: "character varying", length: 100 })
  email: string;

  @Column({ type: "character varying", length: 255 })
  password: string;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
