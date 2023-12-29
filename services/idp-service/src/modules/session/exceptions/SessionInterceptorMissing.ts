export class SessionInterceptorMissing extends Error {
  constructor() {
    super("SessionInterceptor is missing. Use SessionInterceptor interceptor");
  }
}
