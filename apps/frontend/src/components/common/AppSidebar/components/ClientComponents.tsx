"use client";

import type { ComponentProps, JSX } from "react";

import { useMutation } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";

// import { userData } from "@/atoms/userData";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useAccount } from "@/hooks/useAccount";

// import { useAccount } from "@/hooks/useAccount_legacy";

export function SignOutButton(): JSX.Element {
	const signOut = useMutation({
		mutationKey: ["user"],
		mutationFn: () =>
			execute(
				graphql(`
					mutation SignOut {
						signOut
					}
				`),
			),
	});
	return (
		<DropdownMenuItem onClick={() => signOut.mutate()}>
			<LogOutIcon />
			<span>サインアウト</span>
		</DropdownMenuItem>
	);
}

export function UserName(props: ComponentProps<"span">): JSX.Element {
	const data = useAccount();
	return <span {...props}>{data?.user?.name}</span>;
}

export function UserEmail(props: ComponentProps<"span">): JSX.Element {
	const data = useAccount();
	return <span {...props}>{data?.user?.email}</span>;
}
