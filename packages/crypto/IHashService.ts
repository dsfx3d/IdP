import {THashMatchRequest} from "./THashMatchRequest";

export interface IHashService {
  hash(plaintext: string): string;
  match(request: THashMatchRequest): boolean;
}
