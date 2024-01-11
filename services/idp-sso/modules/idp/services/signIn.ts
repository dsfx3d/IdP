import {Credentials} from "../types/Credentials";
import {TokenPair} from "@/idp-service/src/modules/token/types/TokenPair.type";
import {constants} from "@/idp-service/src/modules/session/constants";
import {toRequestHeaders} from "../helpers/toRequestHeaders";

const url = `${process.env.NEXT_PUBLIC_IDP_API_URL}/auth/login`;
const method = "POST";

export async function signIn({
  sessionId,
  ...credentials
}: Credentials): Promise<TokenPair> {
  const headers = toRequestHeaders({
    [constants.Headers.SessionId]: sessionId,
  });
  const body = JSON.stringify(credentials);
  const response = await fetch(url, {method, headers, body});
  return response.json();
}
