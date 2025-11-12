"use client";

import type { JSX } from "react";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import type { Task } from "@/generated/graphql";

export default function Page(): JSX.Element {
	const DATA = gql`
		query {
			tasks {
				id
				title
			}
		}
	`;

	const query = useQuery<Task[]>(DATA);
	return (
		<div>
			サインアップ
			<button
				onClick={async () => {
					console.log(query);
				}}
			>
				get data
			</button>
		</div>
	);
}
