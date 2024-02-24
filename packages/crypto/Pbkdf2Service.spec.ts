/* eslint-disable max-nested-callbacks */
import {Pbkdf2Service} from "./Pbkdf2Service";
import {describeHashService} from "./describeHashService";

const hashService = new Pbkdf2Service();
describeHashService(Pbkdf2Service.name, hashService);
describe(Pbkdf2Service.name, () => {
  describe(Pbkdf2Service.prototype.hash.name, () => {
    it("generates unique hashes for same password", () => {
      const hashService = new Pbkdf2Service();
      const password = "password";
      const hash1 = hashService.hash(password);
      const hash2 = hashService.hash(password);
      expect(hash1).not.toBe(hash2);
    });
  });
});
