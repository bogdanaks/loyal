import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "account_user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tg_user_id: number;

  @Column()
  tg_username: string;

  @Column({ type: "date" })
  birthday: Date;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  photo: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updated_at: Date;
}
