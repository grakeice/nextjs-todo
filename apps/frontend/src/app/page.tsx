"use client";

import { use } from "react";

import { AccountContext } from "@/context/AccountContext";

import SignIn from "./signin/page";

export default function Home() {
	const user = use(AccountContext);
	return <>{!user?.signedIn && <SignIn />}</>;
}
