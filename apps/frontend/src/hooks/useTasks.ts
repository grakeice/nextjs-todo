"use client";

import { useQuery } from "@tanstack/react-query";

import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

export function useTasks() {
	const query = useQuery({
		queryKey: ["tasks"],
		queryFn: () =>
			execute(
				graphql(`
					query getTasks {
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
