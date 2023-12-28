import {Application} from "./entities/application.entity";
import {ApplicationsService} from "./applications.service";
import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {CryptoService} from "~/services/crypto.service";

@Controller("applications")
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly crypto: CryptoService,
  ) {}

  @Post()
  async create(@Body() appDto: CreateApplicationDto): Promise<Application> {
    const secret = this.crypto.generateClientSecret();
    const app = await this.applicationsService.create({...appDto, secret});
    return {
      ...app,
      secret,
    };
  }

  @Get()
  findAll(): Promise<Application[]> {
    return this.applicationsService.findAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.applicationsService.remove(id);
  }
}
