import { z } from "zod";

export const signInSchema = z.object({
	email: z.email(),
	password: z.string().min(1),
});

export const signUpSchema = signInSchema
	.extend({
		name: z.string(),
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
