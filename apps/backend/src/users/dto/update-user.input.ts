import { InputType, Field, ID } from "@nestjs/graphql";

import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

@InputType()
export class UpdateUserInput {
	@Field(() => ID)
	@IsUUID()
	@IsNotEmpty()
	id: string;

	@Field(() => String)
	@IsEmail()
	email: string;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	password: string;
}
