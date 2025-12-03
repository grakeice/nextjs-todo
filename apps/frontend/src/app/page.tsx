"use client";

import { Suspense } from "react";

import { useAtomValue } from "jotai";

// import { userData } from "@/atoms/userData";
import { Header } from "@/components/common/Header";
import { useAccount } from "@/hooks/useAccount";

import SignIn from "./signin/page";

function Page() {
	// const { signedIn } = useAtomValue(userData);
	const data = useAccount();
	console.log("hello", data);
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
