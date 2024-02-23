import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { totp } from "otplib";
import { RegisterTelegram } from "./dto/auth-dto";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";

totp.options = { digits: 4, step: 120 };

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  getOtpCode(phone: string): string {
    const otpCode = totp.generate(this.configService.get("otpSecretKey"));
    console.log(`Code sent to +7${phone} - ${otpCode}`);
    return otpCode;
  }

  checkOtpCode(otp: string) {
    return totp.check(otp, this.configService.get("otpSecretKey"));
  }

  async saveTelegramUser(data: RegisterTelegram): Promise<User> {
    const user = await this.userService.findOneBy({ tg_user_id: data.tg_user_id });
    if (!user) {
      throw new Error("User not found");
    }
    await this.userService.updateUserByTelegramId(data.tg_user_id, {
      birthday: data.birthday,
      first_name: data.first_name,
      last_name: data.last_name,
      tg_username: data.tg_username,
    });
    return user;
  }
}
