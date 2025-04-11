// @__NO_SIDE_EFFECTS__
export function isSupportsResponseStreams(): boolean {
  return typeof globalThis.ReadableStream === "function"
}
