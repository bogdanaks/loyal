import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsObject,
  IsBoolean,
} from "class-validator";
import { WorkingHours } from "../interfaces";

export class UpdateMyShopDataDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_description: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsNumber()
  status_id: number;

  @IsOptional()
  @IsObject()
  working_hours: WorkingHours;
}

export class UpdateClientBonusDto {
  @IsNumber()
  check_amount: number;

  @IsBoolean()
  is_accrual: boolean;

  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  point_amount: number;
}

export class TypeIdDto {
  @IsString()
  type_id: string;
}
