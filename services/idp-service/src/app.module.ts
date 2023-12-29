import {AuthModule} from "./modules/auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {DbModule} from "./modules/db/db.module";
import {Module} from "@nestjs/common";
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
    AuthModule,
  ],
})
export class AppModule {}
