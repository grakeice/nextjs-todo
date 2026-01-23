import type { JSX } from "react";

import Link from "next/link";

import {
	CheckCheckIcon,
	CheckCircleIcon,
	ChevronsUpDownIcon,
	CircleDashedIcon,
	HomeIcon,
	Settings2Icon,
	User2Icon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "../../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../../ui/sidebar";
import {
	NewTaskButton,
	SidebarMenuLink,
	SignOutButton,
	UserEmail,
	UserName,
} from "./components/ClientComponents";

export function AppSidebar(): JSX.Element {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className={"cursor-pointer select-none"}>
						<Link href={"/"}>
							<span className={"ml-2 text-2xl font-black"}>
								Todo App
							</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent
				className={
					"**:data-[slot=sidebar-group-label]:uppercase **:data-[slot=sidebar-menu-button]:cursor-pointer"
				}
			>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuLink href={"/"}>
									<HomeIcon />
									<span>ホーム</span>
								</SidebarMenuLink>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<NewTaskButton />
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Todo</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuLink href={"/tasks"}>
								<CheckCircleIcon />
								<span>全てのタスク</span>
							</SidebarMenuLink>
							<SidebarMenuLink href={"/tasks?todo=true"}>
								<CircleDashedIcon />
								<span>未完了タスク</span>
							</SidebarMenuLink>
							<SidebarMenuLink href={"/tasks?completed=true"}>
								<CheckCheckIcon />
								<span>完了済みタスク</span>
							</SidebarMenuLink>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className={"h-12"}>
									<Avatar className={"rounded-md"}>
										<AvatarFallback>
											<User2Icon />
										</AvatarFallback>
									</Avatar>
									<div className={"flex flex-col"}>
										<UserName className={"font-medium"} />
										<UserEmail
											className={
												"text-gray-600 dark:text-gray-400"
											}
										/>
									</div>
									<ChevronsUpDownIcon className={"ml-auto"} />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side={"right"}
								className={
									"w-(--radix-popper-anchor-width) **:data-[slot=dropdown-menu-item]:cursor-pointer"
								}
							>
								<DropdownMenuItem asChild>
									<Link href={"/account"}>
										<Settings2Icon />
										<span>設定</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<SignOutButton />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
