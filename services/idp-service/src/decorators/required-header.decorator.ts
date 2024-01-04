import {ExecutionContext, createParamDecorator} from "@nestjs/common";
import {Request} from "express";
import {toHeader} from "~/utils/toHeader";

export const RequiredHeader = createParamDecorator(function (
  headerName: string,
  ctx: ExecutionContext,
) {
  const request = ctx.switchToHttp().getRequest<Request>();
  return toHeader(request, headerName);
});
