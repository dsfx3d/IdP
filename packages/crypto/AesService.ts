import {
  CipherKey,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";
import {TAesAlgo} from "./TAesAlgo";
import {createAesTransformer} from "./createCryptoTransformer";

export class AesService {
  private ivLength: Record<TAesAlgo, number> = {
    "aes-256-cbc": 16,
  };

  private readonly toCipherText;
  private readonly toPlainText;

  constructor(
    readonly key: CipherKey,
    private readonly algo: TAesAlgo = "aes-256-cbc",
  ) {
    this.toCipherText = createAesTransformer(createCipheriv, algo, key, {
      input: "utf8",
      output: "hex",
    });
    this.toPlainText = createAesTransformer(createDecipheriv, algo, key, {
      input: "hex",
      output: "utf8",
    });
  }

  encrypt(text: string): string {
    const iv = randomBytes(this.ivLength[this.algo]);
    const cipherText = this.toCipherText(text, iv);
    return [iv.toString("hex"), cipherText].join(".");
  }

  decrypt(cipher: string): string {
    const [cipherIv, cipherText] = cipher.split(".");
    const iv = Buffer.from(cipherIv, "hex");
    return this.toPlainText(cipherText, iv);
  }
}
