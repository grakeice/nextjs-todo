import { InputType, Field } from "@nestjs/graphql";

import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
	@Field(() => String)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Field(() => String)
	@IsNotEmpty()
	name: string;

	@Field(() => String)
	@IsNotEmpty()
	password: string;
}
