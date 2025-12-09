"use client";

import type { JSX } from "react";

import { redirect } from "next/navigation";

import { useAccount } from "@/hooks/useAccount";

export default function Page(): JSX.Element {
	const { data: userData, isLoading: isLoadingUserData } = useAccount();
	if (!userData && !isLoadingUserData) redirect("/");

	return <div>tasks</div>;
}
