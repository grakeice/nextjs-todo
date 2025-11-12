import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { serialize } from "cookie";
import type { Request, Response } from "express";

import type { User } from "@/users/entities/user.entity";

import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response";
import { LoginUserInput } from "./dto/login-user.input";
import { GqlAuthGuard } from "./guards/gql-auth.guards";

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => LoginResponse)
	@UseGuards(GqlAuthGuard)
	signIn(
		@Args("data", { type: () => LoginUserInput })
		_: LoginUserInput,
		@Context() context: { user: User; req: Request; res: Response },
		// @Res({ passthrough: true }) response: Response,
	) {
		const ONE_HOUR = 3600 * 1000;
		const { access_token, user } = this.authService.signIn(context.user);
		context.res.setHeader(
			"Set-Cookie",
			serialize("access_token", access_token, {
				httpOnly: true,
				maxAge: ONE_HOUR,
			}),
		);
		return { access_token, user };
	}
}
