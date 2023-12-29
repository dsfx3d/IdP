import {type CreateUserDto} from "./dto/create-user.dto";
import {CryptoService} from "~/services/crypto.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {type UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    private crypto: CryptoService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  checkPassword(password: string, user?: User): boolean {
    const passwordHash = this.crypto.hashPassword(password);
    return passwordHash === user?.passwordHash;
  }

  create(userDto: CreateUserDto): Promise<User> {
    const {password, ...user} = userDto;
    const passwordHash = this.crypto.hashPassword(password);
    return this.userRepo.save({...user, passwordHash});
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({where: {id}});
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({where: {email}});
  }

  updateById(id: number, userDto: UpdateUserDto): Promise<unknown> {
    return this.userRepo.update({id}, userDto);
  }

  removeById(id: number): Promise<unknown> {
    return this.userRepo.delete({id});
  }
}
