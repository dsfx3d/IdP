import {EncryptionService} from "./EncryptionService";
import {randomBytes} from "node:crypto";

describe(EncryptionService.name, () => {
  let crypto: EncryptionService;

  beforeEach(() => {
    const secret = randomBytes(32);
    crypto = new EncryptionService(secret);
  });

  it("encrypts a plain text", () => {
    const plainText = "Hello World!";
    const cipherText = crypto.encrypt(plainText);
    expect(plainText).not.toBe(cipherText);
  });

  it("decrypts a cipher text", () => {
    const plainText = "Hello World!";
    const cipherText = crypto.encrypt(plainText);
    const decryptedText = crypto.decrypt(cipherText);
    expect(plainText).toBe(decryptedText);
  });
});
