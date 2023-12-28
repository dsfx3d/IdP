import {IsString} from "class-validator";

export class EnvironmentVariables {
  @IsString()
  DATA_SOURCE: "sqlite";

  @IsString()
  DB_NAME: string;

  @IsString()
  CRYPTO_SECRET_KEY: string;
}
