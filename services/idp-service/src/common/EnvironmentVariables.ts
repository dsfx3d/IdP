import {IsString} from "class-validator";

export class EnvironmentVariables {
  @IsString()
  DATA_SOURCE: "sqlite";

  @IsString()
  DB_NAME: string;
}
