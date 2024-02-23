import { IsNumber } from "class-validator";

export class UpdateLoyalDto {
  @IsNumber()
  type: number;

  @IsNumber()
  percent_bonus: number;

  @IsNumber()
  reg_bonus: number;
}
