/** Detect if user browser is MacOS */
// @__NO_SIDE_EFFECTS__
export function isMacOs(): boolean {
  return (
    typeof window !== "undefined" &&
    window.navigator != null &&
    (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      window.navigator.userAgent.includes("Mac"))
  )
}
