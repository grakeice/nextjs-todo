import { z } from "zod";

import { TaskStatus } from "@/graphql/graphql";

export const editTaskSchema = z.object({
	title: z.string().default(""),
	status: z.enum(TaskStatus).default(TaskStatus.Todo),
	description: z.string().default(""),
	expireAt: z.iso.datetime().default(""),
});
