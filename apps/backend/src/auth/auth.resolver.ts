import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

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
		@Context() context: { user: User },
	) {
		return this.authService.signIn(context.user);
	}
}
