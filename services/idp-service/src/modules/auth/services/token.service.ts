import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Repository} from "typeorm";
import {Session} from "~/modules/session/session.entity";
import {TJwtPayload} from "../types/TJwtPayload";
import {Token} from "../entities/token.entity";
import {type User} from "~/modules/user/user.entity";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private readonly repo: Repository<Token>,
    private readonly jwt: JwtService,
  ) {}

  async generateJWT(user: User, session: Session): Promise<string> {
    const payload = this.toJWTPayload(user, session);
    const token = await this.jwt.signAsync(payload);
    await this.repo.save({token, userId: user.id});
    return token;
  }

  async decryptJWT(token: string): Promise<TJwtPayload> {
    const payload = await this.jwt.verifyAsync<TJwtPayload>(token);
    payload.sub = +payload.sub;
    return payload;
  }

  deleteOneByJWT(token: string): Promise<unknown> {
    return this.repo.delete(token);
  }

  toJWTPayload(user: User, session: Session): TJwtPayload {
    return {sub: user.id, jti: session.id};
  }

  async isTokenFromSession(token: string, session: Session): Promise<boolean> {
    const payload = await this.decryptJWT(token);
    return payload.jti === session.id && payload.sub === session.userId;
  }
}
