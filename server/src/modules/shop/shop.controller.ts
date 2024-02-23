import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { ShopService } from "./shop.service";
import { AuthRequest, JwtAccountGuard } from "../auth/jwt-account.guard";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import * as sharp from "sharp";
import {
  UpdateClientBonusDto,
  UpdateMyShopData,
  UpdateMyShopDataDto,
  UpdateMyShopDto,
} from "./dto/shop.dto";
import { mkdirp } from "mkdirp";
import * as fs from "node:fs";
import { UserService } from "../user/user.service";
import { TransactionService } from "../transaction/transaction.service";
@Controller({ path: "shop" })
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService
  ) {}

  @Get("type")
  async getTypes() {
    const types = await this.shopService.findTypeBy({});
    return { data: types };
  }

  @UseGuards(JwtAccountGuard)
  @Get("my")
  async getMyShop(@Request() req: AuthRequest) {
    const bizId = req.user.accId;
    if (!bizId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const shop = await this.shopService.findOneShopBy({ owner_id: bizId });
    return { data: shop };
  }

  @UseGuards(JwtAccountGuard)
  @Get("status")
  async getShopStatuses(@Request() req: AuthRequest) {
    const bizId = req.user.accId;
    if (!bizId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const shopStatuses = await this.shopService.findStatusBy({});
    return { data: shopStatuses };
  }

  @UseGuards(JwtAccountGuard)
  @Patch("data")
  async updateShopData(@Request() req: AuthRequest, @Body() body: UpdateMyShopDataDto) {
    const { accId, shopId } = req.user;
    if (!accId || !shopId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    await this.shopService.updateShop(shopId, body);

    return { data: "success" };
  }

  // @UseGuards(JwtAccountGuard)
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: "photo", maxCount: 1 },
  //     { name: "banners", maxCount: 4 },
  //   ])
  // )
  // @Patch("my")
  // async updateMyShop(
  //   @Request() req: AuthRequest,
  //   @UploadedFiles() files: { photo: Express.Multer.File[]; banners: Express.Multer.File[] },
  //   @Body() body: UpdateMyShopDto
  // ) {
  //   const bodyData = JSON.parse(body.data as unknown as string) as UpdateMyShopData;
  //   const { userId } = req.user;
  //   if (!userId) {
  //     throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
  //   }

  //   const findShop = await this.shopService.findOneShopBy({ owner_id: userId });
  //   if (!findShop) {
  //     throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
  //   }

  //   const dirName = `/Users/user/Desktop/my/loyal/server/static/shops/${findShop.id}`;
  //   let photoUrl = "";
  //   if (files.photo?.length) {
  //     photoUrl = `${uuidv4()}.webp`;

  //     if (!fs.existsSync(dirName)) {
  //       mkdirp.sync(dirName);
  //     }

  //     if (findShop.photo) {
  //       fs.unlinkSync(`${dirName}/${findShop.photo}`);
  //     }

  //     try {
  //       await sharp(files.photo[0].buffer)
  //         .resize(200, 200)
  //         .webp({ quality: 100 })
  //         .toFile(`${dirName}/${photoUrl}`);
  //     } catch (e) {
  //       throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  //   let bannersUrls = findShop.banners ?? [];
  //   if (files.banners?.length) {
  //     console.log("files.banners", files.banners);

  //     if (!fs.existsSync(dirName)) {
  //       mkdirp.sync(dirName);
  //     }

  //     for await (const banner of files.banners) {
  //       if (bannersUrls.includes(banner.originalname)) {
  //         fs.unlinkSync(`${dirName}/${banner.originalname}`);
  //         bannersUrls = bannersUrls.filter((url) => url !== banner.originalname);
  //       }

  //       const bannerId = uuidv4();
  //       try {
  //         await sharp(banner.buffer)
  //           .resize(400, 200)
  //           .webp({ quality: 100 })
  //           .toFile(`${dirName}/${bannerId}.webp`);
  //         bannersUrls.push(`${bannerId}.webp`);
  //       } catch (e) {
  //         throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
  //       }
  //     }
  //   }

  //   // await this.shopService.updateShop(findShop.id, {
  //   //   ...bodyData,
  //   //   photo: photoUrl.length ? photoUrl : findShop.photo,
  //   //   banners: bannersUrls,
  //   // });
  //   const findUpdatedShop = await this.shopService.findOneShopBy({ id: findShop.id });
  //   return { data: findUpdatedShop };
  // }

  @UseGuards(JwtAccountGuard)
  @Get("check-qr")
  async checkQr(@Request() req: AuthRequest, @Query() query: { payload: string }) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ id: Number(query.payload) });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const client = await this.shopService.findOneClientBy({ user_id: user.id });
    return {
      data: {
        ...user,
        client,
      },
    };
  }

  @UseGuards(JwtAccountGuard)
  @Post("client-bonus")
  async updateClientBonus(@Request() req: AuthRequest, @Body() data: UpdateClientBonusDto) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ id: data.user_id });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const shop = await this.shopService.findOneShopBy({ owner_id: accId });
    if (!shop) {
      throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
    }

    const loyalProgram = await this.shopService.findLoyalProgramBy({ shop_id: shop.id });

    try {
      await this.transactionService.create({
        loyalty_program: loyalProgram,
        user_id: user.id,
        shop_id: shop.id,
        ...data,
      });

      return {
        data: "success",
      };
    } catch (err) {
      throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
