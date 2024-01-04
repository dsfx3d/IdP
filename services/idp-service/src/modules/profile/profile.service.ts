import {Injectable} from "@nestjs/common";
import {TokenService} from "../token/token.service";
import {UserService} from "../user/user.service";

@Injectable()
export class ProfileService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async getProfileByJWT(jwt: string): Promise<unknown> {
    const {uid} = await this.tokenService.decodeToken(jwt);
    return this.userService.findOneById(uid);
  }
}
