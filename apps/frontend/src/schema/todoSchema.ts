import { z } from "zod";

import { TaskStatus } from "@/graphql/graphql";

export const editTaskSchema = z.object({
	title: z.string().optional(),
	status: z.enum(TaskStatus).optional(),
	description: z.string().optional(),
	expireAt: z.iso.datetime().optional(),
});
