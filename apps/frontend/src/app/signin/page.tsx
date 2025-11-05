"use client";

import React from "react";
import type { JSX } from "react";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LoginResponse } from "@/generated/graphql";

const formSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export default function Page(): JSX.Element {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const res = await signIn({ variables: { ...data } });
		toast("Response: ", {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
					<code>{JSON.stringify(res.data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});
	};

	const SIGN_IN = gql`
		mutation SignIn($email: String!, $password: String!) {
			signIn(data: { email: $email, password: $password }) {
				user {
					id
				}
			}
		}
	`;

	const [signIn] = useMutation<LoginResponse>(SIGN_IN);

	return (
		<div className={"flex h-dvh w-full items-center justify-center"}>
			<form
				className={"flex w-full"}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Card className={"mx-auto w-full sm:max-w-md"}>
					<CardHeader>
						<CardTitle>サインイン</CardTitle>
					</CardHeader>
					<CardContent>
						<FieldGroup>
							<Controller
								control={form.control}
								name={"email"}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Email</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name={"password"}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>Password</FieldLabel>
										<Input
											{...field}
											type={"password"}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</CardContent>
					<CardFooter className={"flex-col gap-2"}>
						<Button type={"submit"} className={"w-full"}>
							Sign In
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
