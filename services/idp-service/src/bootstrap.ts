import {AppModule} from "./app.module";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(3000);
  console.log("Application is running on: http://localhost:3000");
}
