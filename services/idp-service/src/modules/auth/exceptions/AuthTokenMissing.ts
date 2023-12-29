import {UnauthorizedException} from "@nestjs/common";

export class AuthTokenMissing extends UnauthorizedException {
  constructor() {
    super("Authorization token is missing");
  }
}
