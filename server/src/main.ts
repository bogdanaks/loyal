import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://127.0.0.1:5174",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://192.168.31.21:3000",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
