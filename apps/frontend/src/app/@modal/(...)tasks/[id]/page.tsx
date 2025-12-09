"use client";

import { use, type JSX } from "react";

import { useRouter } from "next/navigation";

import { EditTask } from "@/components/common/EditTask";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useTask } from "@/hooks/useTask";

interface Props {
	params: Promise<{ id: string }>;
}

export default function Page({ params }: Props): JSX.Element {
	const id =
		use(params).id.match(
			/([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})/,
		)?.[0] ?? "";
	const router = useRouter();
	const { data, isLoading } = useTask(id);

	if (data?.task) {
		const { task } = data;
		return (
			<Dialog
				open
				onOpenChange={(isOpen) => {
					if (!isOpen) router.back();
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>タスクを編集</DialogTitle>
						<DialogDescription>タスクを編集する</DialogDescription>
					</DialogHeader>
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
				</DialogContent>
			</Dialog>
		);
	} else if (!isLoading && !data?.task) {
		router.back();
	}
	return <></>;
}
