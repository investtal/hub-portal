// @__NO_SIDE_EFFECTS__
export function isServer(): boolean {
  return typeof window === "undefined"
}
