"use client";

import { type JSX, useState } from "react";

import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import {
	AlertTriangleIcon,
	CircleCheckBigIcon,
	CircleDashedIcon,
	CircleDotIcon,
	// GripVerticalIcon,
	PencilIcon,
	Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { TaskStatus } from "@/graphql/graphql";

import { queryClient } from "../GqlClientProvider";

export interface Task {
	id: string;
	title?: string;
	description?: string | null;
	status: TaskStatus;
	expireAt?: string | null;
}

const STATUS_OPTIONS = [
	{
		value: TaskStatus.Todo,
		label: "未完了",
		icon: CircleDashedIcon,
		className: clsx("bg-accent"),
	},
	{
		value: TaskStatus.InProgress,
		label: "進行中",
		icon: CircleDotIcon,
		className: clsx("bg-accent text-green-500"),
	},
	{
		value: TaskStatus.Completed,
		label: "完了",
		icon: CircleCheckBigIcon,
		className: clsx("bg-background"),
	},
] as const;

function StatusCell({ task }: { task: Task }): JSX.Element {
	const [open, setOpen] = useState(false);
	const currentStatus =
		STATUS_OPTIONS.find((option) => option.value === task.status) ??
		STATUS_OPTIONS[0];

	const updateStatus = useMutation<unknown, Error, TaskStatus>({
		mutationFn: (status: TaskStatus) =>
			execute(
				graphql(`
					mutation UpdateTaskStatus(
						$id: String!
						$status: TaskStatus
					) {
						updateTask(id: $id, data: { status: $status }) {
							id
							status
						}
					}
				`),
				{
					id: task.id,
					status,
				},
			),
		onSuccess: () => {
			toast("ステータスを更新しました");
			setOpen(false);
			queryClient.refetchQueries();
		},
		onError: () => {
			toast.error("ステータスの更新に失敗しました");
		},
	});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Badge
					asChild
					variant={"outline"}
					className={clsx(
						currentStatus.className,
						"cursor-pointer focus-visible:outline-none",
					)}
				>
					<button
						type={"button"}
						className={"flex items-center gap-1"}
						onClick={(e) => e.stopPropagation()}
					>
						<currentStatus.icon />
						{currentStatus.label}
					</button>
				</Badge>
			</PopoverTrigger>
			<PopoverContent
				onClick={(e) => e.stopPropagation()}
				className={
					"bg-background/30 flex w-fit flex-col gap-4 rounded-2xl p-3 backdrop-blur-[2px]"
				}
			>
				{STATUS_OPTIONS.map((option) => {
					const isActive = option.value === task.status;
					return (
						<Badge
							asChild
							key={option.value}
							variant={"outline"}
							className={clsx(
								option.className,
								"cursor-pointer focus-visible:outline-none",
							)}
						>
							<button
								type={"button"}
								className={"flex items-center gap-1"}
								disabled={updateStatus.isPending || isActive}
								onClick={() =>
									updateStatus.mutate(option.value)
								}
							>
								<option.icon />
								{option.label}
							</button>
						</Badge>
					);
				})}
			</PopoverContent>
		</Popover>
	);
}

export const columns: ColumnDef<Task>[] = [
	{
		id: "sort-handle",
		cell: () => {
			return (
				<>
					{/* <Button variant={"ghost"} className={"cursor-grab"}>
						<GripVerticalIcon />
					</Button> */}
				</>
			);
		},
	},
	{
		accessorKey: "title",
		header: "タイトル",
	},
	{
		accessorKey: "description",
		header: "説明",
	},
	{
		id: "status",
		sortingFn: (rowA, rowB) => {
			const sortCriteria = Object.fromEntries(
				Object.entries([
					TaskStatus.Todo,
					TaskStatus.InProgress,
					TaskStatus.Completed,
				]).map((v) => [v[1], Number(v[0])]),
			);
			const a = sortCriteria[rowA.original.status];
			const b = sortCriteria[rowB.original.status];

			return a > b ? 1 : a < b ? -1 : 0;
		},
		filterFn: "arrIncludesSome",
		accessorKey: "status",
		header: "ステータス",
		cell: ({ cell }) => <StatusCell task={cell.row.original} />,
	},
	{
		id: "expireAt",
		sortingFn: (rowA, rowB) => {
			const a = new Date(
				rowA.original.expireAt ?? Number.MAX_SAFE_INTEGER,
			);
			const b = new Date(
				rowB.original.expireAt ?? Number.MAX_SAFE_INTEGER,
			);
			return a > b ? 1 : a < b ? -1 : 0;
		},
		accessorKey: "expireAt",
		header: "期限",
		cell: ({ cell }) => {
			const expireAt = cell.row.original.expireAt;
			if (expireAt) {
				return new Date(expireAt).toLocaleString("ja-JP", {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				});
			}
			return "";
		},
	},
	{
		id: "actions",
		cell: ({ cell }) => {
			const id = cell.row.original.id;

			// eslint-disable-next-line react-hooks/rules-of-hooks
			const deleteTask = useMutation({
				mutationFn: () =>
					execute(
						graphql(`
							mutation deleteTask($id: String!) {
								removeTask(id: $id) {
									id
								}
							}
						`),
						{
							id,
						},
					),
				onSuccess: () => {
					toast("タスクを削除しました");
				},
				onSettled: () => {
					queryClient.refetchQueries();
				},
				onError: () => {
					toast.error("タスクの削除に失敗しました");
				},
			});
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [alertOpen, setAlertOpen] = useState(false);
			return (
				<>
					<Button
						type={"button"}
						variant={"ghost"}
						className={"cursor-pointer"}
						asChild
					>
						<Link href={`tasks/${id}`}>
							<PencilIcon />
						</Link>
					</Button>
					<Popover open={alertOpen} onOpenChange={setAlertOpen}>
						<PopoverTrigger asChild>
							<Button
								type={"button"}
								variant={"ghost"}
								className={clsx(
									"hover:text-destructive cursor-pointer group-hover:visible",
									!alertOpen && "invisible",
									alertOpen && "text-destructive",
								)}
								onClick={(e) => e.stopPropagation()}
							>
								<Trash2Icon />
							</Button>
						</PopoverTrigger>
						<PopoverContent onClick={(e) => e.stopPropagation()}>
							<Alert
								className={"border-0 p-0"}
								variant={"destructive"}
							>
								<AlertTitle>
									<span
										className={
											"flex flex-row items-center gap-2"
										}
									>
										<AlertTriangleIcon />
										<span>削除しますか？</span>
									</span>
								</AlertTitle>
								<AlertDescription>
									この操作は取り消せません
									<div className={"*:mx-1"}>
										<Button
											variant={"outline"}
											className={"text-primary"}
											onClick={(e) => {
												e.stopPropagation();
												setAlertOpen(false);
											}}
										>
											キャンセル
										</Button>
										<Button
											variant={"destructive"}
											onClick={(e) => {
												e.stopPropagation();
												deleteTask.mutate();
											}}
										>
											削除
										</Button>
									</div>
								</AlertDescription>
							</Alert>
						</PopoverContent>
					</Popover>
				</>
			);
		},
	},
];
