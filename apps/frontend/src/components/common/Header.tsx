"use client";

import { type JSX } from "react";

import Link from "next/link";

import { useAtomValue } from "jotai";
import { User2Icon } from "lucide-react";

import { userData } from "@/atoms/userData";
import { useAccount } from "@/hooks/useAccount";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../ui/navigation-menu";
import { SidebarTrigger } from "../ui/sidebar";

export function Header(): JSX.Element {
	const { signOut } = useAccount();
	const { signedIn } = useAtomValue(userData);
	return (
		<header
			className={
				"sticky top-0 z-10 mx-auto flex h-16 w-full items-center border-2 px-2 py-2"
			}
		>
			<div className={"container mx-auto"}>
				<NavigationMenu>
					<div className={"flex flex-row items-center"}>
						<NavigationMenuList>
							<NavigationMenuItem>
								<SidebarTrigger />
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									className={"text-xl font-bold"}
									asChild
								>
									<Link href={"/"}>Todo App</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</div>
					<div className={"flex flex-row items-center"}>
						<NavigationMenuList>
							{signedIn ? (
								<>
									<NavigationMenuItem>
										<NavigationMenuLink
											className={"cursor-pointer"}
											onClick={async () =>
												await signOut()
											}
										>
											サインアウト
										</NavigationMenuLink>
									</NavigationMenuItem>
									<NavigationMenuItem>
										{/* <NavigationMenuTrigger
											className={"cursor-pointer"}
										> */}

										<Avatar>
											<AvatarFallback>
												<User2Icon />
											</AvatarFallback>
										</Avatar>
										{/* </NavigationMenuTrigger> */}
										{/* <NavigationMenuContent> */}
									</NavigationMenuItem>
									{/* </NavigationMenuContent> */}
								</>
							) : (
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href={"signup"}>
											サインアップ
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							)}
						</NavigationMenuList>
					</div>
				</NavigationMenu>
			</div>
		</header>
	);
}
