import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request as HttpRequest } from "express";

interface UserJwtPayload {
  accId: number;
  shopId: number;
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload };

@Injectable()
export class JwtAccountGuard extends AuthGuard("jwt-account") {}
