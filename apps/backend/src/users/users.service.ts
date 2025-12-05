import { Injectable } from "@nestjs/common";

import bcrypt from "bcrypt";
import type { Prisma } from "generated/prisma/client";

import { PrismaService } from "@/prisma/prisma.service";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createUserInput: CreateUserInput) {
		return this.prisma.user.create({
			data: {
				...createUserInput,
				password: await bcrypt.hash(createUserInput.password, 10),
			},
		});
	}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findUnique(args: Prisma.UserFindUniqueArgs) {
		return this.prisma.user.findUnique(args);
	}

	async update(id: string, updateUserInput: UpdateUserInput) {
		if (updateUserInput.password) {
			return this.prisma.user.update({
				where: { id },
				data: {
					...updateUserInput,
					password: await bcrypt.hash(updateUserInput.password, 10),
				},
			});
		} else {
			return this.prisma.user.update({
				where: { id },
				data: {
					...updateUserInput,
				},
			});
		}
	}

	async remove(id: string) {
		return this.prisma.user.delete({ where: { id } });
	}
}
