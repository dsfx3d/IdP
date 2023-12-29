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
    @InjectRepository(Session) public readonly repo: Repository<Session>,
  ) {}

  createAnonymousSession(ipAddress: string): Promise<Session> {
    return this.repo.save({ipAddress});
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

  setSessionUser(session: Session, user: User): Promise<unknown> {
    if (session.userId) {
      throw new SessionAlreadyAuthenticated();
    }
    return this.repo.update({id: session.id}, {userId: user.id});
  }
}
