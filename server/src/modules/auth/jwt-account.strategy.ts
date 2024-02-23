import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface JwtPayload {
  data: { userId: number; shopId: number };
  iat: number;
  exp: number;
}

@Injectable()
export class JwtAccountStrategy extends PassportStrategy(Strategy, "jwt-account") {
  constructor(readonly configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("jwtAccountSecretKey"),
    });
  }

  public async validate(payload: JwtPayload) {
    if (payload.data) {
      return payload.data;
    }
    return null;
  }
}
