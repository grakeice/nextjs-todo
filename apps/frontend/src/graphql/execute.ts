import type { TypedDocumentString } from "./graphql";

export async function execute<TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const response = await fetch("http://127.0.0.1:4000/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/graphql-response+json",
		},
		body: JSON.stringify({
			query,
			variables,
		}),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	console.log(response);
	return response.json() as TResult;
}
