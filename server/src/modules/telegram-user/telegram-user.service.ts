import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac } from "crypto";

@Injectable()
export class TelegramUserService {
  constructor(private readonly configService: ConfigService<EnvironmentVariables>) {}

  verifyUser(initData: string): boolean {
    const params = new URLSearchParams(initData);
    params.sort();
    const hash = params.get("hash");
    params.delete("hash");

    const dataToCheck = [...params.entries()].map(([key, value]) => key + "=" + value).join("\n");
    const tgConfig: TelegramConfig = this.configService.get("tg");
    const secretKey = createHmac("sha256", "WebAppData").update(tgConfig.tgBotUserApiKey).digest();

    const hex = createHmac("sha256", secretKey).update(dataToCheck).digest("hex");
    return hex === hash;
  }
}
