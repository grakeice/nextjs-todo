"use client";

import type { JSX } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { KeyRoundIcon, MailIcon } from "lucide-react";
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
import { useAccount } from "@/hooks/useAccount";
import { signInSchema } from "@/schema/accountSchema";

export default function Page(): JSX.Element {
	const { data } = useAccount();
	if (data) redirect("/");

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
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
				data,
			),
		onSuccess: () => {
			toast("サインインしました");
		},
		onError: () => {
			toast.error("サインインに失敗しました", {});
		},
		onSettled: () => {
			queryClient.refetchQueries();
		},
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		signIn.mutate(data);
	};

	return (
		<div className={"flex h-full w-full items-center justify-center"}>
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
										<FieldLabel htmlFor={field.name}>
											メールアドレス
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<MailIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												placeholder={"メールアドレス"}
												type={"email"}
												aria-invalid={
													fieldState.invalid
												}
												id={field.name}
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
										<FieldLabel htmlFor={field.name}>
											パスワード
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<KeyRoundIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												type={"password"}
												placeholder={"パスワード"}
												aria-invalid={
													fieldState.invalid
												}
												id={field.name}
												autoComplete={
													"current-password"
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
						</FieldGroup>
					</CardContent>
					<CardFooter className={"flex-col gap-2"}>
						<Button type={"submit"} className={"w-full"}>
							サインイン
						</Button>
						<p
							className={
								"text-sm text-gray-700 dark:text-gray-300"
							}
						>
							<span>アカウントを持っていませんか？: </span>
							<Link href={"/signup"} className={"underline"}>
								サインアップ
							</Link>
						</p>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
