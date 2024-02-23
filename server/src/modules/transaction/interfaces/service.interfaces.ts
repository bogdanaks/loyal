import { LoyalProgram } from "src/modules/loyal/loyal-program.entity";

export interface CreateTransaction {
  loyalty_program: LoyalProgram;
  shop_id: number;
  user_id: number;
  check_amount: number;
  point_amount: number;
  is_accrual: boolean;
}
