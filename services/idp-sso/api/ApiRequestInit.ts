import {GetKey} from "@/utils/GetKey";
import {HttpMethod} from "@/utils/HttpMethod";
import {TApi} from "./TApi";

export type ApiRequestInit<
  A extends TApi,
  M extends HttpMethod,
  E extends keyof A,
> = Omit<RequestInit, "body" & "method" & "headers"> & {
  headers: GetKey<GetKey<GetKey<A, E>, M>, "headers">;
} & (
    | {
        method: "GET";
      }
    | {
        method: M;
        body: GetKey<GetKey<GetKey<A, E>, M>, "dto">;
      }
  );
