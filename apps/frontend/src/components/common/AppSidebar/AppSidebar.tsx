import type { JSX } from "react";

import Link from "next/link";

import {
	CheckCheckIcon,
	CheckCircleIcon,
	ChevronsUpDownIcon,
	CircleDashedIcon,
	HomeIcon,
	PlusIcon,
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
	SignOutButton,
	UserEmail,
	UserName,
} from "./components/ClientComponents";

export function AppSidebar(): JSX.Element {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className={"cursor-default select-none"}>
						<span className={"ml-2 text-2xl font-black"}>
							Todo App
						</span>
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
								<SidebarMenuButton asChild>
									<Link href={"/"}>
										<HomeIcon />
										<span>ホーム</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<PlusIcon />
									<span>新規タスク</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Todo</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuButton>
								<CheckCircleIcon />
								<span>全てのタスク</span>
							</SidebarMenuButton>
							<SidebarMenuButton>
								<CircleDashedIcon />
								<span>未完了タスク</span>
							</SidebarMenuButton>
							<SidebarMenuButton>
								<CheckCheckIcon />
								<span>完了済みタスク</span>
							</SidebarMenuButton>
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
											className={"text-gray-500"}
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
									<SignOutButton />
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings2Icon />
									<span>設定</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
