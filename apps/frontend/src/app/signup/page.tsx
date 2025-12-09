"use client";

import type { JSX } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleUserRoundIcon, KeyRoundIcon, MailIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { queryClient } from "@/components/common/GqlClientProvider";
import { ToastErrorDescription } from "@/components/common/ToastErrorDescription";
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
		onSuccess: () => {
			toast.success("アカウントを作成しました");
		},
		onError: (error) => {
			toast.error("アカウントの作成に失敗しました", {
				description: <ToastErrorDescription error={error} />,
			});
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
			router.push("/");
		},
		onError: () => {
			toast.error("サインインに失敗しました");
		},
		onSettled: () => {
			queryClient.refetchQueries();
		},
	});

	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
		signUp.mutate(data, {
			onSuccess: () => {
				signIn.mutate(data);
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
										<FieldLabel htmlFor={field.name}>
											ユーザー名
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<CircleUserRoundIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												placeholder={
													"ユーザー名を入力…"
												}
												type={"text"}
												aria-invalid={
													fieldState.invalid
												}
												id={field.name}
												autoComplete={"off"}
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
										<FieldLabel htmlFor={field.name}>
											メールアドレス
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<MailIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												placeholder={
													"メールアドレスを入力…"
												}
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
												placeholder={
													"パスワードを入力…"
												}
												aria-invalid={
													fieldState.invalid
												}
												id={field.name}
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
										<FieldLabel htmlFor={field.name}>
											パスワードを確認
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<KeyRoundIcon />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												type={"password"}
												placeholder={
													"パスワードを再入力…"
												}
												aria-invalid={
													fieldState.invalid
												}
												id={field.name}
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
							サインアップ
						</Button>
						<p className={"text-sm text-gray-700"}>
							<span>既にアカウントを持っていますか？: </span>
							<Link href={"/signin"} className={"underline"}>
								サインイン
							</Link>
						</p>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
