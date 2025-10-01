import z from "zod";

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const taskSchema = z
	.object({
		id: z.uuid().default(crypto.randomUUID()),
		name: z.string().default("untitled"),
		description: z.string().optional(),
		status: taskStatusSchema.default("TODO"),
		expire: z.date().optional(),
		createdAt: z
			.date()
			.readonly()
			.default(() => new Date()),
		updatedAt: z.date().default(() => new Date()),
	})
	.readonly();

export type Task = z.infer<typeof taskSchema>;

export type TaskStatus = z.infer<typeof taskStatusSchema>;

type editTaskArgs = {
	original: Task;
	diff: Pick<Partial<Task>, "name" | "description" | "status" | "expire">;
};

export function createTask({ ...data }: Partial<Task>): Task {
	return taskSchema.parse(data);
}

export function editTask({ ...data }: editTaskArgs): Task {
	return taskSchema.parse({
		...data.original,
		...data.diff,
		updatedAt: new Date(),
	});
}
