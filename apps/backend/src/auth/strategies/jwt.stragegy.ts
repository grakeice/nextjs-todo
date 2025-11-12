import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from "@/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				// eslint-disable-next-line @typescript-eslint/unbound-method
				JwtStrategy.extractJWT,
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET as string,
		});
	}

	async validate(payload: { email: string; sub: string }) {
		return this.usersService.findUnique({
			where: { email: payload.email },
		});
	}

	private static extractJWT(
		req: Request & { cookies: { access_token: string } },
	): string {
		if (
			req.cookies &&
			"access_token" in req.cookies &&
			req.cookies.access_token.length > 0
		) {
			return req.cookies.access_token;
		}
		return "";
	}
}
