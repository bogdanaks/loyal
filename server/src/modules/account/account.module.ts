import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountBusiness } from "./account-business.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccountBusiness])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
