/* eslint-disable max-nested-callbacks */
import {IHashService} from "./IHashService";

export function describeHashService(label: string, service: IHashService) {
  describe(label, () => {
    describe(service.hash.name, () => {
      it("hashes a plaintext", () => {
        const password = "password";
        const passwordHash = service.hash(password);
        expect(password).not.toBe(passwordHash);
      });
    });

    describe(service.match.name, () => {
      it("identifies the plaintext used to derive a hash", () => {
        const password = "password";
        const passwordHash = service.hash(password);
        const isEqual = service.match({
          plain: password,
          hash: passwordHash,
        });
        expect(isEqual).toBeTruthy();
      });
    });
  });
}
