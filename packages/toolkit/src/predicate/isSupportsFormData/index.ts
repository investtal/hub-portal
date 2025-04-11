// @__NO_SIDE_EFFECTS__
export function isSupportsFormData(): boolean {
  return typeof globalThis.FormData === "function"
}
