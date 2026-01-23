"use client";

import { useEffect } from "react";

import { Loading } from "@/components/common/Loading";
import { useSidebar } from "@/components/ui/sidebar";
import type { GetUserDataQuery } from "@/graphql/graphql";
import { useAccount } from "@/hooks/useAccount";

import SignIn from "./signin/page";
import Tasks from "./tasks/page";

function Page({ data }: { data: GetUserDataQuery | undefined }) {
	if (data?.user) return <Tasks />;
	return <SignIn />;
}

export default function Home() {
	const { data, isLoading } = useAccount();
	const { setOpen: setSidebarOpen } = useSidebar();
	useEffect(() => {
		setSidebarOpen(!!data?.user);
	}, [data, setSidebarOpen]);
	if (isLoading) return <Loading />;
	return <Page data={data} />;
}
