"use client";

import type { JSX } from "react";

import { redirect } from "next/navigation";

import { EditTask } from "@/components/common/EditTask";
import { useAccount } from "@/hooks/useAccount";

export default function Page(): JSX.Element {
	const { data } = useAccount();
	if (!data?.user) redirect("/");
	return (
		<>
			<EditTask />
		</>
	);
}
