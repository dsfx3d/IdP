import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  createParamDecorator,
} from "@nestjs/common";

import {type Observable} from "rxjs";
import {SessionService} from "./session.service";
import {TSessionInterceptorRequest} from "./types/TSessionInterceptorRequest";
import {sessionDecorator} from "./session.decorator";

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  static readonly Session = createParamDecorator(sessionDecorator);

  constructor(private readonly sessionService: SessionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<TSessionInterceptorRequest>();
    request.sessionService = this.sessionService;
    return next.handle();
  }
}
