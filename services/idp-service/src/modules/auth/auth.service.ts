import {type CredentialsDto} from "./dto/credentials.dto";
import {Injectable} from "@nestjs/common";
import {InvalidCredentials} from "./exceptions/InvalidCredentials";
import {type Session} from "~/modules/session/session.entity";
import {SessionService} from "~/modules/session/session.service";
import {TokenService} from "./services/token.service";
import {type User} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async signIn(
    credentials: CredentialsDto,
    session: Session,
  ): Promise<string | undefined> {
    const user = await this.validateCredentials(credentials);
    await this.sessionService.setSessionUser(session, user);
    return this.tokenService.generateJWT(user, session);
  }

  async signOut(session: Session, token: string): Promise<void> {
    await this.sessionService.deleteOneById(session.id);
    await this.tokenService.deleteOneByJWT(token);
  }

  private async validateCredentials(
    credentials: CredentialsDto,
  ): Promise<User> {
    const user = await this.userService.findOneByEmail(credentials.email);
    const isAuthenticated = this.userService.checkPassword(
      credentials.password,
      user,
    );
    if (user && isAuthenticated) {
      return user;
    }
    throw new InvalidCredentials();
  }
}
