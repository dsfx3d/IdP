import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {ConfigService} from "@nestjs/config";
import {CryptoService} from "~/services/crypto.service";
import {JwtModule} from "@nestjs/jwt";
import {Module} from "@nestjs/common";
import {SessionModule} from "../session/session.module";
import {Token} from "./entities/token.entity";
import {TokenService} from "./services/token.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";
import {constants} from "~/common/constants";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(constants.env.JwtSecret),
      }),
    }),
    TypeOrmModule.forFeature([Token]),
    SessionModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, TokenService],
})
export class AuthModule {}
