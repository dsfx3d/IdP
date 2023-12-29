import {UnauthorizedException} from "@nestjs/common";

export class SessionAlreadyAuthenticated extends UnauthorizedException {
  constructor() {
    super(`Session already has an authenticated user`);
  }
}
