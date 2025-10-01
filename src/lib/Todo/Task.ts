import z from "zod";

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const taskSchema = z
	.object({
		id: z.uuid().default(crypto.randomUUID()),
		name: z.string().default("untitled"),
		description: z.string().optional(),
		status: taskStatusSchema.default("TODO"),
		expire: z.iso
			.datetime()
			.transform((v) => new Date(v))
			.optional(),
		createdAt: z.iso
			.datetime()
			.default(() => new Date().toISOString())
			.transform((v) => new Date(v)),
		updatedAt: z.iso
			.datetime()
			.default(() => new Date().toISOString())
			.transform((v) => new Date(v)),
	})
	.readonly();

export type Task = z.infer<typeof taskSchema>;

export type TaskStatus = z.infer<typeof taskStatusSchema>;

type editTaskArgs = {
	base: Task;
	diff: Pick<Partial<Task>, "name" | "description" | "status" | "expire">;
};

export function createTask({
	...data
}: Omit<Partial<Task>, "createdAt">): Task {
	const result = taskSchema.parse(data);
	if ("createdAt" in data) throw new Error("作成日は設定できません");
	return result;
}

export function editTask({ ...data }: editTaskArgs): Task {
	return taskSchema.parse({
		...data.base,
		...data.diff,
		updatedAt: new Date(),
	});
}
