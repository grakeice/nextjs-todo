import { z } from "zod";

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const taskInputSchema = z
	.object({
		name: z.string().optional(),
		description: z.string().optional(),
		status: taskStatusSchema.optional(),
		expire: z.iso.datetime().optional(),
	})
	.strict();

export const taskSchema = taskInputSchema
	.extend({
		id: z.uuid().optional(),
		createdAt: z.iso.datetime().optional(),
		updatedAt: z.iso.datetime().optional(),
	})
	.readonly();

export type Task = z.infer<typeof taskSchema>;
export type TaskInput = z.infer<typeof taskInputSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;

type updateTaskArgs = {
	base: Task;
	diff: TaskInput;
};

export function createTask({ ...data }: TaskInput): Task {
	const result = taskInputSchema.parse(data);
	return result;
}

export function updateTask({ ...data }: updateTaskArgs): Task {
	return taskSchema.parse({
		...taskSchema.parse(data.base),
		...taskInputSchema.parse(data.diff),
	});
}
