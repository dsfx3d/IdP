/* eslint-disable max-nested-callbacks */
import {IEncryptionService} from "./IEncryptionService";

export function describeEncryptionService(
  label: string,
  service: IEncryptionService,
) {
  describe(label, () => {
    describe(service.encrypt.name, () => {
      it("encrypts a plain text", () => {
        const plainText = "Hello World!";
        const cipherText = service.encrypt(plainText);
        expect(plainText).not.toBe(cipherText);
      });
    });

    describe(service.decrypt.name, () => {
      it("decrypts a cipher text", () => {
        const plainText = "Hello World!";
        const cipherText = service.encrypt(plainText);
        const decryptedText = service.decrypt(cipherText);
        expect(plainText).toBe(decryptedText);
      });
    });
  });
}
