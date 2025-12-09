"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import {
	CircleCheckBigIcon,
	CircleDashedIcon,
	CircleDotIcon,
	GripVertical,
	PencilIcon,
	Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
					return (
						<Badge variant={"outline"} className={"bg-gray-100"}>
							<CircleDashedIcon />
							未完了
						</Badge>
					);
				case TaskStatus.InProgress:
					return (
						<Badge variant={"outline"} className={"text-green-500"}>
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
					<Button
						type={"button"}
						variant={"ghost"}
						className={
							"invisible cursor-pointer group-hover:visible hover:text-red-500"
						}
					>
						<Trash2Icon />
					</Button>
				</>
			);
		},
	},
];
