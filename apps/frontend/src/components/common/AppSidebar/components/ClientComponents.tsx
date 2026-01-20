"use client";

import type { ComponentProps, JSX, PropsWithChildren } from "react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { LogOutIcon, PlusIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useAccount } from "@/hooks/useAccount";

import { queryClient } from "../../GqlClientProvider";

interface SidebarMenuLinkProps {
	href: string;
}
export function SidebarMenuLink({
	href,
	children,
}: PropsWithChildren<SidebarMenuLinkProps>): JSX.Element {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const paramString = searchParams.toString()
		? `?${searchParams.toString()}`
		: "";
	return (
		<SidebarMenuButton
			className={clsx(
				`${pathname}${paramString}` === href &&
					"bg-primary text-primary-foreground pointer-events-none shadow-md",
			)}
			asChild
		>
			<Link href={href}>{children}</Link>
		</SidebarMenuButton>
	);
}

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
		onSuccess: () => {
			queryClient.refetchQueries();
		},
	});
	return (
		<DropdownMenuItem
			onClick={() => {
				signOut.mutate();
			}}
		>
			<LogOutIcon />
			<span>サインアウト</span>
		</DropdownMenuItem>
	);
}

export function UserName(props: ComponentProps<"span">): JSX.Element {
	const { data } = useAccount();
	return <span {...props}>{data?.user.name}</span>;
}

export function UserEmail(props: ComponentProps<"span">): JSX.Element {
	const { data } = useAccount();
	return <span {...props}>{data?.user?.email}</span>;
}

export function NewTaskButton(
	props: Omit<ComponentProps<typeof Link>, "href">,
) {
	const { data } = useAccount();
	const pathname = usePathname();

	return (
		<Link
			href={data?.user ? "/new" : ""}
			onClick={(e) => {
				if (pathname === "/new") e.preventDefault();
			}}
			{...props}
		>
			<SidebarMenuButton>
				<PlusIcon />
				<span>新規タスク</span>
			</SidebarMenuButton>
		</Link>
	);
}
