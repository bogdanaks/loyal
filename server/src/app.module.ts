import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { TelegramUserModule } from "./modules/telegram-user/telegram-user.module";
import { TelegramBizModule } from "./modules/telegram-biz/telegram-biz.module";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/user/user.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { HelpModule } from "./modules/help/help.module";
import { TelegrafModule } from "nestjs-telegraf";
import { ShopType } from "./modules/shop/shop-type.entity";
import { ShopModule } from "./modules/shop/shop.module";
import { Shop } from "./modules/shop/shop.entity";
import { LoyalType } from "./modules/loyal/loyal-type.entity";
import { LoyalProgram } from "./modules/loyal/loyal-program.entity";
import { LoyalModule } from "./modules/loyal/loyal.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { ShopClient } from "./modules/shop/shop-client.entity";
import { PointTransaction } from "./modules/transaction/point-transaction.entity";
import { Transaction } from "./modules/transaction/transaction.entity";
import { AccountBusiness } from "./modules/account/account-business.entity";
import { AccountModule } from "./modules/account/account.module";
import { ShopStatus } from "./modules/shop/shop-status.entity";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
      serveRoot: "/static",
      exclude: ["/api/(.*)"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
        const dbConfig: DatabaseConfig = configService.get("database");
        return {
          type: "postgres",
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [
            User,
            Shop,
            ShopType,
            ShopClient,
            ShopStatus,
            AccountBusiness,
            LoyalType,
            LoyalProgram,
            PointTransaction,
            Transaction,
          ],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      botName: "user",
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
        const tgConfig: TelegramConfig = configService.get("tg");
        return {
          token: tgConfig.tgBotUserApiKey,
          include: [TelegramUserModule],
          options: {
            telegram: {
              testEnv: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      botName: "biz",
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
        const tgConfig: TelegramConfig = configService.get("tg");
        return {
          token: tgConfig.tgBotBusinessApiKey,
          include: [TelegramBizModule],
          options: {
            telegram: {
              testEnv: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TelegramUserModule,
    TelegramBizModule,
    HelpModule,
    AccountModule,
    ShopModule,
    LoyalModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
