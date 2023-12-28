import {Application} from "./entities/application.entity";
import {CreateApplicationDto} from "./dto/create-application.dto";
import {CryptoService} from "~/services/crypto.service";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application) private appRepo: Repository<Application>,
    private crypto: CryptoService,
  ) {}

  create(
    createApplicationDto: CreateApplicationDto & {secret: string},
  ): Promise<Application> {
    const {userId: ownerId, secret, ...app} = createApplicationDto;
    return this.appRepo.save({
      ...app,
      ownerId,
      secret: this.crypto.encrypt(secret),
    });
  }

  findAll(): Promise<Application[]> {
    return this.appRepo.find();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.appRepo.delete(id);
  }
}
