import {UnauthorizedException} from "@nestjs/common";

export class TokenSessionMismatch extends UnauthorizedException {
  constructor() {
    super("Token and session mismatch");
  }
}
