import { z } from "zod";

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

const taskUpdateSchema = z
	.object({
		name: z.string().optional(),
		description: z.string().optional(),
		status: taskStatusSchema.optional(),
		expire: z.iso.datetime().optional(),
	})
	.strict();

const taskCreateSchema = taskUpdateSchema.extend({
	name: z.string().default("untitled").optional(),
	status: taskStatusSchema.default("TODO").optional(),
});

export const taskSchema = taskCreateSchema
	.required({ name: true, status: true })
	.extend({
		id: z.uuid().default(() => crypto.randomUUID()),
		createdAt: z.iso.datetime().default(() => new Date().toISOString()),
		updatedAt: z.iso.datetime().default(() => new Date().toISOString()),
	})
	.readonly();

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskCreate = z.infer<typeof taskCreateSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

type updateTaskArgs = {
	base: Task;
	diff: TaskUpdate;
};

export function createTask({ ...data }: TaskCreate): Task {
	const result = taskSchema.parse(taskCreateSchema.parse(data));
	return result;
}

export function updateTask({ ...data }: updateTaskArgs): Task {
	return taskSchema.parse({
		...taskSchema.parse(data.base),
		...taskUpdateSchema.parse(data.diff),
		updatedAt: new Date().toISOString(),
	});
}
