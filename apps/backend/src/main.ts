import "dotenv/config";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ["http://localhost:3000"],
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.enableShutdownHooks();

	await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
