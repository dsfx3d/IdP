export class TokenInterceptorMissing extends Error {
  constructor() {
    super("TokenInterceptor is missing. Use TokenInterceptor interceptor");
  }
}
