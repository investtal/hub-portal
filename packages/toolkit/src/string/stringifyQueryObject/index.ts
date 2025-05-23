// @__NO_SIDE_EFFECTS__
export function stringifyQueryObject(queryParameters: Record<string, unknown>): string {
  if (!queryParameters) return ""
  return Object.entries(queryParameters).reduce((queryString, [key, val]) => {
    const symbol = queryString.length === 0 ? "?" : "&"
    // biome-ignore lint/style/noParameterAssign: Ignore
    queryString += typeof val === "string" ? `${symbol}${key}=${val}` : ""
    return queryString
  }, "")
}
