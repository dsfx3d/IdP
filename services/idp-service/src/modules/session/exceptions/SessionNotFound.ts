import {UnauthorizedException} from "@nestjs/common";

export class SessionNotFound extends UnauthorizedException {
  constructor(sessionId: string) {
    super(`Session(${sessionId}) does not exist or expired`);
  }
}
