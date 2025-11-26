"use client";

import type { ComponentProps, JSX } from "react";

import { useAtomValue } from "jotai";

import { userData } from "@/atoms/userData";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAccount } from "@/hooks/useAccount";

export function SignOutButton(): JSX.Element {
	const { signOut } = useAccount();
	return (
		<DropdownMenuItem
			className={"cursor-pointer"}
			onClick={async () => await signOut()}
		>
			<span>サインアウト</span>
		</DropdownMenuItem>
	);
}

export function UserName(props: ComponentProps<"span">): JSX.Element {
	const { name } = useAtomValue(userData);
	return <span {...props}>{name}</span>;
}

export function UserEmail(props: ComponentProps<"span">): JSX.Element {
	const { email } = useAtomValue(userData);
	return <span {...props}>{email}</span>;
}
