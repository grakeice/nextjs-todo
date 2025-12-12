import type { JSX } from "react";

import {
	Empty,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	EmptyDescription,
} from "../ui/empty";
import { Spinner } from "../ui/spinner";

export function Loading(): JSX.Element {
	return (
		<Empty className={"w-full"}>
			<EmptyHeader>
				<EmptyMedia variant={"icon"}>
					<Spinner />
				</EmptyMedia>
				<EmptyTitle>情報を取得中</EmptyTitle>
				<EmptyDescription>しばらくお待ちください</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
