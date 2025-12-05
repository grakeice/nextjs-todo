import { Injectable, type ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

import type { IncomingMessage } from "node:http";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);

		return ctx.getContext<{ req: IncomingMessage }>().req;
	}
}
