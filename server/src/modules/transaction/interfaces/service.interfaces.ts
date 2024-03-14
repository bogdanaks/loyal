import { LoyalProgram } from "src/modules/loyal/loyal-program.entity";

export interface CreateTransactionPlus {
  loyalty_program: LoyalProgram;
  shop_id: number;
  user_id: number;
  check_amount: number;
}

export interface CreateTransactionMinus extends CreateTransactionPlus {
  point_amount: number;
}
