import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  createParamDecorator,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {TokenInterceptorRequest} from "./types/TokenInterceptorRequest.type";
import {TokenService} from "./token.service";
import {tokenDecorator} from "./token.decorator";

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  static readonly Token = createParamDecorator(tokenDecorator);

  constructor(private readonly tokenService: TokenService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context
      .switchToHttp()
      .getRequest<TokenInterceptorRequest>();
    request.tokenService = this.tokenService;
    return next.handle();
  }
}
