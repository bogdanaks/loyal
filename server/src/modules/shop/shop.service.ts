import { Injectable } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { ShopType } from "./shop-type.entity";
import { Shop } from "./shop.entity";
import { ShopClient } from "./shop-client.entity";
import { User } from "../user/user.entity";
import { LoyalProgram } from "../loyal/loyal-program.entity";
import { ShopStatus } from "./shop-status.entity";

@Injectable()
export class ShopService {
  constructor(
    @InjectBot("biz") private botBiz: Telegraf<Context>,
    @InjectRepository(ShopType)
    private shopTypeRepository: Repository<ShopType>,
    @InjectRepository(ShopStatus)
    private shopStatusRepository: Repository<ShopStatus>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(ShopClient)
    private shopClientRepository: Repository<ShopClient>,
    @InjectRepository(LoyalProgram)
    private loyalProgramRepository: Repository<LoyalProgram>
  ) {}

  async findTypeBy(where: FindOptionsWhere<ShopType>): Promise<ShopType[]> {
    return await this.shopTypeRepository.findBy(where);
  }

  async findStatusBy(where: FindOptionsWhere<ShopStatus>): Promise<ShopStatus[]> {
    return await this.shopStatusRepository.findBy(where);
  }

  async findOneShopBy(options: FindOneOptions<Shop>): Promise<Shop> {
    return await this.shopRepository.findOne(options);
  }

  async findOneClientBy(where: FindOptionsWhere<ShopClient>): Promise<ShopClient> {
    return await this.shopClientRepository.findOneBy(where);
  }

  async findLoyalProgramBy(where: FindOptionsWhere<LoyalProgram>): Promise<LoyalProgram> {
    return await this.loyalProgramRepository.findOne({ where, relations: ["loyal_type"] });
  }

  async createShop(shop: Partial<Shop>) {
    return await this.shopRepository.save(shop);
  }

  async createClient(user: User) {
    return await this.shopClientRepository.save({
      user_id: user.id,
      is_active: true,
      balance: "0",
    });
  }

  async updateShop(id: number, data: Partial<Shop>) {
    return await this.shopRepository.update(id, data);
  }
}
