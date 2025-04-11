// @__NO_SIDE_EFFECTS__
export function isBase64(base: string): boolean {
  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(base)
}
