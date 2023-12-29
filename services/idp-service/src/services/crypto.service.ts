import * as crypto from "node:crypto";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import {constants} from "~/common/constants";

@Injectable()
export class CryptoService {
  private static readonly hashAlgorithm: string = "sha512";
  private static readonly encryptionAlgorithm: string = "aes-256-cbc";

  constructor(private config: ConfigService) {}

  private get secretKey(): string {
    return this.config.get<string>(constants.env.CryptoSecretKey);
  }

  hash(value: string): string {
    const hash = crypto.createHash(CryptoService.hashAlgorithm);
    return hash.update(Buffer.from(value)).digest("hex");
  }

  hashPassword(password: string): string {
    return crypto
      .pbkdf2Sync(
        password,
        this.secretKey,
        1000,
        64,
        CryptoService.hashAlgorithm,
      )
      .toString("hex");
  }

  encrypt(value: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      CryptoService.encryptionAlgorithm,
      Buffer.from(this.secretKey),
      iv,
    );
    let encryptedText = cipher.update(value, "utf8", "hex");
    encryptedText += cipher.final("hex");
    return iv.toString("hex") + encryptedText;
  }

  decrypt(encrypted: string): string {
    const iv = Buffer.from(encrypted.slice(0, 32), "hex");
    const encryptedText = encrypted.slice(32);
    const decipher = crypto.createDecipheriv(
      CryptoService.encryptionAlgorithm,
      Buffer.from(this.secretKey),
      iv,
    );
    let decryptedText = decipher.update(encryptedText, "hex", "utf8");
    decryptedText += decipher.final("utf8");
    return decryptedText;
  }

  generateSecret(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}
