import { Injectable } from "@nestjs/common";

import type { Prisma } from "generated/prisma";

import { PrismaService } from "@/prisma/prisma.service";

import { CreateTaskInput } from "./dto/create-task.input";
import { UpdateTaskInput } from "./dto/update-task.input";

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: string, createTaskInput: CreateTaskInput) {
		// relationalなのでuserIdが必須
		return await this.prisma.task.create({
			data: { userId, ...createTaskInput },
		});
	}

	async findAll(args: Prisma.TaskFindManyArgs) {
		return await this.prisma.task.findMany(args);
	}

	async findUnique(args: Prisma.TaskFindUniqueArgs) {
		return await this.prisma.task.findUnique(args);
	}

	async update(
		args: Omit<Prisma.TaskUpdateArgs, "data">,
		updateTaskInput: UpdateTaskInput,
	) {
		return await this.prisma.task.update({
			...args,
			data: updateTaskInput,
		});
	}

	async remove(userId: string, id: string) {
		return await this.prisma.task.delete({ where: { userId, id } });
	}
}
