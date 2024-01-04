import {ExecutionContext, createParamDecorator} from "@nestjs/common";
import {MissingHeader} from "~/exceptions/missing-header.exception";

export const RequiredHeader = createParamDecorator(function (
  headerName: string,
  ctx: ExecutionContext,
) {
  const request = ctx.switchToHttp().getRequest<Request>();
  const header = request.headers[headerName];
  if (header) {
    return header;
  }
  throw new MissingHeader(headerName);
});
