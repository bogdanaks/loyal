import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LoyalService } from "./loyal.service";
import { AuthRequest, JwtAccountGuard } from "../auth/jwt-account.guard";
import { UpdateLoyalDto } from "./dto/loyal.dto";
import { ShopService } from "../shop/shop.service";

@Controller({ path: "loyal" })
export class LoyalController {
  constructor(
    private readonly loyalService: LoyalService,
    private readonly shopService: ShopService
  ) {}

  @Get()
  async getLoyal() {
    const loyal = await this.loyalService.findOneLoyalProgramBy({});
    return { data: loyal };
  }

  @UseGuards(JwtAccountGuard)
  @Get("my")
  async getMyLoyal(@Request() req: AuthRequest) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const findShop = await this.shopService.findOneShopBy({ owner_id: accId });
    const loyal = await this.loyalService.findOneLoyalProgramBy({ shop_id: findShop.id });
    return { data: loyal };
  }

  @UseGuards(JwtAccountGuard)
  @Get("type")
  async getLoyalTypes(@Request() req: AuthRequest) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const types = await this.loyalService.findLoyalTypeBy({});
    return { data: types };
  }

  @UseGuards(JwtAccountGuard)
  @Post()
  async updateLoyal(@Request() req: AuthRequest, @Body() data: UpdateLoyalDto) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const shop = await this.shopService.findOneShopBy({ owner_id: accId });
    if (!shop) {
      throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
    }
    await this.loyalService.insertByShopId(shop.id, {
      loyal_type_id: data.type,
      percent_bonus: data.percent_bonus,
      reg_bonus: data.reg_bonus,
    });
    return { data: "success" };
  }
}
