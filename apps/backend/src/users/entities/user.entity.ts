import { ObjectType, Field, ID } from "@nestjs/graphql";

import { IsEmail } from "class-validator";

import { Task } from "@/tasks/entities/task.entity";

@ObjectType()
export class User {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	@IsEmail()
	email: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	password: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date, { nullable: true })
	updatedAt: Date | null;

	@Field(() => [Task])
	Task: Task[];
}
