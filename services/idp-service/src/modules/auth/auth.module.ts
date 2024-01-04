import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {Module} from "@nestjs/common";
import {SessionModule} from "../session/session.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [SessionModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
