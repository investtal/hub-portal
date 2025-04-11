/**
 * Usually to check is Firefox browser
 */
// @__NO_SIDE_EFFECTS__
export function isGecko(): boolean {
  return typeof navigator !== "undefined" && /gecko\/(\d+)/i.test(navigator.userAgent)
}
