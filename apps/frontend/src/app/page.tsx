"use client";

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
import Tasks from "./tasks/page";

function Page({ data }: { data: GetUserDataQuery | undefined }) {
	if (data?.user) {
		return <Tasks />;
	} else {
		return <SignIn />;
	}
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
