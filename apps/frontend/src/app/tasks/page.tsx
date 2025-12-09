"use client";

import type { JSX } from "react";

import { redirect } from "next/navigation";

import { columns } from "@/components/common/TaskTable/columns";
import { TaskTable } from "@/components/ui/data-table";
import { useAccount } from "@/hooks/useAccount";
import { useTaskList } from "@/hooks/useTaskList";

export default function Page(): JSX.Element {
	const { data: userData, isLoading: isLoadingUserData } = useAccount();
	if (!userData && !isLoadingUserData) redirect("/");

	const { data: taskListData } = useTaskList();
	return (
		<div className={"container mx-auto px-4"}>
			<TaskTable data={taskListData?.tasks ?? []} columns={columns} />
		</div>
	);
}
