"use client";

import { use, type JSX } from "react";

import { useRouter } from "next/navigation";

import { EditTask } from "@/components/common/EditTask";
import { useTask } from "@/hooks/useTask";

interface Props {
	params: Promise<{ id: string }>;
}

export default function Page({ params }: Props): JSX.Element {
	const { id } = use(params);
	const { data, isLoading } = useTask(id);
	const router = useRouter();
	if (data?.task) {
		const { task } = data;
		return (
			<div className={"mx-auto w-full sm:max-w-md"}>
				<div className={"mb-4 px-4 sm:px-0"}>
					<h1 className={"text-lg leading-none font-semibold"}>
						タスクを編集
					</h1>
					<p className={"text-muted-foreground text-sm"}>
						タスクを編集する
					</p>
				</div>
				<EditTask
					mode={"edit"}
					id={id}
					data={{
						title: task.title,
						description: task.description ?? "",
						status: task.status,
						expireAt: task.expireAt ?? "",
					}}
				/>
			</div>
		);
	} else if (!isLoading) {
		router.back();
	}
	return <></>;
}
