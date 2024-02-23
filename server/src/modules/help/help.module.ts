import { Module } from "@nestjs/common";
import { HelpController } from "./help.controller";
import { HelpService } from "./help.service";
import { UserModule } from "../user/user.module";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [UserModule, AccountModule],
  controllers: [HelpController],
  providers: [HelpService],
})
export class HelpModule {}
