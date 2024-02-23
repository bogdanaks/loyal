import {
  IsMobilePhone,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsEmail,
} from "class-validator";

export class LoginTelegram {
  @IsString()
  initData: string;
}

export class RegisterTelegram {
  @IsNumber()
  tg_user_id: number;

  @IsString()
  first_name: string;

  @IsString()
  birthday: string;

  @IsOptional()
  @IsString()
  tg_username?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsString()
  initData: string;
}

export class LoginGetCode {
  @IsMobilePhone("ru-RU")
  phone: string;
}

export class CheckOtpCode {
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  otp: string;

  @IsMobilePhone("ru-RU")
  phone: string;
}

export class LoginBizDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterBizDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
