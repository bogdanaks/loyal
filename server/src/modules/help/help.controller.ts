import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthRequest, JwtGuard } from "../auth/jwt.guard";
import { HelpService } from "./help.service";
import { UserService } from "../user/user.service";
import { JwtAccountGuard, AuthRequest as AuthBizRequest } from "../auth/jwt-account.guard";
import { AccountService } from "../account/account.service";

@Controller({ path: "help" })
export class HelpController {
  constructor(
    private readonly helpService: HelpService,
    private readonly userService: UserService,
    private readonly accountService: AccountService
  ) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get("verify")
  verify() {
    return { data: "ok" };
  }

  @UseGuards(JwtGuard)
  @Post("feedback")
  async sendFeedback(@Request() req: AuthRequest, @Body() body: { message: string }) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ id: userId });
    this.helpService.sendFeedback(user, body.message);
    return { data: "success" };
  }

  @UseGuards(JwtAccountGuard)
  @Post("biz/feedback")
  async sendBizFeedback(@Request() req: AuthBizRequest, @Body() body: { message: string }) {
    const userId = req.user.accId;
    if (!userId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const account = await this.accountService.findOneAccountBy({ id: userId });
    this.helpService.sendBizFeedback(account, body.message);
    return { data: "success" };
  }
}
