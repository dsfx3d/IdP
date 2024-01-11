import {constants} from "@/idp-service/src/modules/session/constants";
import {getDeviceId} from "./getDeviceId";

const sessionIdKey = "s";

export async function getSessionId(): Promise<string> {
  let sessionId = localStorage.getItem(sessionIdKey);
  if (!sessionId) {
    sessionId = await fetchSessionId();
    localStorage.setItem(sessionIdKey, sessionId);
  }
  return sessionId;
}

const url = `${process.env.NEXT_PUBLIC_IDP_API_URL}/session`;
const method = "POST";

async function fetchSessionId(): Promise<string> {
  const headers = {
    [constants.Headers.DeviceId]: getDeviceId(),
  };
  const response = await fetch(url, {method, headers});
  return response.text();
}
