import {MissingHeader} from "~/exceptions/missing-header.exception";

type TRequestLike = {
  headers: Record<string, string | string[] | undefined>;
};

export function toHeader(request: TRequestLike, headerName: string): string {
  const header = request.headers[headerName];
  if (header) {
    return header as string;
  }
  throw new MissingHeader(headerName);
}
