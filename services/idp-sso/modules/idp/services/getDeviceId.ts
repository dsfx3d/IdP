import {nanoid} from "nanoid";

const deviceIdKey = "did";

export function getDeviceId(): string {
  let deviceId = localStorage.getItem(deviceIdKey);
  if (!deviceId) {
    deviceId = nanoid();
    localStorage.setItem(deviceIdKey, deviceId);
  }
  return deviceId;
}
