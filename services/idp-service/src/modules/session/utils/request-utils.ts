import {type Request} from "express";
import {SessionNotFound} from "../exceptions/SessionNotFound";
import {constants} from "../constants";

export function toSessionId(request: Request): string | undefined {
  const maybeSessionId = request.headers[constants.Headers.SessionId];
  const sessionId = Array.isArray(maybeSessionId)
    ? maybeSessionId[0]
    : maybeSessionId;

  if (sessionId) {
    return sessionId;
  }

  throw new SessionNotFound(sessionId);
}
