import {CryptoService} from "~/services/crypto.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CryptoService, UserService],
})
export class UserModule {}
