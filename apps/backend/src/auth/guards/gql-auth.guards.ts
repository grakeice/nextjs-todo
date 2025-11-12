import type { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

import type { LoginUserInput } from "../dto/login-user.input";

interface GqlAuthContext {
	data: LoginUserInput;
}
export class GqlAuthGuard extends AuthGuard("local") {
	constructor() {
		super();
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		const request = ctx.getContext<{ body: LoginUserInput }>();
		request.body = ctx.getArgs<GqlAuthContext>().data;
		return request;
	}
}
