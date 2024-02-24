import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { LoyalProgram } from "./loyal-program.entity";
import { LoyalType } from "./loyal-type.entity";

@Injectable()
export class LoyalService {
  constructor(
    @InjectRepository(LoyalProgram)
    private loyalProgramRepository: Repository<LoyalProgram>,
    @InjectRepository(LoyalType)
    private loyalTypeRepository: Repository<LoyalType>
  ) {}

  async findOneLoyalProgramBy(where: FindOptionsWhere<LoyalProgram>): Promise<LoyalProgram> {
    return await this.loyalProgramRepository.findOneBy(where);
  }

  async findOneLoyalTypeBy(where: FindOptionsWhere<LoyalType>): Promise<LoyalType> {
    return await this.loyalTypeRepository.findOneBy(where);
  }

  async findLoyalTypeBy(where: FindOptionsWhere<LoyalType>): Promise<LoyalType[]> {
    return await this.loyalTypeRepository.findBy(where);
  }

  async create(shop_id: number, data: Partial<LoyalProgram>) {
    return await this.loyalProgramRepository.save({ shop_id, ...data });
  }

  async update(id: number, data: Partial<LoyalProgram>) {
    return await this.loyalProgramRepository.update(id, data);
  }

  async insert(data: Partial<LoyalProgram>) {
    await this.loyalProgramRepository.insert(data);
    return await this.loyalProgramRepository.findOneBy({ id: data.id });
  }
}
