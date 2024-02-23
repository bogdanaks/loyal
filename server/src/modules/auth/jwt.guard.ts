import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request as HttpRequest } from "express";

interface UserJwtPayload {
  id: number;
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload };

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {}
