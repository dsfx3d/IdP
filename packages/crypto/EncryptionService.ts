import {
  CipherKey,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";
import {createCryptoTransformer} from "./createCryptoTransformer";

export class EncryptionService {
  private _encrypt = createCryptoTransformer(createCipheriv, "utf8", "hex");
  private _decrypt = createCryptoTransformer(createDecipheriv, "hex", "utf8");

  constructor(private readonly key: CipherKey) {}

  encrypt(text: string): string {
    const iv = randomBytes(16);
    const cipherText = this._encrypt(text, this.key, iv);
    return [iv.toString("hex"), cipherText].join(".");
  }

  decrypt(cipher: string): string {
    const [cipherIv, cipherText] = cipher.split(".");
    const iv = Buffer.from(cipherIv, "hex");
    return this._decrypt(cipherText, this.key, iv);
  }
}
