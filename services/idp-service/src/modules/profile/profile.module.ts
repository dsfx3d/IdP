import {AuthModule} from "../auth/auth.module";
import {Module} from "@nestjs/common";
import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {SessionModule} from "../session/session.module";
import {TokenModule} from "../token/token.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [AuthModule, SessionModule, TokenModule, UserModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
