import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { ShopService } from "./shop.service";
import { AuthRequest, JwtAccountGuard } from "../auth/jwt-account.guard";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import * as sharp from "sharp";
import {
  UpdateClientBonusMinusDto,
  UpdateClientBonusPlusDto,
  UpdateMyShopDataDto,
} from "./dto/shop.dto";
import { mkdirp } from "mkdirp";
import * as fs from "node:fs";
import { UserService } from "../user/user.service";
import { TransactionService } from "../transaction/transaction.service";
import { ConfigService } from "@nestjs/config";
import { URLSearchParams } from "node:url";

@Controller({ path: "shop-biz" })
export class ShopBizController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
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

    const shop = await this.shopService.findOneShopBy({
      where: { owner_id: bizId },
      relations: { loyal_program: { loyal_type: true }, type: true },
    });
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
  @Patch()
  async updateShopData(@Request() req: AuthRequest, @Body() body: UpdateMyShopDataDto) {
    const { accId, shopId } = req.user;
    if (!accId || !shopId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    await this.shopService.updateShop(shopId, body);

    return { data: "success" };
  }

  @UseGuards(JwtAccountGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photo", maxCount: 1 },
      { name: "banners", maxCount: 4 },
    ])
  )
  @Post("photos")
  async updateMyShopPhotos(
    @Request() req: AuthRequest,
    @UploadedFiles() files: { photo: Express.Multer.File[]; banners: Express.Multer.File[] }
  ) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const findShop = await this.shopService.findOneShopBy({ where: { owner_id: accId } });
    if (!findShop) {
      throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
    }

    const dirName = `${this.configService.get("staticPath")}/shops/${findShop.id}`;
    let photoUrl = "";
    if (files.photo?.length) {
      photoUrl = `${uuidv4()}.webp`;

      if (!fs.existsSync(dirName)) {
        mkdirp.sync(dirName);
      }

      if (findShop.photo) {
        fs.unlinkSync(`${dirName}/${findShop.photo}`);
      }

      try {
        await sharp(files.photo[0].buffer)
          .resize(200, 200)
          .webp({ quality: 100 })
          .toFile(`${dirName}/${photoUrl}`);
      } catch (e) {
        throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    const bannersUrls = findShop.banners ?? {};
    if (files.banners?.length) {
      if (!fs.existsSync(dirName)) {
        mkdirp.sync(dirName);
      }

      for await (const banner of files.banners) {
        const bannerData = new URLSearchParams(banner.originalname);
        const bannerIndex = bannerData.get("index");
        const bannerName = bannerData.get("name");

        if (bannerName !== "null") {
          fs.unlinkSync(`${dirName}/${bannerName}`);
        }

        try {
          const bannerId = uuidv4();
          await sharp(banner.buffer)
            .resize(400, 200, {
              fit: "inside",
            })
            .webp({ quality: 100 })
            .toFile(`${dirName}/${bannerId}.webp`);
          bannersUrls[bannerIndex] = `${bannerId}.webp`;
        } catch (e) {
          throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }

    await this.shopService.updateShop(findShop.id, {
      photo: photoUrl.length ? photoUrl : findShop.photo,
      banners: bannersUrls,
    });
    const findUpdatedShop = await this.shopService.findOneShopBy({ where: { id: findShop.id } });
    return { data: findUpdatedShop };
  }

  @UseGuards(JwtAccountGuard)
  @UseInterceptors(FileInterceptor("shopAvatar"))
  @Post("shop-avatar")
  async updateMyShopAvatar(@Request() req: AuthRequest, @UploadedFile() file: Express.Multer.File) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const findShop = await this.shopService.findOneShopBy({ where: { owner_id: accId } });
    if (!findShop) {
      throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
    }

    const dirName = `${this.configService.get("staticPath")}/shops/${findShop.id}`;
    const photoUrl = `${uuidv4()}.webp`;

    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }

    if (findShop.photo) {
      fs.unlinkSync(`${dirName}/${findShop.photo}`);
    }

    try {
      await sharp(file.buffer)
        .resize(200, 200)
        .webp({ quality: 100 })
        .toFile(`${dirName}/${photoUrl}`);
    } catch (e) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.shopService.updateShop(findShop.id, {
      photo: photoUrl.length ? photoUrl : findShop.photo,
    });
    const findUpdatedShop = await this.shopService.findOneShopBy({ where: { id: findShop.id } });
    return { data: findUpdatedShop };
  }

  @UseGuards(JwtAccountGuard)
  @UseInterceptors(FileInterceptor("banner"))
  @Post("banner")
  async updateMyShopBanner(@Request() req: AuthRequest, @UploadedFile() file: Express.Multer.File) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const findShop = await this.shopService.findOneShopBy({ where: { owner_id: accId } });
    if (!findShop) {
      throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
    }

    const dirName = `${this.configService.get("staticPath")}/shops/${findShop.id}`;
    const bannersUrls = findShop.banners ?? {};
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }

    const bannerData = new URLSearchParams(file.originalname);
    const bannerIndex = bannerData.get("index");
    const bannerName = bannerData.get("name");

    if (bannerName !== "null") {
      fs.unlinkSync(`${dirName}/${bannerName}`);
    }

    try {
      const bannerId = uuidv4();
      await sharp(file.buffer)
        .resize(400, 200, {
          fit: "inside",
        })
        .webp({ quality: 100 })
        .toFile(`${dirName}/${bannerId}.webp`);
      bannersUrls[bannerIndex] = `${bannerId}.webp`;
    } catch (e) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.shopService.updateShop(findShop.id, {
      banners: bannersUrls,
    });
    const findUpdatedShop = await this.shopService.findOneShopBy({ where: { id: findShop.id } });
    return { data: findUpdatedShop };
  }

  @UseGuards(JwtAccountGuard)
  @Delete("photos")
  async deletePhoto(@Request() req: AuthRequest, @Query() query: { id: string }) {
    if (!query.id) {
      throw new HttpException("Photo not found", HttpStatus.NOT_FOUND);
    }

    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const findShop = await this.shopService.findOneShopBy({ where: { owner_id: accId } });
    if (!findShop) {
      throw new HttpException("Shop not found", HttpStatus.NOT_FOUND);
    }

    const dirName = `${this.configService.get("staticPath")}/shops/${findShop.id}`;
    fs.unlinkSync(`${dirName}/${query.id}`);
    const bannersUrls = findShop.banners ?? {};
    const findIndex = Object.keys(bannersUrls).find((key) => bannersUrls[key] === query.id);
    delete bannersUrls[findIndex];
    await this.shopService.updateShop(findShop.id, {
      banners: bannersUrls,
    });

    return { data: "success" };
  }

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
    const client = await this.shopService.findOneClientBy({ where: { user: { id: user.id } } });
    return {
      data: {
        ...user,
        client,
      },
    };
  }

  @UseGuards(JwtAccountGuard)
  @Get("check-phone")
  async checkPhone(@Request() req: AuthRequest, @Query() query: { payload: string }) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ phone: query.payload });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const client = await this.shopService.findOneClientBy({ where: { user: { id: user.id } } });
    return {
      data: {
        ...user,
        client,
      },
    };
  }

  @UseGuards(JwtAccountGuard)
  @Get("client")
  async getShopClients(@Request() req: AuthRequest) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const clients = await this.shopService.findClientsBy({ relations: { user: true } });
    return {
      data: clients,
    };
  }

  @UseGuards(JwtAccountGuard)
  @Get("client/:id")
  async getShopClient(@Request() req: AuthRequest, @Param("id") id) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const client = await this.shopService.findOneClientBy({
      where: { id },
      relations: { user: true },
    });

    return {
      data: client,
    };
  }

  @UseGuards(JwtAccountGuard)
  @Get("client-purchases/:id")
  async getShopClientTransactions(@Request() req: AuthRequest, @Param("id") id: number) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const client = await this.shopService.findOneClientBy({
      where: { id },
    });
    if (!client) {
      throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
    }

    const transaction = await this.transactionService.getTransactions({
      where: { user_id: client.user_id, is_accrual: true },
    });

    return {
      data: transaction.length,
    };
  }

  @UseGuards(JwtAccountGuard)
  @Post("client-bonus/plus")
  async updateClientBonus(@Request() req: AuthRequest, @Body() data: UpdateClientBonusPlusDto) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ id: data.user_id });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const shop = await this.shopService.findOneShopBy({
      where: { owner_id: accId },
      relations: { loyal_program: { loyal_type: true } },
    });
    if (!shop || !shop.loyal_program) {
      throw new HttpException("Shop or loyal not found", HttpStatus.NOT_FOUND);
    }

    try {
      switch (shop.loyal_program.loyal_type.title) {
        case "Бонусная":
          await this.transactionService.createPlusBonus({
            loyalty_program: shop.loyal_program,
            user_id: user.id,
            shop_id: shop.id,
            ...data,
          });
          break;
        case "Дисконтная":
          await this.transactionService.createPlusDiscount({
            loyalty_program: shop.loyal_program,
            user_id: user.id,
            shop_id: shop.id,
            ...data,
          });
          break;

        default:
          throw new HttpException("Loyal type not found", HttpStatus.NOT_FOUND);
      }

      return {
        data: "success",
      };
    } catch (err) {
      throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAccountGuard)
  @Post("client-bonus/minus")
  async updateClientBonusMinus(
    @Request() req: AuthRequest,
    @Body() data: UpdateClientBonusMinusDto
  ) {
    const { accId } = req.user;
    if (!accId) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ id: data.user_id });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const shop = await this.shopService.findOneShopBy({
      where: { owner_id: accId },
      relations: { loyal_program: { loyal_type: true } },
    });
    if (!shop || !shop.loyal_program) {
      throw new HttpException("Shop or loyal not found", HttpStatus.NOT_FOUND);
    }

    try {
      switch (shop.loyal_program.loyal_type.title) {
        case "Бонусная":
          await this.transactionService.createMinusBonus({
            loyalty_program: shop.loyal_program,
            user_id: user.id,
            shop_id: shop.id,
            ...data,
          });
          break;
        case "Дисконтная":
          throw new HttpException("Loyal type discount", HttpStatus.BAD_REQUEST);

        default:
          throw new HttpException("Loyal type not found", HttpStatus.NOT_FOUND);
      }

      return {
        data: "success",
      };
    } catch (err) {
      throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
