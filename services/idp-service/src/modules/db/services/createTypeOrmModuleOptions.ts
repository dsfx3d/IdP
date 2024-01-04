import {ConfigService} from "@nestjs/config";
import {Session} from "~/modules/session/session.entity";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "~/modules/user/user.entity";
import {constants} from "~/common/constants";

export function createTypeOrmModuleOptions(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: config.get<"sqlite">(constants.env.DataSource),
    database: config.get<string>(constants.env.DbName),
    entities: [Session, User],
    synchronize: true,
  };
}
