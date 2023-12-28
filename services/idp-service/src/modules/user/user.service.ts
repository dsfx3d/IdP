import {CreateUserDto} from "./dto/create-user.dto";
import {CryptoService} from "~/services/crypto.service";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    private crypto: CryptoService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  create(userDto: CreateUserDto): Promise<User> {
    const {password, ...user} = userDto;
    const passwordHash = this.crypto.hashPassword(password);
    return this.userRepo.save({...user, passwordHash});
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepo.findOne({where: {id}});
  }

  updateById(id: number, userDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepo.update({id}, userDto);
  }

  removeById(id: number): Promise<DeleteResult> {
    return this.userRepo.delete({id});
  }
}
