import { type NextRequest, NextResponse } from "next/server";

const BACKEND_GRAPHQL_URL =
	process.env.BACKEND_GRAPHQL_URL || "http://127.0.0.1:4000/graphql";

export async function POST(request: NextRequest) {
	try {
		const body = await request.text();

		// Forward the request to the backend GraphQL endpoint
		const response = await fetch(BACKEND_GRAPHQL_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Forward cookies from the incoming request
				...(request.headers.get("cookie")
					? { Cookie: request.headers.get("cookie")! }
					: {}),
			},
			body,
		});

		const data = await response.text();

		// Create response with the data from backend
		const nextResponse = new NextResponse(data, {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Forward Set-Cookie headers from backend to client
		const setCookieHeaders = response.headers.getSetCookie();
		for (const cookie of setCookieHeaders) {
			nextResponse.headers.append("Set-Cookie", cookie);
		}

		return nextResponse;
	} catch (error) {
		console.error("GraphQL proxy error:", error);
		return NextResponse.json(
			{ errors: [{ message: "Internal server error" }] },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	// Support GET requests if needed (for GraphQL introspection queries)
	const url = new URL(request.url);
	const query = url.searchParams.get("query");

	if (!query) {
		return NextResponse.json(
			{
				errors: [
					{ message: "Query parameter is required for GET requests" },
				],
			},
			{ status: 400 },
		);
	}

	try {
		const backendUrl = new URL(BACKEND_GRAPHQL_URL);
		backendUrl.searchParams.set("query", query);

		const variables = url.searchParams.get("variables");
		if (variables) {
			backendUrl.searchParams.set("variables", variables);
		}

		const response = await fetch(backendUrl.toString(), {
			method: "GET",
			headers: {
				// Forward cookies from the incoming request
				...(request.headers.get("cookie")
					? { Cookie: request.headers.get("cookie")! }
					: {}),
			},
		});

		const data = await response.text();

		const nextResponse = new NextResponse(data, {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Forward Set-Cookie headers from backend to client
		const setCookieHeaders = response.headers.getSetCookie();
		for (const cookie of setCookieHeaders) {
			nextResponse.headers.append("Set-Cookie", cookie);
		}

		return nextResponse;
	} catch (error) {
		console.error("GraphQL proxy error:", error);
		return NextResponse.json(
			{ errors: [{ message: "Internal server error" }] },
			{ status: 500 },
		);
	}
}
