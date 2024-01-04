import {ExecutionContext} from "@nestjs/common";
import {Session} from "./session.entity";
import {SessionInterceptorMissing} from "./exceptions/SessionInterceptorMissing";
import {TSessionInterceptorRequest} from "./types/TSessionInterceptorRequest";
import {constants} from "./constants";
import {toHeader} from "~/utils/toHeader";

export function sessionDecorator(
  _data: unknown,
  ctx: ExecutionContext,
): Promise<Session> {
  const request = ctx.switchToHttp().getRequest<TSessionInterceptorRequest>();
  const sessionId = toHeader(request, constants.Headers.SessionId);
  if (request.sessionService) {
    return request.sessionService.findOneById(sessionId);
  }
  throw new SessionInterceptorMissing();
}
