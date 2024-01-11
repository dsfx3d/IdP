export function toRequestHeaders(
  headers: Record<string, string> = {},
): Record<string, string> {
  return {
    "Content-Type": "application/json",
    ...headers,
  };
}
