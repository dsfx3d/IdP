import {AppModule} from "./app.module";
import {NestFactory} from "@nestjs/core";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
