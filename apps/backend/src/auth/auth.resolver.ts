import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { serialize } from "cookie";
import { type Request, type Response } from "express";

import type { User } from "@/users/entities/user.entity";

import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response";
import { LoginUserInput } from "./dto/login-user.input";
import { GqlAuthGuard } from "./guards/gql-auth.guards";
import { JwtAuthGuard } from "./guards/jwt-auth.guards";

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => LoginResponse)
	@UseGuards(GqlAuthGuard)
	signIn(
		@Args("data", { type: () => LoginUserInput })
		_: LoginUserInput,
		@Context() context: { user: User; req: Request; res: Response },
	) {
		const ONE_HOUR = 3600;
		const { access_token, user } = this.authService.signIn(context.user);
		context.res.setHeader(
			"Set-Cookie",
			serialize("access_token", access_token, {
				httpOnly: true,
				maxAge: ONE_HOUR,
				sameSite: "none",
				secure: true,
			}),
		);
		return { user };
	}

	@Mutation(() => String)
	@UseGuards(JwtAuthGuard)
	signOut(@Context() context: { req: Request; res: Response }) {
		console.log(context);
		context.res.setHeader(
			"Set-Cookie",
			serialize("access_token", "", {
				httpOnly: true,
				maxAge: 0,
				sameSite: "none",
				secure: true,
			}),
		);
		return "signed out";
	}
}
