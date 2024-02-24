import {pbkdf2Sync, randomBytes} from "node:crypto";

export class HashService {
  hashPassword(password: string): string {
    const salt = randomBytes(16);
    return this.toPbkdf2(password, salt);
  }

  isEqual({
    password,
    passwordHash,
  }: {
    password: string;
    passwordHash: string;
  }): boolean {
    const [salt] = passwordHash.split(".");
    const hashedPassword = this.toPbkdf2(password, Buffer.from(salt, "hex"));
    return hashedPassword === passwordHash;
  }

  private toPbkdf2(password: string, salt: Buffer): string {
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, "sha512");
    return `${salt.toString("hex")}.${hashedPassword.toString("hex")}`;
  }
}
