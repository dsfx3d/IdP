import {UnauthorizedException} from "@nestjs/common";

export class MissingHeader extends UnauthorizedException {
  constructor(headerName: string) {
    super(`Missing header: ${headerName}`);
  }
}
