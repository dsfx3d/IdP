import {ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {constants} from "~/common/constants";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(constants.env.JwtSecret),
      }),
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
