// @__NO_SIDE_EFFECTS__
export function isIOS(): boolean {
  return (
    typeof window !== "undefined" &&
    window.navigator != null &&
    (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      (window.navigator.userAgent.includes("Mac") && window.navigator.maxTouchPoints > 1))
  )
}
