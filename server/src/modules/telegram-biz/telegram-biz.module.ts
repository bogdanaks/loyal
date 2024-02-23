import { Module } from "@nestjs/common";
import { TelegramBizUpdate } from "./telegram-biz.update";
import { UserModule } from "../user/user.module";
import { TelegramBizService } from "./telegram-biz.service";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [TelegramBizUpdate, TelegramBizService],
  exports: [TelegramBizService],
})
export class TelegramBizModule {}
