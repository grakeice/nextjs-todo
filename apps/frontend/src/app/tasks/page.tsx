"use client";

import type { JSX } from "react";

import { redirect, useSearchParams } from "next/navigation";

import type { ColumnFiltersState } from "@tanstack/react-table";

import { columns } from "@/components/common/TaskTable/columns";
import { TaskTable } from "@/components/common/TaskTable/data-table";
import { TaskStatus } from "@/graphql/graphql";
import { useAccount } from "@/hooks/useAccount";
import { useTaskList } from "@/hooks/useTaskList";

export default function Page(): JSX.Element {
	const searchParams = useSearchParams();
	const { data: userData, isLoading: isLoadingUserData } = useAccount();
	const completedOnly = searchParams.get("completed");
	const unCompletedOnly = searchParams.get("todo");
	if (!userData && !isLoadingUserData) redirect("/");
	const columnFilters: ColumnFiltersState | undefined = Boolean(completedOnly)
		? [{ id: "status", value: [TaskStatus.Completed] }]
		: Boolean(unCompletedOnly)
			? [
					{
						id: "status",
						value: [TaskStatus.InProgress, TaskStatus.Todo],
					},
				]
			: undefined;
	const { data: taskListData } = useTaskList();
	return (
		<div className={"container mx-auto px-4"}>
			<TaskTable
				key={[
					searchParams.get("todo") && "todo",
					searchParams.get("completed") && "completed",
				].toString()}
				data={taskListData?.tasks ?? []}
				columns={columns}
				initialState={{
					sorting: [
						{ id: "status", desc: false },
						{ id: "expireAt", desc: false },
					],
					columnFilters,
				}}
			/>
		</div>
	);
}
