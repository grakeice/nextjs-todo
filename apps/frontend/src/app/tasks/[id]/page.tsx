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
		);
	} else if (!isLoading) {
		router.back();
	}
	return <></>;
}
