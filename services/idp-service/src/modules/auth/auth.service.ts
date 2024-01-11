import {type CredentialsDto} from "./dto/credentials.dto";
import {EntityNotFoundError} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InvalidCredentials} from "./exceptions/InvalidCredentials";
import {type Session} from "~/modules/session/session.entity";
import {SessionService} from "~/modules/session/session.service";
import {TokenPair} from "../token/types/TokenPair.type";
import {type User} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async signIn(
    credentials: CredentialsDto,
    session: Session,
  ): Promise<TokenPair> {
    const user = await this.validateCredentials(credentials);
    return this.sessionService.authenticateSession(session, user);
  }

  async signOut(session: Session): Promise<void> {
    await this.sessionService.deleteOneById(session.id);
  }

  private async validateCredentials(
    credentials: CredentialsDto,
  ): Promise<User> {
    const user = await this.toUser(credentials);
    const isAuthenticated = this.userService.checkPassword(
      credentials.password,
      user,
    );
    if (user && isAuthenticated) {
      return user;
    }
    throw new InvalidCredentials();
  }

  private async toUser(credentials: CredentialsDto): Promise<User> {
    try {
      return await this.userService.findOneByEmail(credentials.email);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new InvalidCredentials();
      }
      throw error;
    }
  }
}
