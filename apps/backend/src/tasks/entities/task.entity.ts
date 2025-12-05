import { ObjectType, Field, registerEnumType, ID } from "@nestjs/graphql";

import { TaskStatus } from "generated/prisma/client";

import { User } from "@/users/entities/user.entity";

registerEnumType(TaskStatus, {
	name: "TaskStatus",
});

@ObjectType()
export class Task {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	title: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => TaskStatus)
	status: TaskStatus;

	@Field(() => Date, { nullable: true })
	expireAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date, { nullable: true })
	updatedAt: Date | null;

	@Field(() => String)
	userId: string;

	@Field(() => User)
	user: User;
}
