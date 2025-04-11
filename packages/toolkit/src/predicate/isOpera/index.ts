// @__NO_SIDE_EFFECTS__
export function isOpera(): boolean {
  return typeof window !== "undefined" && typeof window.opr !== "undefined"
}

declare global {
  interface Window {
    opr: any
  }
}
