import { InputType, Field, registerEnumType } from "@nestjs/graphql";

import { TaskStatus } from "generated/prisma/client";

registerEnumType(TaskStatus, {
	name: "TaskStatus",
});

@InputType()
export class UpdateTaskInput {
	@Field(() => String, { nullable: true })
	title?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => TaskStatus, { nullable: true })
	status?: TaskStatus;

	@Field(() => Date, { nullable: true })
	expireAt?: Date;
}
