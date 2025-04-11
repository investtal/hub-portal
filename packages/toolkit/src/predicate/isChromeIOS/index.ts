// @__NO_SIDE_EFFECTS__
export function isIOSChrome(): boolean {
  return typeof navigator !== "undefined" && !!navigator.userAgent.match("CriOS")
}
