import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthRequest, JwtAccountGuard } from "../auth/jwt-account.guard";
import { AccountService } from "./account.service";
import { UpdateAccountBusinessDto, UpdateAccountPasswordDto } from "./dto/business.dto";
import * as bcrypt from "bcrypt";

@Controller({ path: "account" })
export class AccountController {
  constructor(private readonly bizService: AccountService) {}

  @UseGuards(JwtAccountGuard)
  @Get()
  async getAccount(@Request() req: AuthRequest) {
    const bizId = req.user.accId;
    if (!bizId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const account = await this.bizService.findOneAccountBy({ id: bizId });
    return { data: account };
  }

  @UseGuards(JwtAccountGuard)
  @Patch()
  async updateAccount(@Request() req: AuthRequest, @Body() data: UpdateAccountBusinessDto) {
    const bizId = req.user.accId;
    if (!bizId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const account = await this.bizService.updateAccount(bizId, data);
    return { data: account };
  }

  @UseGuards(JwtAccountGuard)
  @Patch("password")
  async updateAccountPassword(@Request() req: AuthRequest, @Body() data: UpdateAccountPasswordDto) {
    const bizId = req.user.accId;
    if (!bizId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    if (data.new_password !== data.new_password_repeate) {
      throw new HttpException("Passwords do not match", HttpStatus.BAD_REQUEST);
    }

    const findAccount = await this.bizService.findOneAccountBy({ id: bizId });
    const match = await bcrypt.compare(data.old_password, findAccount.password);
    if (!match) {
      throw new HttpException("Неверный пароль", HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(data.new_password, salt);
    const account = await this.bizService.updateAccount(bizId, {
      password: hashPass,
    });
    return { data: account };
  }
}
