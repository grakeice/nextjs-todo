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
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
					{ id, ...data },
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
					data,
				);
			}
		},
	});

	const onSubmit = (data: z.infer<typeof editTaskSchema>) => {
		editTask.mutate(data);
	};

	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [date, setDate] = useState<Date>();
	const timeInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className={"mx-auto w-full sm:max-w-md"}>
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
								<FieldLabel>タイトル</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<RectangleEllipsisIcon />
									</InputGroupAddon>
									<InputGroupInput
										{...field}
										placeholder={"タイトル"}
										type={"text"}
										aria-invalid={fieldState.invalid}
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
								<FieldLabel>説明</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<TextAlignStartIcon />
									</InputGroupAddon>
									<InputGroupTextarea
										{...field}
										placeholder={"説明"}
										aria-invalid={fieldState.invalid}
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
								<FieldLabel>期限</FieldLabel>
								<Input {...field} hidden />
								<ButtonGroup>
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
																"ja",
															)
														: "日付を選択…"}
													<ChevronDownIcon />
												</InputGroupButton>
											</PopoverTrigger>
											<PopoverContent
												className={
													"w-auto overflow-hidden p-0"
												}
												align={"start"}
											>
												<Calendar
													mode={"single"}
													captionLayout={"dropdown"}
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
											step={1}
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
							</Field>
						)}
					/>
				</FieldGroup>
			</form>
		</div>
	);
}
