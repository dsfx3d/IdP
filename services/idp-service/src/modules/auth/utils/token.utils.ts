import {AuthTokenMissing} from "../exceptions/AuthTokenMissing";
import {Request} from "express";
import {constants} from "../constants";

export function toAuthToken(request: Request) {
  const maybeAuthHeader = request.headers[constants.Headers.AuthZ];
  const authHeader = Array.isArray(maybeAuthHeader)
    ? maybeAuthHeader[0]
    : maybeAuthHeader;

  if (authHeader?.split(" ")[1]) {
    return authHeader.split(" ")[1];
  }

  throw new AuthTokenMissing();
}
