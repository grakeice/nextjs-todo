"use client";

import { useLayoutEffect, useRef, useState, type JSX } from "react";

import { redirect, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Edit3Icon, KeyRoundIcon, MailIcon, User2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Loading } from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
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
import {
	SignInDocument,
	type GetUserDataQuery,
	type SignInMutationVariables,
	type UpdateUserMutationVariables,
} from "@/graphql/graphql";
import { useAccount } from "@/hooks/useAccount";
import { editUserSchema } from "@/schema/accountSchema";

interface UserPageProps {
	data: GetUserDataQuery;
}

function UserPage({ data }: UserPageProps): JSX.Element {
	const form = useForm<z.infer<typeof editUserSchema>>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			name: data?.user.name,
			email: data?.user.email,
			password: "",
			newPassword: "",
			passwordConfirm: "",
		},
	});

	const router = useRouter();

	const [isComposing, setIsComposing] = useState(false);
	const [userNameEditable, setUserNameEditable] = useState(false);
	const userNameRef = useRef<HTMLSpanElement>(null);

	/**
	 * userNameが編集可能になったら要素にフォーカスし、カーソルを文字列の最後に合わせる
	 * (ContentEditableにフォーカスさせるだけだとカーソルが文字列の最初に来る)
	 */
	useLayoutEffect(() => {
		if (!userNameEditable || isComposing) return;
		userNameRef.current?.focus();
		const selection = window.getSelection();
		const range = document.createRange();
		const offset = userNameRef.current?.textContent
			? [...userNameRef.current?.textContent].length
			: 0;
		if (userNameRef.current?.firstChild) {
			range.setStart(userNameRef.current.firstChild, offset);
			range.setEnd(userNameRef.current.firstChild, offset);
		}
		selection?.removeAllRanges();
		selection?.addRange(range);
	}, [userNameEditable, isComposing]);

	const signIn = useMutation({
		mutationFn: (data: SignInMutationVariables) =>
			execute(SignInDocument, data),
	});

	const updateUser = useMutation({
		mutationFn: (data: UpdateUserMutationVariables) =>
			execute(
				graphql(`
					mutation UpdateUser(
						$id: ID!
						$name: String!
						$email: String!
						$newPassword: String
					) {
						updateUser(
							updateUserInput: {
								id: $id
								name: $name
								email: $email
								password: $newPassword
							}
						) {
							id
							email
						}
					}
				`),
				{
					...data,
					newPassword: data.newPassword
						? data.newPassword
						: undefined,
				},
			),
		onError: () => {
			toast.error("ユーザー情報の更新に失敗しました");
		},
		onSuccess: (data) => {
			toast("ユーザー情報を更新しました");
			signIn.mutate(
				{
					email: data.updateUser.email,
					password: form.getValues("newPassword")
						? form.getValues("newPassword")
						: form.getValues("password"),
				},
				{
					onSuccess: () => {
						router.push("/");
					},
				},
			);
		},
	});

	const onSubmit = async (formData: z.infer<typeof editUserSchema>) => {
		updateUser.mutate({ ...formData, id: data.user.id });
	};

	return (
		<div className={"mx-auto w-full px-4 sm:max-w-md sm:px-0"}>
			<div className={"flex items-center gap-4"}>
				<div
					className={
						"bg-accent flex h-15 w-15 items-center justify-center rounded-full"
					}
				>
					<User2Icon size={32} />
				</div>
				<div className={"flex flex-row items-center"}>
					<span
						className={"text-3xl font-bold"}
						contentEditable={userNameEditable}
						onCompositionStart={() => setIsComposing(true)}
						onCompositionEnd={() => setIsComposing(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !isComposing) {
								e.preventDefault();
								setUserNameEditable(false);
							}
						}}
						onBlur={() => {
							setUserNameEditable(false);
						}}
						onInput={(e) => {
							form.setValue("name", e.currentTarget.textContent);
						}}
						ref={userNameRef}
						suppressContentEditableWarning
					>
						{form.getValues("name")}
					</span>
					<Button
						variant={"link"}
						className={"group translate-y-0.5 cursor-pointer"}
						onClick={() => {
							setUserNameEditable(true);
						}}
					>
						<span className={"group-hover:border-b-2"}>
							<Edit3Icon className={"text-gray-500"} />
						</span>
					</Button>
				</div>
			</div>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						control={form.control}
						name={"name"}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<input {...field} hidden required />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
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
										placeholder={"メールアドレスを入力…"}
										type={"email"}
										aria-invalid={fieldState.invalid}
										id={field.name}
										autoComplete={"username"}
										required
									/>
								</InputGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
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
									現在のパスワード
								</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<KeyRoundIcon />
									</InputGroupAddon>
									<InputGroupInput
										{...field}
										type={"password"}
										placeholder={"現在のパスワードを入力…"}
										aria-invalid={fieldState.invalid}
										id={field.name}
										autoComplete={"current-password"}
										required
									/>
								</InputGroup>
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name={"newPassword"}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor={field.name}>
									新しいパスワード
								</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<KeyRoundIcon />
									</InputGroupAddon>
									<InputGroupInput
										{...field}
										type={"password"}
										placeholder={"新しいパスワードを入力…"}
										aria-invalid={fieldState.invalid}
										id={field.name}
										autoComplete={"new-password"}
									/>
								</InputGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
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
									新しいパスワードを確認
								</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<KeyRoundIcon />
									</InputGroupAddon>
									<InputGroupInput
										{...field}
										type={"password"}
										placeholder={
											"新しいパスワードを再入力…"
										}
										aria-invalid={fieldState.invalid}
										id={field.name}
										autoComplete={"new-password"}
									/>
								</InputGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
				<div className={"mt-12"}>
					<Button className={"w-full"} type={"submit"}>
						保存
					</Button>
				</div>
			</form>
		</div>
	);
}

export default function Page(): JSX.Element {
	const { data, isLoading } = useAccount();
	if (!data && !isLoading) redirect("/");

	if (!data || isLoading) return <Loading />;
	return <UserPage data={data} />;
}
