import {CryptoService} from "~/services/crypto.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {RegisterUserDto} from "../dto/register-user.dto";
import {Repository} from "typeorm";
import {User} from "../entities";

@Injectable()
export class UserService {
  constructor(
    private crypto: CryptoService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  createUser(userDto: RegisterUserDto): Promise<User> {
    const {password, ...user} = userDto;
    const passwordHash = this.crypto.hashPassword({
      password,
      salt: this.crypto.hash(user.email),
    });
    return this.userRepo.save({...user, passwordHash});
  }
}
