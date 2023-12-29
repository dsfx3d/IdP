import {ExecutionContext, createParamDecorator} from "@nestjs/common";
import {Session} from "./session.entity";
import {SessionInterceptorMissing} from "./exceptions/SessionInterceptorMissing";
import {TSessionInterceptorRequest} from "./types/TSessionInterceptorRequest";
import {toSessionId} from "./utils/request-utils";

export const SessionDecorator = createParamDecorator(function getSession(
  _data: unknown,
  ctx: ExecutionContext,
): Promise<Session> {
  const request = ctx.switchToHttp().getRequest<TSessionInterceptorRequest>();
  const sessionId = toSessionId(request);
  if (request.sessionService) {
    return request.sessionService.findOneById(sessionId);
  }
  throw new SessionInterceptorMissing();
});
