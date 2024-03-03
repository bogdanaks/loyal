import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { SaveTelegramUser } from "./interfaces";
import { RegisterUser } from "../auth/dto/auth-dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async saveTelegramUser(user: SaveTelegramUser): Promise<void> {
    await this.usersRepository.upsert(
      {
        tg_user_id: user.tg_user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
      },
      ["tg_user_id"]
    );
  }

  async saveUser(user: RegisterUser): Promise<User> {
    await this.usersRepository.save({
      phone: user.phone,
      first_name: user.name,
      birthday: user.birthday,
    });
    return await this.usersRepository.findOneBy({ phone: user.phone });
  }

  async updateUserById(id: number, userData: Partial<User>): Promise<void> {
    await this.usersRepository.update(id, userData);
  }

  async updateUserByTelegramId(tgId: number, userData: Partial<User>): Promise<void> {
    const user = await this.findOneBy({ tg_user_id: tgId });
    await this.usersRepository.update(user.id, userData);
  }

  async findOneBy(where: FindOptionsWhere<User>): Promise<User> {
    return await this.usersRepository.findOneBy(where);
  }
}
