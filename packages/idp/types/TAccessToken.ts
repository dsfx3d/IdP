import {TRefreshToken} from "./TRefreshToken";

export type TAccessToken = TRefreshToken & {
  scope: string;
};
