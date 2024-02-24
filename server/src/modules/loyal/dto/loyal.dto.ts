import { IsNumber } from "class-validator";

export class UpdateLoyalDto {
  @IsNumber()
  type_id: number;

  @IsNumber()
  percent_bonus: number;

  @IsNumber()
  reg_bonus: number;
}
