import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {type Repository} from "typeorm";
import {Session} from "./session.entity";
import {SessionAlreadyAuthenticated} from "./exceptions/SessionAlreadyAuthenticated";
import {SessionNotFound} from "./exceptions/SessionNotFound";
import {type User} from "../user/user.entity";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  createAnonymousSession(ipAddress: string): Promise<Session> {
    return this.sessionRepo.save({ipAddress});
  }

  async findOneById(sessionId: string): Promise<Session> {
    try {
      return await this.sessionRepo.findOneOrFail({where: {id: sessionId}});
    } catch {
      throw new SessionNotFound(sessionId);
    }
  }

  setSessionUser(session: Session, user: User): Promise<unknown> {
    if (session.userId) {
      throw new SessionAlreadyAuthenticated();
    }
    return this.sessionRepo.update({id: session.id}, {userId: user.id});
  }
}
