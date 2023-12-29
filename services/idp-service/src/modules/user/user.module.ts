import {CryptoService} from "~/services/crypto.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, CryptoService],
  exports: [UserService],
})
export class UserModule {}
