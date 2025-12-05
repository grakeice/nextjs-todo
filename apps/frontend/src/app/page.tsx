"use client";

import { Suspense } from "react";

// import { userData } from "@/atoms/userData";
import { Header } from "@/components/common/Header";
import { useAccount } from "@/hooks/useAccount";

import SignIn from "./signin/page";

function Page() {
	const data = useAccount();

	return (
		<>
			{!data?.user?.id && (
				<>
					<Header />
					<SignIn />
				</>
			)}
		</>
	);
}

export default function Home() {
	return (
		<>
			<Suspense fallback={"loading…"}>
				<Page />
			</Suspense>
		</>
	);
}
