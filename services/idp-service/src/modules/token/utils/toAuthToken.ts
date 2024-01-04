import {AuthTokenMissing} from "../exceptions/AuthTokenMissing";
import {Request} from "express";
import {constants} from "../constants";
import {toHeader} from "~/utils/toHeader";

export function toAuthToken(request: Request) {
  const authHeader = toHeader(request, constants.Headers.AuthZ);
  if (authHeader?.split(" ")[1]) {
    return authHeader.split(" ")[1];
  }
  throw new AuthTokenMissing();
}
