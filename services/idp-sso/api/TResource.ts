import {HttpMethod} from "@/utils/HttpMethod";

export type TResource = {
  [key in HttpMethod]: {
    headers: Record<string, string>;
    dto: Record<string, unknown>;
    result: Record<string, unknown>;
  };
};
