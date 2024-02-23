import {TBaseToken} from "./TBaseToken";
import {TUserClaims} from "./TUserClaims";

export type TIdToken = TBaseToken & TUserClaims;
