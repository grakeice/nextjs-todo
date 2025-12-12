import { z } from "zod";

export const signInSchema = z.object({
	email: z.email(),
	password: z.string().min(5),
});

export const signUpSchema = signInSchema
	.extend({
		name: z.string().min(2),
		passwordConfirm: z.string(),
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				path: ["passwordConfirm"],
				code: "custom",
				message: "パスワードが一致しません",
			});
		}
	});

export const editUserSchema = signInSchema
	.extend({
		name: z.string().min(2),
		newPassword: z.union([z.string().min(5), z.literal("")]),
		passwordConfirm: z.union([z.string(), z.literal("")]),
	})
	.superRefine(({ newPassword, passwordConfirm }, ctx) => {
		if (newPassword !== passwordConfirm) {
			ctx.addIssue({
				path: ["passwordConfirm"],
				code: "custom",
				message: "パスワードが一致しません",
			});
		}
	});
