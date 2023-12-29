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
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
    private readonly jwt: JwtService,
  ) {}

  async generateJWT(user: User, session: Session): Promise<string> {
    const payload = this.toJWTPayload(user, session);
    const token = await this.jwt.signAsync(payload);
    await this.tokenRepo.save({token, userId: user.id});
    return token;
  }

  toJWTPayload(user: User, session: Session): TJwtPayload {
    return {sub: user.email, jti: session.id};
  }
}
