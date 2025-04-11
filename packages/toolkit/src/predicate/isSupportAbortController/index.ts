// @__NO_SIDE_EFFECTS__
export function isSupportsAbortController(): boolean {
  return typeof globalThis.AbortController === "function"
}
