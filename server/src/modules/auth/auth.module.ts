import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { TelegramUserModule } from "../telegram-user/telegram-user.module";
import { TelegramBizModule } from "../telegram-biz/telegram-biz.module";
import { AccountModule } from "../account/account.module";
import { JwtAccountStrategy } from "./jwt-account.strategy";
import { ShopModule } from "../shop/shop.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          signOptions: { expiresIn: "30d" },
          verifyOptions: { ignoreExpiration: false },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    TelegramUserModule,
    TelegramBizModule,
    AccountModule,
    ShopModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAccountStrategy, JwtService],
})
export class AuthModule {}
