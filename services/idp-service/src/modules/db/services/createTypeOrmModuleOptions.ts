import {Application} from "~/modules/applications/entities/application.entity";
import {ConfigService} from "@nestjs/config";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "~/modules/user/entities/user.entity";

export function createTypeOrmModuleOptions(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: config.get<"sqlite">("DATA_SOURCE"),
    database: config.get<string>("DB_NAME"),
    entities: [User, Application],
    synchronize: true,
  };
}
