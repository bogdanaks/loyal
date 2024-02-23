import { Module } from "@nestjs/common";
import { LoyalController } from "./loyal.controller";
import { LoyalService } from "./loyal.service";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoyalProgram } from "./loyal-program.entity";
import { LoyalType } from "./loyal-type.entity";
import { ShopModule } from "../shop/shop.module";

@Module({
  imports: [TypeOrmModule.forFeature([LoyalProgram, LoyalType]), UserModule, ShopModule],
  controllers: [LoyalController],
  providers: [LoyalService],
  exports: [LoyalService],
})
export class LoyalModule {}
