import {ETokenType} from "./types/ETokenType.enum";
import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Session} from "~/modules/session/session.entity";
import {TokenPair} from "./types/TokenPair.type";
import {TokenPayload} from "./types/TokenPayload.type";
import {User} from "../user/user.entity";

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  async generateTokenPair(session: Session, user: User): Promise<TokenPair> {
    return {
      accessToken: await this.generateToken(ETokenType.Access, session, user),
      refreshToken: await this.generateToken(ETokenType.Refresh, session, user),
    };
  }

  async decodeToken(token: string): Promise<TokenPayload> {
    const payload = await this.jwt.verifyAsync<TokenPayload>(token);
    payload.uid = +payload.uid;
    return payload;
  }

  async isTokenFromSession(session: Session, token: string): Promise<boolean> {
    const payload = await this.decodeToken(token);
    return (
      payload.sid === session.id &&
      payload.uid === session.userId &&
      payload.did === session.deviceId
    );
  }

  private generateToken(
    tokenType: ETokenType,
    session: Session,
    user: User,
  ): Promise<string> {
    const payload: TokenPayload = {
      did: session.deviceId,
      uid: user.id,
      sid: session.id,
      typ: tokenType,
    };
    return this.jwt.signAsync(payload);
  }
}
