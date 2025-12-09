"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { GripVertical, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/graphql/graphql";

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
					<GripVertical />
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
					return "未完了";
				case TaskStatus.InProgress:
					return "進行中";
				case TaskStatus.Completed:
					return "完了";
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
					day: "2-digit",
				});
			}
			return "";
		},
	},
	{
		id: "edit-button",
		cell: ({ cell }) => {
			const id = cell.row.original.id;
			return (
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
			);
		},
	},
];
