import "dotenv/config";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
		"http://localhost:3000",
	];
	app.enableCors({
		origin: allowedOrigins,
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.enableShutdownHooks();

	await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
