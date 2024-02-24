import {IHashService} from "./IHashService";
import {THashMatchRequest} from "./THashMatchRequest";
import {createHash} from "node:crypto";

export class ShaService implements IHashService {
  constructor(private readonly algorithm: string = "sha256") {}

  hash(plaintext: string): string {
    return createHash(this.algorithm).update(plaintext).digest("hex");
  }

  match(request: THashMatchRequest): boolean {
    return this.hash(request.plain) === request.hash;
  }
}
