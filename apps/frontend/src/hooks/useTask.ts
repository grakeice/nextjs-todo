"use client";

import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export function useTask(id: string) {
	const query = useQuery({
		queryKey: ["task", id],
		queryFn: () =>
			execute(
				graphql(`
					query getTask($id: String!) {
						task(id: $id) {
							id
							title
							description
							status
							expireAt
						}
					}
				`),
				{ id },
			),
	});

	return query;
}
