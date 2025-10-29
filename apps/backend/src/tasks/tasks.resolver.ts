import { Request, UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";

import type { IncomingMessage } from "node:http";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guards";
import type { User } from "@/users/entities/user.entity";

import { CreateTaskInput } from "./dto/create-task.input";
import { UpdateTaskInput } from "./dto/update-task.input";
import { Task } from "./entities/task.entity";
import { TasksService } from "./tasks.service";

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
	constructor(private readonly tasksService: TasksService) {}

	@Mutation(() => Task)
	createTask(
		@Args("data") createTaskInput: CreateTaskInput,
		@Context() context: { req: IncomingMessage & { user: User } },
	) {
		const userId = context.req.user.id;

		return this.tasksService.create(userId, createTaskInput);
	}

	@Query(() => [Task], { name: "tasks" })
	findAll(@Context() context: { req: IncomingMessage & { user: User } }) {
		const userId = context.req.user.id;

		return this.tasksService.findAll({ where: { userId } });
	}

	@Query(() => Task, { name: "task" })
	findUnique(
		@Args("id", { type: () => String }) id: string,
		@Context() context: { req: IncomingMessage & { user: User } },
	) {
		const userId = context.req.user.id;

		return this.tasksService.findUnique({ where: { userId, id } });
	}

	@Mutation(() => Task)
	updateTask(
		@Args("id", { type: () => String })
		id: string,
		@Args("data", { type: () => UpdateTaskInput })
		updateTaskInput: UpdateTaskInput,
		@Context() context: { req: IncomingMessage & { user: User } },
	) {
		const userId = context.req.user.id;

		return this.tasksService.update(
			{ where: { userId, id } },
			updateTaskInput,
		);
	}

	@Mutation(() => Task)
	removeTask(
		@Args("id", { type: () => String }) id: string,
		@Context() context: { req: IncomingMessage & { user: User } },
	) {
		const userId = context.req.user.id;

		return this.tasksService.remove(userId, id);
	}
}
