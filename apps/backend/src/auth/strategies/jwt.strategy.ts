import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from "@/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			throw new Error("JWT_SECRET environment variable is not defined");
		}

		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				// eslint-disable-next-line @typescript-eslint/unbound-method
				JwtStrategy.extractJWT,
			]),
			ignoreExpiration: false,
			secretOrKey: jwtSecret,
		});
	}

	async validate(payload: { email: string; sub: string }) {
		return this.usersService.findUnique({
			where: { email: payload.email },
		});
	}

	private static extractJWT(req: Request): string {
		const cookies = (req as Request & { cookies?: Record<string, unknown> })
			.cookies;
		if (
			cookies &&
			"access_token" in cookies &&
			typeof cookies.access_token === "string" &&
			cookies.access_token.length > 0
		) {
			return cookies.access_token;
		}
		return "";
	}
}
