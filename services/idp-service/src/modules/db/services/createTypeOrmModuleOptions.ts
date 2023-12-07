import {ConfigService} from "@nestjs/config";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "~/modules/user-management/entities";

export function createTypeOrmModuleOptions(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: config.get<"sqlite">("DATA_SOURCE"),
    database: config.get<string>("DB_NAME"),
    entities: [User],
  };
}
