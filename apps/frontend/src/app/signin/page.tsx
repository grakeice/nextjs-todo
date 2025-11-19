"use client";

import React from "react";
import type { JSX } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRoundIcon, MailIcon } from "lucide-react";
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
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { signInSchema } from "@/context/AccountContext";
import { useAccount } from "@/hooks/useAccount";

export default function Page(): JSX.Element {
	// const user = use(AccountContext);
	const { signIn } = useAccount();
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		const res = await signIn(data.email, data.password);
		toast("Response: ", {
			description: (
				<pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
					<code>{JSON.stringify(res, null, 2)}</code>
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
							Sign In
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
