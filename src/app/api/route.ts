import { type NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest): NextResponse {
	return NextResponse.json({ response: "Test response." });
}
