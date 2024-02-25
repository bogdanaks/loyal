import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Transaction } from "./transaction.entity";
import { ShopClient } from "../shop/shop-client.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, ShopClient])],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
