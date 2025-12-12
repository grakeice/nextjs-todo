"use client";

import type { JSX } from "react";

import { redirect } from "next/navigation";

import { EditTask } from "@/components/common/EditTask";
import { useAccount } from "@/hooks/useAccount";

export default function Page(): JSX.Element {
	const { data, isLoading } = useAccount();
	if (!data?.user && !isLoading) {
		redirect("/");
	}
	return (
		<div className={"mx-auto w-full sm:max-w-md"}>
			<div className={"mb-4"}>
				<h1 className={"text-lg leading-none font-semibold"}>
					新規タスク
				</h1>
				<p className={"text-muted-foreground text-sm"}>
					新しいタスクを作成する
				</p>
			</div>
			<EditTask mode={"create"} />
		</div>
	);
}
