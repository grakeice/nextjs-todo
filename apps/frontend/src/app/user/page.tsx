"use client";

import { useLayoutEffect, useRef, useState, type JSX } from "react";

import { redirect } from "next/navigation";

import { Edit3Icon, User2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAccount } from "@/hooks/useAccount";

export default function Page(): JSX.Element {
	const { data, isLoading } = useAccount();
	if (!data && !isLoading) redirect("/");

	const [isComposing, setIsComposing] = useState(false);
	const [userNameEditable, setUserNameEditable] = useState(false);
	const userNameRef = useRef<HTMLSpanElement>(null);

	/**
	 * userNameが編集可能になったら要素にフォーカスし、カーソルを文字列の最後に合わせる
	 */
	useLayoutEffect(() => {
		if (!userNameEditable || isComposing) return;
		userNameRef.current?.focus();
		const selection = window.getSelection();
		const range = document.createRange();
		const offset = userNameRef.current?.textContent
			? [...userNameRef.current?.textContent].length
			: 0;
		if (userNameRef.current?.firstChild) {
			range.setStart(userNameRef.current.firstChild, offset);
			range.setEnd(userNameRef.current.firstChild, offset);
		}
		selection?.removeAllRanges();
		selection?.addRange(range);
	}, [userNameEditable, isComposing]);

	return (
		<div className={"mx-auto w-full sm:max-w-md"}>
			<div className={"flex items-center gap-4"}>
				<div
					className={
						"bg-accent flex h-15 w-15 items-center justify-center rounded-full"
					}
				>
					<User2Icon size={32} />
				</div>
				<div className={"flex flex-row items-center"}>
					<span
						className={"text-3xl font-bold"}
						contentEditable={userNameEditable}
						onCompositionStart={() => setIsComposing(true)}
						onCompositionEnd={() => setIsComposing(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !isComposing) {
								e.preventDefault();
								setUserNameEditable(false);
							}
						}}
						onBlur={() => {
							setUserNameEditable(false);
						}}
						ref={userNameRef}
						suppressContentEditableWarning
					>
						{data?.user.name}
					</span>
					<Button
						variant={"link"}
						className={"group translate-y-0.5 cursor-pointer"}
						onClick={() => {
							setUserNameEditable(true);
						}}
					>
						<span className={"group-hover:border-b-2"}>
							<Edit3Icon className={"text-gray-500"} />
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
