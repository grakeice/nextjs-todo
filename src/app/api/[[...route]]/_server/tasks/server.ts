import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { type Task, taskInputSchema } from "@/lib/Todo/Task";

const tasks: Task[] = [];

const app = new Hono()
	.get("/", (c) => {
		return c.json(tasks);
	})
	.post("/", zValidator("json", taskInputSchema), (c) => {
		const data = c.req.valid("json");
		tasks.push(data);
		return c.json(data);
	});

export default app;
