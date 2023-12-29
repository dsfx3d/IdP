import {AuthService} from "./auth.service";
import {Body, Controller, Post, UseInterceptors} from "@nestjs/common";
import {CredentialsDto} from "./dto/credentials.dto";
import {Session} from "~/modules/session/session.entity";
import {SessionInterceptor} from "~/modules/session/session.interceptor";
import {Token} from "./entities/token.entity";

@Controller()
@UseInterceptors(SessionInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body() credentials: CredentialsDto,
    @SessionInterceptor.Session() session: Session,
  ): Promise<Pick<Token, "token">> {
    const token = await this.authService.signIn(credentials, session);
    return {token};
  }
}
