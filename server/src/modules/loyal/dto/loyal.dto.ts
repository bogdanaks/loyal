import { IsNumber, IsOptional } from "class-validator";

export class UpdateLoyalDto {
  @IsNumber()
  type_id: number;

  @IsNumber()
  percent_bonus: number;

  @IsOptional()
  @IsNumber()
  max_off_check_percent?: number;

  @IsNumber()
  reg_bonus: number;
}
