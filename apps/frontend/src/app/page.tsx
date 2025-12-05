"use client";

import { Activity } from "react";

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import type { GetUserDataQuery } from "@/graphql/graphql";
import { useAccount } from "@/hooks/useAccount";

import SignIn from "./signin/page";

function Page({ data }: { data: GetUserDataQuery | undefined }) {
	return (
		<Activity mode={data?.user ? "hidden" : "visible"}>
			<SignIn />
		</Activity>
	);
}

export default function Home() {
	const { data, isLoading } = useAccount();
	return (
		<>
			{isLoading ? (
				<Empty className={"w-full"}>
					<EmptyHeader>
						<EmptyMedia variant={"icon"}>
							<Spinner />
						</EmptyMedia>
						<EmptyTitle>情報を取得中</EmptyTitle>
						<EmptyDescription>
							しばらくお待ちください
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			) : (
				<Page data={data} />
			)}
		</>
	);
}
