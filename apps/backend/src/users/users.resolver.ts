import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

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

	@Query(() => [User], { name: "users" })
	findAll() {
		return this.usersService.findAll();
	}

	@Query(() => User, { name: "user" })
	@UseGuards(JwtAuthGuard)
	async findUnique(
		@Args("id", { type: () => String, nullable: true }) id?: string,
		@Args("email", { type: () => String, nullable: true }) email?: string,
	) {
		return await this.usersService.findUnique({ where: { id, email } });
	}

	@Mutation(() => User)
	updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
		return this.usersService.update(updateUserInput.id, updateUserInput);
	}

	@Mutation(() => User)
	removeUser(@Args("id", { type: () => String }) id: string) {
		return this.usersService.remove(id);
	}
}
