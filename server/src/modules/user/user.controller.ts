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

    sharp(photo.buffer)
      .resize(200, 200)
      .webp({ quality: 100 })
      .toFile(`/Users/user/Desktop/my/loyal/server/static/${userId}.webp`, async (err) => {
        if (err) {
          throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        await this.userService.updateUserById(userId, { photo: `${userId}.webp` });
        return { data: "success" };
      });
  }
}
