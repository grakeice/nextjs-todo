import { Injectable, type OnModuleInit } from "@nestjs/common";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		const connectionString = `${process.env.DATABASE_URL}`;
		const pool = new Pool({ connectionString, query_timeout: 40000 });
		const adapter = new PrismaPg(pool);
		super({ adapter, log: ["info", "warn", "error"] });
	}
	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
