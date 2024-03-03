import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { CreateTransaction } from "./interfaces/service.interfaces";
import { Transaction } from "./transaction.entity";
import { LoyalProgram } from "../loyal/loyal-program.entity";
import { ShopClient } from "../shop/shop-client.entity";
import Big from "big.js";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(ShopClient)
    private shopClientRepository: Repository<ShopClient>,
    private dataSource: DataSource
  ) {}

  calculatePercentAmountFromCheck(loyalProgram: LoyalProgram, data: CreateTransaction) {
    return Big(Math.round((loyalProgram.percent_bonus / 100) * data.check_amount)).toString();
  }

  async create(data: CreateTransaction) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let bonus = this.calculatePercentAmountFromCheck(data.loyalty_program, data);
      let client = await queryRunner.manager.findOneBy(ShopClient, { user_id: data.user_id });
      let isNewClient = false;

      if (!client) {
        isNewClient = true;
        bonus = Big(bonus).plus(data.loyalty_program.reg_bonus).toString();
        client = await queryRunner.manager.save(ShopClient, {
          user_id: data.user_id,
          shop_id: data.shop_id,
          is_active: true,
          balance: data.loyalty_program.reg_bonus.toString(),
        });
      }

      const baseTransaction: DeepPartial<Transaction> = {
        shop_id: data.shop_id,
        user_id: data.user_id,
        loyal_type_id: data.loyalty_program.loyal_type.id,
        check_amount: Big(data.check_amount).mul(100).toString(),
      };

      switch (data.loyalty_program.loyal_type.title) {
        case "Бонусная":
          let newBalance = Big(bonus).plus(client.balance);
          if (isNewClient) {
            newBalance = newBalance.minus(data.loyalty_program.reg_bonus);
          }

          // Списание
          if (!data.is_accrual) {
            newBalance = newBalance.minus(data.point_amount);
            const newTransactionBonusMinus = this.transactionRepository.create({
              ...baseTransaction,
              is_accrual: data.is_accrual,
              bonus_amount: data.point_amount.toString(),
            });
            await queryRunner.manager.save(newTransactionBonusMinus);
          }

          // Начисление
          const newTransactionBonus = this.transactionRepository.create({
            ...baseTransaction,
            is_accrual: !data.is_accrual,
            bonus_amount: bonus.toString(),
          });
          await queryRunner.manager.save(newTransactionBonus);

          // Установка баланса
          await queryRunner.manager.update(ShopClient, client.id, {
            balance: newBalance.toString(),
          });
          break;
        case "Дисконтная":
          const newTransactionDiscount = this.transactionRepository.create({
            ...baseTransaction,
            is_accrual: true,
            bonus_amount: bonus.toString(),
          });
          await queryRunner.manager.save(newTransactionDiscount);
          break;

        default:
          throw new Error("Неизвестный тип лояльности");
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
