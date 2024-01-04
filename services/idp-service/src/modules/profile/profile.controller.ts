import {Controller, Get, UseInterceptors} from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {SessionInterceptor} from "../session/session.interceptor";
import {TokenInterceptor} from "../token/token.interceptor";

@Controller("profile")
@UseInterceptors(SessionInterceptor, TokenInterceptor)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@TokenInterceptor.Token() token: string): Promise<unknown> {
    return this.profileService.getProfileByJWT(token);
  }
}
