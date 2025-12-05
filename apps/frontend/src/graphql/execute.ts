import { GraphQLClient } from "graphql-request";

import type { TypedDocumentString } from "./graphql";

export async function execute<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const client = new GraphQLClient("http://127.0.0.1:4000/graphql", {
		credentials: "include",
	});
	return client.request(query, { ...variables });
}
