"use client";

import { Suspense } from "react";

import { useAtomValue } from "jotai";

import { userData } from "@/atoms/userData";

import SignIn from "./signin/page";

export default function Home() {
	const Page = () => {
		const { signedIn } = useAtomValue(userData);
		return <>{!signedIn && <SignIn />}</>;
	};
	return (
		<>
			<Suspense fallback={"loading…"}>
				<Page />
			</Suspense>
		</>
	);
}
