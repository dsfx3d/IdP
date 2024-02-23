import {TBaseToken} from "./TBaseToken";

export type TRefreshToken = TBaseToken & {
  sid: string;
};
