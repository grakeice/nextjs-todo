import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";

import type { IncomingMessage } from "node:http";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guards";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	createUser(@Args("data") createUserInput: CreateUserInput) {
		return this.usersService.create(createUserInput);
	}

	// 削除すべきかもしれない
	// @Query(() => [User], { name: "users" })
	// findAll() {
	// 	return this.usersService.findAll();
	// }

	@Query(() => User, { name: "user" })
	@UseGuards(JwtAuthGuard)
	async findUnique(
		@Args("email", { type: () => String, nullable: true }) email: string,
		@Context() context: { req: IncomingMessage & { user: User } },
	) {
		const id = context.req.user.id;

		return await this.usersService.findUnique({ where: { id, email } });
	}

	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	updateUser(
		@Args("updateUserInput") updateUserInput: UpdateUserInput,
		@Context() context: { req: IncomingMessage & { user: User } },
	) {
		const id = context.req.user.id;
		return this.usersService.update(id, updateUserInput);
	}

	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	removeUser(@Context() context: { req: IncomingMessage & { user: User } }) {
		const id = context.req.user.id;

		return this.usersService.remove(id);
	}
}
