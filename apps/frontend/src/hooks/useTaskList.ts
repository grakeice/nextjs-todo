"use client";

import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export function useTaskList() {
	const query = useQuery({
		queryKey: ["task_list"],
		queryFn: () =>
			execute(
				graphql(`
					query getTaskList {
						tasks {
							id
							title
							description
							status
							expireAt
						}
					}
				`),
			),
	});

	return query;
}
