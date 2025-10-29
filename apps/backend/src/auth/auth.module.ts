import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "@/users/users.module";

import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.stragegy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [
		UsersModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "1h" },
		}),
	],
	providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
