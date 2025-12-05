import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "@/users/users.module";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [
		UsersModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			// Note: JWT_SECRET validation happens in JwtStrategy constructor
			// This will throw an error if JWT_SECRET is not defined
			secret: process.env.JWT_SECRET ?? "",
			signOptions: { expiresIn: "1h" },
		}),
	],
	providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
