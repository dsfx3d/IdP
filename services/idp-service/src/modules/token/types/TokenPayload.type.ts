import {ETokenType} from "./ETokenType.enum";

export type TokenPayload = {
  uid: number;
  sid: string;
  did: string;
  typ: ETokenType;
};
