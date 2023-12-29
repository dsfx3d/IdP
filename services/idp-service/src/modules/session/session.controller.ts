import {Controller, Ip, Post} from "@nestjs/common";
import {Session} from "./session.entity";
import {SessionService} from "./session.service";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  createAnonymousSession(@Ip() ip: string): Promise<Session> {
    return this.sessionService.createAnonymousSession(ip);
  }
}
