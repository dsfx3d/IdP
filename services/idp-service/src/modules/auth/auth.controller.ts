import {AuthService} from "./auth.service";
import {Body, Controller, Get, Post, UseInterceptors} from "@nestjs/common";
import {CredentialsDto} from "./dto/credentials.dto";
import {Session} from "~/modules/session/session.entity";
import {SessionInterceptor} from "~/modules/session/session.interceptor";
import {TokenPair} from "../token/types/TokenPair.type";

@Controller("auth")
@UseInterceptors(SessionInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(
    @Body() credentials: CredentialsDto,
    @SessionInterceptor.Session() session: Session,
  ): Promise<TokenPair> {
    return this.authService.signIn(credentials, session);
  }

  @Get("logout")
  async logout(@SessionInterceptor.Session() session: Session): Promise<void> {
    await this.authService.signOut(session);
  }
}
