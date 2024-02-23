import { Module } from "@nestjs/common";
import { TelegramUserUpdate } from "./telegram-user.update";
import { UserModule } from "../user/user.module";
import { TelegramUserService } from "./telegram-user.service";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [TelegramUserUpdate, TelegramUserService],
  exports: [TelegramUserService],
})
export class TelegramUserModule {}
