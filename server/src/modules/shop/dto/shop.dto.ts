import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsObject,
  ValidateNested,
  IsNotEmpty,
  IsBoolean,
} from "class-validator";
import { WorkingHours } from "../interfaces";
import { Transform, Type, plainToClass } from "class-transformer";

export class UpdateMyShopDataDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  title: string;

  @IsString()
  @MaxLength(40)
  short_description: string;

  @IsString()
  @MaxLength(40)
  description: string;

  @IsNumber()
  type_id: number;

  @IsNumber()
  status_id: number;
}

export class UpdateMyShopData {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  title: string;

  @IsString()
  @MaxLength(40)
  short_description: string;

  @IsString()
  @MaxLength(40)
  description: string;

  @IsNumber()
  type_id: number;

  @IsNumber()
  status: 0 | 1 | 2;

  @IsOptional()
  @IsObject()
  working_hours: WorkingHours;
}

export class UpdateMyShopDto {
  @ValidateNested()
  @Transform((data) => plainToClass(UpdateMyShopData, JSON.parse(data.value)))
  @Type(() => UpdateMyShopData)
  @IsNotEmpty()
  readonly data: UpdateMyShopData;
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
