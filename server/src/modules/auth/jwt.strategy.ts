import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface JwtPayload {
  data: { id: number };
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(readonly configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("jwtUserSecretKey"),
    });
  }

  public async validate(payload: JwtPayload) {
    if (payload.data) {
      return { id: payload.data };
    }
    return null;
  }
}
