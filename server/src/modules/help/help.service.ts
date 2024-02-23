import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { User } from "../user/user.entity";
import { messageAccountFeedback, messageFeedback } from "./dto/messages.formatter";
import { AccountBusiness } from "../account/account-business.entity";

@Injectable()
export class HelpService {
  constructor(
    @InjectBot("biz") private botBiz: Telegraf<Context>,
    @InjectBot("user") private botClient: Telegraf<Context>,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  async sendFeedback(user: User, message: string) {
    const msg = messageFeedback(user, message);
    const tgConfig: TelegramConfig = this.configService.get("tg");
    this.botClient.telegram.sendMessage(tgConfig.tgHelperId, msg);
  }

  async sendBizFeedback(account: AccountBusiness, message: string) {
    const msg = messageAccountFeedback(account, message);
    const tgConfig: TelegramConfig = this.configService.get("tg");
    this.botBiz.telegram.sendMessage(tgConfig.tgHelperId, msg);
  }
}
