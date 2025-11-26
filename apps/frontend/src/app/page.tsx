"use client";

import { Suspense } from "react";

import { useAtomValue } from "jotai";

import { userData } from "@/atoms/userData";

import SignIn from "./signin/page";

function Page() {
	const { signedIn } = useAtomValue(userData);
	return <>{!signedIn && <SignIn />}</>;
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
