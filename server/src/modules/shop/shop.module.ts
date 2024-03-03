import { Module } from "@nestjs/common";
import { ShopBizController } from "./shop-biz.controller";
import { ShopClientController } from "./shop-client.controller";
import { ShopService } from "./shop.service";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopType } from "./shop-type.entity";
import { Shop } from "./shop.entity";
import { ShopClient } from "./shop-client.entity";
import { TransactionModule } from "../transaction/transaction.module";
import { LoyalProgram } from "../loyal/loyal-program.entity";
import { ShopStatus } from "./shop-status.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop, ShopType, ShopStatus, ShopClient, LoyalProgram]),
    UserModule,
    TransactionModule,
  ],
  controllers: [ShopBizController, ShopClientController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
