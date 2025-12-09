import { useRef, useState, type JSX } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
	CalendarIcon,
	ChevronDownIcon,
	ClockIcon,
	RectangleEllipsisIcon,
	TextAlignStartIcon,
} from "lucide-react";
import { ja } from "react-day-picker/locale";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import {
	TaskStatus,
	type CreateTaskMutation,
	type UpdateTaskMutation,
} from "@/graphql/graphql";
import { editTaskSchema } from "@/schema/todoSchema";

interface BaseTaskProps {
	mode: "create" | "edit";
	id?: string;
	data?: z.infer<typeof editTaskSchema>;
}
interface CreateTaskProps extends BaseTaskProps {
	mode: "create";
}

interface EditTaskProps extends BaseTaskProps {
	id: string;
	mode: "edit";
}

function combineDateAndTime(date?: Date, time?: string) {
	if (!date && !time) return undefined;
	const result = date ? new Date(date) : new Date();
	const [hh = "00", mm = "00", ss = "00"] = (time ?? "00:00:00").split(":");
	result.setHours(Number(hh), Number(mm), Number(ss), 0);
	return result;
}

export function EditTask({
	mode,
	id,
	data,
}: EditTaskProps | CreateTaskProps): JSX.Element {
	const form = useForm({
		resolver: zodResolver(editTaskSchema),
		defaultValues: {
			title: data?.title ?? "",
			description: data?.description ?? "",
			status: data?.status ?? TaskStatus.Todo,
			expireAt: data?.expireAt ?? "",
		},
	});

	const editTask = useMutation<
		UpdateTaskMutation | CreateTaskMutation,
		Error,
		z.infer<typeof editTaskSchema>
	>({
		mutationKey: ["todo"],
		mutationFn: (data: z.infer<typeof editTaskSchema>) => {
			if (mode === "edit") {
				return execute(
					graphql(`
						mutation UpdateTask(
							$id: String!
							$title: String
							$description: String
							$expireAt: DateTime
							$status: TaskStatus
						) {
							updateTask(
								id: $id
								data: {
									title: $title
									description: $description
									expireAt: $expireAt
									status: $status
								}
							) {
								title
							}
						}
					`),
					{
						...data,
						id,
						expireAt: data.expireAt !== "" ? data.expireAt : null,
					},
				);
			} else {
				return execute(
					graphql(`
						mutation CreateTask(
							$title: String
							$description: String
							$expireAt: DateTime
							$status: TaskStatus
						) {
							createTask(
								data: {
									title: $title
									description: $description
									status: $status
									expireAt: $expireAt
								}
							) {
								title
							}
						}
					`),
					{
						...data,
						expireAt: data.expireAt !== "" ? data.expireAt : null,
					},
				);
			}
		},
	});

	const onSubmit = (data: z.infer<typeof editTaskSchema>) => {
		console.log(data);
		editTask.mutate(data);
	};

	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [date, setDate] = useState<Date>();
	const timeInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className={"mx-auto w-full p-4 sm:max-w-md sm:p-0"}>
			<form
				className={"flex w-full"}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FieldGroup>
					<Controller
						control={form.control}
						name={"title"}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									タイトル
								</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<RectangleEllipsisIcon />
									</InputGroupAddon>
									<InputGroupInput
										{...field}
										placeholder={"タイトル"}
										type={"text"}
										aria-invalid={fieldState.invalid}
										id={field.name}
										autoComplete={"off"}
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
						name={"description"}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									説明
								</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<TextAlignStartIcon />
									</InputGroupAddon>
									<InputGroupTextarea
										{...field}
										placeholder={"説明"}
										aria-invalid={fieldState.invalid}
										id={field.name}
										autoComplete={"off"}
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
						name={"expireAt"}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									期限
								</FieldLabel>
								<input {...field} autoComplete={"off"} hidden />
								<ButtonGroup id={field.name}>
									<InputGroup>
										<InputGroupAddon>
											<CalendarIcon />
											<InputGroupText>
												日付
											</InputGroupText>
										</InputGroupAddon>
										<Popover
											open={datePickerOpen}
											onOpenChange={setDatePickerOpen}
										>
											<PopoverTrigger asChild>
												<InputGroupButton
													variant={"ghost"}
													className={"m-auto"}
												>
													{form.getValues("expireAt")
														? new Date(
																form.getValues(
																	"expireAt",
																) ?? "",
															).toLocaleDateString(
																"ja-JP",
																{
																	year: "numeric",
																	month: "short",
																	day: "numeric",
																},
															)
														: "日付を選択…"}
													<ChevronDownIcon />
												</InputGroupButton>
											</PopoverTrigger>
											<PopoverContent
												className={
													"w-auto overflow-hidden p-0"
												}
												align={"center"}
											>
												<Calendar
													fixedWeeks
													locale={ja}
													mode={"single"}
													captionLayout={"dropdown"}
													startMonth={new Date()}
													endMonth={
														new Date(
															new Date().setFullYear(
																new Date().getFullYear() +
																	100,
															),
														)
													}
													onSelect={(date) => {
														form.setValue(
															"expireAt",
															combineDateAndTime(
																date,
																timeInputRef
																	.current
																	?.value,
															)?.toISOString(),
														);
														setDate(date);
														setDatePickerOpen(
															false,
														);
													}}
												/>
											</PopoverContent>
										</Popover>
									</InputGroup>
									<InputGroup>
										<InputGroupAddon>
											<ClockIcon />
											<InputGroupText>
												時間
											</InputGroupText>
										</InputGroupAddon>
										<InputGroupInput
											type={"time"}
											step={60}
											className={
												"[&::-webkit-calendar-picker-indicator]:hidden"
											}
											onChange={(e) => {
												const result =
													combineDateAndTime(
														date,
														e.target.value,
													);
												form.setValue(
													"expireAt",
													result?.toISOString(),
												);
												field.onChange(
													result?.toISOString(),
												);
												setDate(result);
												return result;
											}}
											ref={timeInputRef}
										/>
									</InputGroup>
								</ButtonGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						control={form.control}
						name={"status"}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>
									進行状況
								</FieldLabel>
								<Select
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<SelectTrigger
										id={field.name}
										aria-invalid={fieldState.invalid}
									>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={TaskStatus.Todo}>
											未完了
										</SelectItem>
										<SelectItem
											value={TaskStatus.InProgress}
										>
											進行中
										</SelectItem>
										<SelectItem
											value={TaskStatus.Completed}
										>
											完了
										</SelectItem>
									</SelectContent>
								</Select>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Field orientation={"horizontal"} className={"justify-end"}>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant={"outline"}>リセット</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										入力内容をリセットしますか？
									</AlertDialogTitle>
									<AlertDialogDescription>
										この操作は取り消すことができません。
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										キャンセル
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => form.reset()}
										type={"reset"}
									>
										リセット
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<Button type={"submit"}>作成</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}
