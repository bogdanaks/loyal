import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ShopService } from "./shop.service";
import { JwtGuard, AuthRequest } from "../auth/jwt.guard";
import { TypeIdDto } from "./dto/shop.dto";

@Controller({ path: "shop-client" })
export class ShopClientController {
  constructor(private readonly shopService: ShopService) {}

  @Get("type")
  async getTypes() {
    const types = await this.shopService.findTypeBy({});
    return { data: types };
  }

  @UseGuards(JwtGuard)
  @Get()
  async getShopsByType(@Request() req: AuthRequest, @Query() data: TypeIdDto) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const shops = await this.shopService.findShopClientByUser({
      where: { user_id: userId, shop: { type_id: Number(data.type_id) } },
      relations: { shop: { loyal_program: true, type: true } },
    });
    return { data: shops };
  }
}
