import {ConfigModule, ConfigService} from "@nestjs/config";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {createTypeOrmModuleOptions} from "./services/createTypeOrmModuleOptions";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createTypeOrmModuleOptions,
    }),
  ],
})
export class DbModule {}
