import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterBizDto } from "../auth/dto/auth-dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountBusiness } from "./account-business.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountBusiness)
    private accRepository: Repository<AccountBusiness>
  ) {}

  async createBusinessAccount(data: RegisterBizDto) {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(data.password, salt);
    return await this.accRepository.save({
      email: data.email.toLowerCase(),
      password: hashPass,
    });
  }

  async findOneAccountBy(where: FindOptionsWhere<AccountBusiness>): Promise<AccountBusiness> {
    return await this.accRepository.findOneBy(where);
  }

  async updateAccount(id: number, data: Partial<AccountBusiness>) {
    return await this.accRepository.update(id, data);
  }
}
