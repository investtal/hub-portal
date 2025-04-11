// @__NO_SIDE_EFFECTS__
export function windowMatchMedia(): typeof window.matchMedia | undefined {
  return typeof window !== "undefined" ? window.matchMedia || window.msMatchMedia : undefined
}

declare global {
  interface Window {
    msMatchMedia(query: string): MediaQueryList
  }
}
