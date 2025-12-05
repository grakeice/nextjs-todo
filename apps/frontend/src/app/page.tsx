"use client";

import { Activity } from "react";

// import { userData } from "@/atoms/userData";
import { Header } from "@/components/common/Header";
import type { GetUserDataQuery } from "@/graphql/graphql";
import { useAccount } from "@/hooks/useAccount";

import SignIn from "./signin/page";

function Page({ data }: { data: GetUserDataQuery | undefined }) {
	return (
		<Activity mode={data?.user ? "hidden" : "visible"}>
			<Header />
			<SignIn />
		</Activity>
	);
}

export default function Home() {
	const { data, isLoading } = useAccount();
	return <>{isLoading ? <p>Now Loading...</p> : <Page data={data} />}</>;
}
