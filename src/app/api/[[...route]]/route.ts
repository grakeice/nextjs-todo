import { Hono } from "hono";
import { handle } from "hono/vercel";

import apiRoot from "./_server/server";

const app = new Hono().basePath("/api").route("/", apiRoot);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
