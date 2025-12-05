"use client";

import type { JSX } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleUserRoundIcon, KeyRoundIcon, MailIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { queryClient } from "@/components/common/GqlClientProvider";
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
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { signUpSchema } from "@/schema/accountSchema";

export default function Page(): JSX.Element {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});

	const signUp = useMutation({
		mutationKey: ["user"],
		mutationFn: (data: { name: string; email: string; password: string }) =>
			execute(
				graphql(`
					mutation SignUp(
						$name: String!
						$email: String!
						$password: String!
					) {
						createUser(
							data: {
								name: $name
								email: $email
								password: $password
							}
						) {
							id
							email
							name
						}
					}
				`),
				{
					...data,
				},
			),
	});

	const signIn = useMutation({
		mutationKey: ["user"],
		mutationFn: (data: { email: string; password: string }) =>
			execute(
				graphql(`
					mutation SignIn($email: String!, $password: String!) {
						signIn(data: { email: $email, password: $password }) {
							user {
								id
								email
								name
							}
						}
					}
				`),
				{ ...data },
			),
	});

	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
		signUp.mutate(data, {
			onSuccess: () => {
				signIn.mutate(data, {
					onSuccess: (data) => {
						queryClient.refetchQueries();
						router.push("/");
						toast("Response: ", {
							description: (
								<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
									<code>
										{JSON.stringify(data.signIn, null, 2)}
									</code>
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
					},
				});
			},
		});
	};
	return (
		<div className={"flex h-full w-full items-center justify-center"}>
			<form
				className={"flex w-full"}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Card className={"mx-auto w-full sm:max-w-md"}>
					<CardHeader>
						<CardTitle>サインアップ</CardTitle>
					</CardHeader>
					<CardContent>
						<FieldGroup>
							<Controller
								control={form.control}
								name={"name"}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>User Name</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<CircleUserRoundIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												placeholder={"User Name"}
												type={"text"}
												aria-invalid={
													fieldState.invalid
												}
											/>
										</InputGroup>
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
								name={"email"}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Email</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<MailIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												placeholder={"Email"}
												type={"email"}
												aria-invalid={
													fieldState.invalid
												}
												autoComplete={"username"}
											/>
										</InputGroup>
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
										<InputGroup>
											<InputGroupAddon>
												<KeyRoundIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												type={"password"}
												placeholder={"Password"}
												aria-invalid={
													fieldState.invalid
												}
												autoComplete={"new-password"}
											/>
										</InputGroup>
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
								name={"passwordConfirm"}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel>
											Confirm password
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<KeyRoundIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												type={"password"}
												placeholder={"Confirm password"}
												aria-invalid={
													fieldState.invalid
												}
												autoComplete={"new-password"}
											/>
										</InputGroup>
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
							Sign Up
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
