import {ApplicationsModule} from "./modules/applications/applications.module";
import {ConfigModule} from "@nestjs/config";
import {DbModule} from "./modules/db/db.module";
import {Module} from "@nestjs/common";
import {UserModule} from "./modules/user/user.module";
import {env} from "./common/env";
import {validateEnv} from "./common/validateEnv";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      validate: validateEnv,
      isGlobal: true,
      cache: true,
    }),
    DbModule,
    UserModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
