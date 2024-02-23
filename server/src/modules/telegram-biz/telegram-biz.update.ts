import { Start, Update, On, Message, InjectBot } from "nestjs-telegraf";
import { UserService } from "../user/user.service";
import { Message as MessageType } from "telegraf/typings/core/types/typegram";
import { Context, Telegraf } from "telegraf";

@Update()
export class TelegramBizUpdate {
  constructor(
    private readonly userService: UserService,
    @InjectBot("biz") private bizBot: Telegraf<Context>
  ) {}

  @Start()
  onStart(): string {
    return "Нажми кнопку 'Открыть', чтобы запустить приложение";
  }

  @On("contact")
  onContact(@Message() msg: MessageType.ContactMessage) {
    this.userService.saveTelegramUser({
      tg_user_id: msg.contact.user_id,
      first_name: msg.contact.first_name,
      last_name: msg.contact.last_name,
      phone: msg.contact.phone_number,
    });
  }
}
