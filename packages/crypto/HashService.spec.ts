/* eslint-disable max-nested-callbacks */
import {HashService} from "./HashService";

describe(HashService.name, () => {
  describe(HashService.prototype.hashPassword.name, () => {
    it("hashes a password", () => {
      const password = "password";
      const hasher = new HashService();
      const passwordHash = hasher.hashPassword(password);
      expect(password).not.toBe(passwordHash);
    });

    it("generates unique hashes for same password", () => {
      const hashService = new HashService();
      const password = "password";
      const hash1 = hashService.hashPassword(password);
      const hash2 = hashService.hashPassword(password);
      expect(hash1).not.toBe(hash2);
    });
  });

  describe(HashService.prototype.isEqual.name, () => {
    it("identifies the password used for deriving a hash", () => {
      const hashService = new HashService();
      const password = "password";
      const passwordHash = hashService.hashPassword(password);
      const isEqual = hashService.isEqual({password, passwordHash});
      expect(isEqual).toBeTruthy();
    });
  });
});
