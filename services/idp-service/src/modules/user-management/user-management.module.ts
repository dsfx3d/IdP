import {CryptoService} from "~/services/crypto.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CryptoService, UserService],
})
export class UserManagementModule {}
