import * as crypto from "node:crypto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class CryptoService {
  private static readonly hashAlgorithm: string = "sha512";
  private static readonly secretKey: string = process.env.SECRET_KEY;

  hash(value: string): string {
    const hash = crypto.createHash(CryptoService.hashAlgorithm);
    return hash.update(Buffer.from(value)).digest("hex");
  }

  hashPassword({salt, password}: {password: string; salt: string}): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, CryptoService.hashAlgorithm)
      .toString("hex");
  }
}
