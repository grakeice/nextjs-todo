"use client";

import { useState } from "react";

import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import {
	AlertTriangleIcon,
	CircleCheckBigIcon,
	CircleDashedIcon,
	CircleDotIcon,
	GripVerticalIcon,
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

export const columns: ColumnDef<Task>[] = [
	{
		id: "sort-handle",
		cell: () => {
			return (
				<Button variant={"ghost"} className={"cursor-grab"}>
					<GripVerticalIcon />
				</Button>
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
		accessorKey: "status",
		header: "ステータス",
		cell: ({ cell }) => {
			const status = cell.row.original.status;
			switch (status) {
				case TaskStatus.Todo:
					return (
						<Badge variant={"outline"} className={"bg-accent"}>
							<CircleDashedIcon />
							未完了
						</Badge>
					);
				case TaskStatus.InProgress:
					return (
						<Badge
							variant={"outline"}
							className={"bg-accent text-green-500"}
						>
							<CircleDotIcon />
							進行中
						</Badge>
					);
				case TaskStatus.Completed:
					return (
						<Badge variant={"outline"}>
							<CircleCheckBigIcon />
							完了
						</Badge>
					);
			}
		},
	},
	{
		accessorKey: "expireAt",
		header: "期限",
		cell: ({ cell }) => {
			const expireAt = cell.row.original.expireAt;
			if (expireAt) {
				return new Date(expireAt).toLocaleDateString("ja-JP", {
					year: "numeric",
					month: "long",
					day: "numeric",
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
									"invisible cursor-pointer group-hover:visible hover:text-red-500",
									alertOpen && "visible text-red-500",
								)}
							>
								<Trash2Icon />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<Alert
								className={"border-0 p-0"}
								variant={"destructive"}
							>
								<AlertTitle>
									<AlertTriangleIcon />
									<span>削除しますか？</span>
								</AlertTitle>
								<AlertDescription>
									この操作は取り消せません
									<div className={"*:mx-px"}>
										<Button
											variant={"outline"}
											className={"text-primary"}
											onClick={() => setAlertOpen(false)}
										>
											キャンセル
										</Button>
										<Button
											variant={"destructive"}
											onClick={() => deleteTask.mutate()}
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
