"use client";

import { type JSX } from "react";

import { useRouter } from "next/navigation";

import { EditTask } from "@/components/common/EditTask";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function Page(): JSX.Element {
	const router = useRouter();

	return (
		<Dialog
			open
			onOpenChange={(isOpen) => {
				if (!isOpen) router.back();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>新規タスク</DialogTitle>
					<DialogDescription>
						新しいタスクを作成する
					</DialogDescription>
				</DialogHeader>
				<EditTask mode={"create"} />
			</DialogContent>
		</Dialog>
	);
}
