import {AppModule} from "./app.module";
import {GlobalExceptionsFilter} from "./filters/global-exceptions.filter";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT}`,
  );
}
