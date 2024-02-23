import { IsEmail, IsMobilePhone, IsString } from "class-validator";

export class UpdateAccountBusinessDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsMobilePhone("ru-RU")
  phone: string;
}

export class UpdateAccountPasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  new_password: string;

  @IsString()
  new_password_repeate: string;
}
