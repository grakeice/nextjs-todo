"use client";

import { use, type JSX } from "react";

import { User2Icon } from "lucide-react";
import Link from "next/link";

import { AccountContext } from "@/context/AccountContext";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../ui/navigation-menu";

export function Header(): JSX.Element {
	const user = use(AccountContext);
	return (
		<header
			className={
				"sticky top-0 z-10 mx-auto flex h-16 w-screen items-center border-2 px-2 py-2"
			}
		>
			<div className={"container mx-auto"}>
				<NavigationMenu>
					<div className={"flex flex-row items-center"}>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									className={"text-xl font-bold"}
									asChild
								>
									<Link href={"/"}>Todo App</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									onClick={async () => await user?.signOut()}
								>
									サインアウト
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</div>
					<div className={"flex flex-row items-center"}>
						<NavigationMenuList>
							<NavigationMenuItem>
								{user?.signedIn ? (
									<NavigationMenuTrigger
										className={"cursor-pointer"}
									>
										<Avatar>
											<AvatarFallback>
												<User2Icon />
											</AvatarFallback>
										</Avatar>
									</NavigationMenuTrigger>
								) : (
									<NavigationMenuLink asChild>
										<Link href={"signup"}>
											サインアップ
										</Link>
									</NavigationMenuLink>
								)}
							</NavigationMenuItem>
						</NavigationMenuList>
					</div>
				</NavigationMenu>
			</div>
		</header>
	);
}
