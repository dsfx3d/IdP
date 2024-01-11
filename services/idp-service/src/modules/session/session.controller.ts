import {Controller, Headers, Ip, Post} from "@nestjs/common";
import {RequiredHeader} from "~/decorators/required-header.decorator";
import {SessionService} from "./session.service";
import {constants} from "./constants";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async createAnonymousSession(
    @Ip() ipAddress: string,
    @RequiredHeader(constants.Headers.DeviceId) deviceId: string,
    @Headers("user-agent") userAgent: string,
  ): Promise<string> {
    const {id: sid} = await this.sessionService.createAnonymousSession({
      ipAddress,
      deviceId,
      userAgent,
    });
    return sid;
  }
}
