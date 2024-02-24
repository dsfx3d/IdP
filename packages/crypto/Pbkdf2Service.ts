import {IHashService} from "./IHashService";
import {THashMatchRequest} from "./THashMatchRequest";
import {pbkdf2Sync, randomBytes} from "node:crypto";

export class Pbkdf2Service implements IHashService {
  hash(password: string): string {
    const salt = randomBytes(16);
    return this.toPbkdf2(password, salt);
  }

  match({plain: password, hash: passwordHash}: THashMatchRequest): boolean {
    const [salt] = passwordHash.split(".");
    const hashedPassword = this.toPbkdf2(password, Buffer.from(salt, "hex"));
    return hashedPassword === passwordHash;
  }

  private toPbkdf2(password: string, salt: Buffer): string {
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, "sha512");
    return `${salt.toString("hex")}.${hashedPassword.toString("hex")}`;
  }
}
