import { GraphQLClient } from "graphql-request";

import type { TypedDocumentString } from "./graphql";

export async function execute<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const client = new GraphQLClient("/graphql", {
		credentials: "include",
	});

	try {
		return await client.request(query, { ...variables });
	} catch (error: unknown) {
		// unauthorized エラーの場合は静かに null を返す
		if (error instanceof Error && "response" in error) {
			const graphQLError = error as {
				response?: { errors?: Array<{ message?: string }> };
			};
			if (
				graphQLError?.response?.errors?.[0]?.message
					?.toLowerCase()
					.includes("unauthorized")
			) {
				return null as TResult;
			}
		}
		// その他のエラーは再スロー
		throw error;
	}
}
