import {Application} from "./entities/application.entity";
import {ApplicationsController} from "./applications.controller";
import {ApplicationsService} from "./applications.service";
import {CryptoService} from "~/services/crypto.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, CryptoService],
})
export class ApplicationsModule {}
