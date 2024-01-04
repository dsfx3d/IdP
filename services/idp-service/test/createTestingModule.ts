import {AppModule} from "~/app.module";
import {ConfigModule} from "@nestjs/config";
import {Test, TestingModule} from "@nestjs/testing";
import {env} from "~/common/env";
import {validateEnv} from "~/common/validateEnv";

export function createTestingModule(): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideModule(ConfigModule)
    .useModule(
      ConfigModule.forRoot({
        load: [env],
        envFilePath: ".env.test",
        ignoreEnvFile: true,
        validate: validateEnv,
        isGlobal: true,
      }),
    )
    .compile();
}
