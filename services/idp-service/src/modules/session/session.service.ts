import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {type Repository} from "typeorm";
import {Session} from "./session.entity";
import {SessionAlreadyAuthenticated} from "./exceptions/SessionAlreadyAuthenticated";
import {SessionNotFound} from "./exceptions/SessionNotFound";
import {TokenPair} from "../token/types/TokenPair.type";
import {TokenService} from "../token/token.service";
import {type User} from "../user/user.entity";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) public readonly repo: Repository<Session>,
    private readonly tokenService: TokenService,
  ) {}

  createAnonymousSession({
    ipAddress,
    deviceId,
    userAgent,
  }: {
    ipAddress: string;
    deviceId: string;
    userAgent: string;
  }): Promise<Session> {
    return this.repo.save({ipAddress, deviceId, userAgent});
  }

  async findOneById(sessionId: string): Promise<Session> {
    try {
      return await this.repo.findOneOrFail({where: {id: sessionId}});
    } catch {
      throw new SessionNotFound(sessionId);
    }
  }

  async deleteOneById(sessionId: string): Promise<void> {
    await this.repo.delete(sessionId);
  }

  async authenticateSession(session: Session, user: User): Promise<TokenPair> {
    if (session.userId) {
      throw new SessionAlreadyAuthenticated();
    }

    const tokenPair = await this.tokenService.generateTokenPair(session, user);
    await this.repo.update(
      {id: session.id},
      {
        userId: user.id,
        refreshToken: tokenPair.refreshToken,
      },
    );
    return tokenPair;
  }
}
