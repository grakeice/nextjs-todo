import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import bcrypt from "bcrypt";

import type { User } from "@/users/entities/user.entity";
import { UsersService } from "@/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOneWithEmail(email);

		if (user && (await bcrypt.compare(password, user.password))) {
			return user;
		}

		return null;
	}

	signIn(user: User) {
		const payload = { email: user.email, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
