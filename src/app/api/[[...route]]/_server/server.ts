import { Hono } from "hono";

import tasks from "./tasks/server";

const app = new Hono()
	.get("/", (c) => {
		return c.text("Hello World!");
	})
	.route("/tasks", tasks);

export default app;
