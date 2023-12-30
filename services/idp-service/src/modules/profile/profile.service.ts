import {Injectable} from "@nestjs/common";
import {TokenService} from "../auth/services/token.service";
import {UserService} from "../user/user.service";

@Injectable()
export class ProfileService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async getProfileByJWT(jwt: string): Promise<unknown> {
    const {sub: userId} = await this.tokenService.decryptJWT(jwt);
    return this.userService.findById(userId);
  }
}
