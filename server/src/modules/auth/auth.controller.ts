import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  LoginBizDto,
  LoginGetCode,
  LoginTelegram,
  RegisterBizDto,
  RegisterTelegram,
} from "./dto/auth-dto";
import { JwtGuard } from "./jwt.guard";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { TelegramUserService } from "../telegram-user/telegram-user.service";
import { TelegramBizService } from "../telegram-biz/telegram-biz.service";
import * as bcrypt from "bcrypt";
import { ShopService } from "../shop/shop.service";
import { AccountService } from "../account/account.service";

@Controller({ path: "auth" })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly shopService: ShopService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
    private readonly tgUserService: TelegramUserService,
    private readonly tgBizService: TelegramBizService
  ) {}

  // по сути не используется, тк проверка будет на обычных ЭПах, временно для теста
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get("verify")
  verify() {
    return { data: "ok" };
  }

  @Post("login-telegram-user")
  async loginTelegramUser(@Body() data: LoginTelegram) {
    const params = new URLSearchParams(data.initData);
    const tgUser = JSON.parse(params.get("user"));
    const isVerify = this.tgUserService.verifyUser(data.initData);
    if (!isVerify) {
      throw new HttpException("Invalid account", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findOneBy({ tg_user_id: tgUser.id });
    if (user && user.phone && user.birthday) {
      const jwtCode = this.jwtService.sign(
        { data: user.id },
        { secret: this.configService.get("jwtUserSecretKey"), expiresIn: "30d" }
      );

      return { data: jwtCode };
    } else {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }

  @Post("register-telegram-user")
  async signInTelegramUser(@Body() data: RegisterTelegram) {
    const isVerify = this.tgUserService.verifyUser(data.initData);
    if (!isVerify) {
      throw new HttpException("Invalid account", HttpStatus.BAD_REQUEST);
    }

    const user = await this.authService.saveTelegramUser(data);
    const jwtCode = this.jwtService.sign(
      { data: user.id },
      { secret: this.configService.get("jwtUserSecretKey"), expiresIn: "30d" }
    );

    return { data: jwtCode };
  }

  @Post("account-login")
  async accountLogin(@Body() data: LoginBizDto) {
    const bizAcc = await this.accountService.findOneAccountBy({ email: data.email });
    if (!bizAcc) {
      throw new HttpException("Incorrect data", HttpStatus.BAD_REQUEST);
    }

    const match = await bcrypt.compare(data.password, bizAcc.password);
    if (match) {
      const shop = await this.shopService.findOneShopBy({ where: { owner_id: bizAcc.id } });

      const jwtCode = this.jwtService.sign(
        { data: { accId: bizAcc.id, shopId: shop.id } },
        { secret: this.configService.get("jwtAccountSecretKey"), expiresIn: "30d" }
      );

      return { data: jwtCode };
    } else {
      throw new HttpException("Incorrect data", HttpStatus.BAD_REQUEST);
    }
  }

  @Post("account-register")
  async accountRegister(@Body() data: RegisterBizDto) {
    const bizAcc = await this.accountService.createBusinessAccount(data);

    const shopStatuses = await this.shopService.findStatusBy({ is_default: true });
    const shop = await this.shopService.createShop({
      owner_id: bizAcc.id,
      status_id: shopStatuses[0].id,
    });

    const jwtCode = this.jwtService.sign(
      { data: { accId: bizAcc.id, shopId: shop.id } },
      { secret: this.configService.get("jwtAccountSecretKey"), expiresIn: "30d" }
    );

    return { data: jwtCode };
  }

  @Post("get-code")
  getCode(@Body() loginGetCode: LoginGetCode) {
    const res = this.authService.getOtpCode(loginGetCode.phone);
    return { data: res };
  }

  @Post("logout")
  logout() {
    return { data: "ok" };
  }

  @UseGuards(JwtGuard)
  @Get("check-auth")
  checkAuth() {
    return { data: "ok" };
  }
}
