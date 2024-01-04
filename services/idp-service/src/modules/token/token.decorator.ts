import {ExecutionContext} from "@nestjs/common";
import {Session} from "~/modules/session/session.entity";
import {TokenInterceptorMissing} from "./exceptions/TokenInterceptorMissing";
import {TokenInterceptorRequest} from "./types/TokenInterceptorRequest.type";
import {TokenSessionMismatch} from "./exceptions/TokenSessionMismatch";
import {sessionDecorator} from "~/modules/session/session.decorator";
import {toAuthToken} from "./utils/toAuthToken";

export async function tokenDecorator(
  data: unknown,
  context: ExecutionContext,
): Promise<string> {
  const request = context.switchToHttp().getRequest<TokenInterceptorRequest>();
  const session = await sessionDecorator(data, context);
  const token = toAuthToken(request);

  if (await isTokenFromSession(request, token, session)) {
    return token;
  }

  throw new TokenSessionMismatch();
}

function isTokenFromSession(
  request: TokenInterceptorRequest,
  token: string,
  session: Session,
): Promise<boolean> {
  if (request.tokenService) {
    return request.tokenService.isTokenFromSession(session, token);
  }
  throw new TokenInterceptorMissing();
}
