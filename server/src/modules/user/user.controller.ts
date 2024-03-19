import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import { AuthRequest, JwtGuard } from "../auth/jwt.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "./user.entity";
import * as sharp from "sharp";
import * as fs from "node:fs";
import { mkdirp } from "mkdirp";
import { v4 as uuidv4 } from "uuid";

@Controller({ path: "user" })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  @UseGuards(JwtGuard)
  @Get("me")
  async getMe(@Request() req: AuthRequest) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOneBy({ id: userId });
    return { data: user };
  }

  @UseGuards(JwtGuard)
  @Patch()
  async updateUser(@Request() req: AuthRequest, @Body() body: Partial<User>) {
    const userId = req.user.id;
    await this.userService.updateUserById(userId, body);
    return { data: "success" };
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor("photo"))
  @Patch("photo")
  async updatePhoto(@Request() req: AuthRequest, @UploadedFile() photo: Express.Multer.File) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const dirName = `${this.configService.get("staticPath")}/users`;
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }

    try {
      const photoId = uuidv4();
      const photoFilename = `${userId}_${photoId}.webp`;

      if (photo.originalname !== "null") {
        fs.unlinkSync(`${dirName}/${photo.originalname}`);
      }

      await sharp(photo.buffer)
        .resize(200, 200)
        .webp({ quality: 100 })
        .toFile(`${dirName}/${photoFilename}`);

      await this.userService.updateUserById(userId, { photo: photoFilename });
      return { data: "success" };
    } catch (e) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
