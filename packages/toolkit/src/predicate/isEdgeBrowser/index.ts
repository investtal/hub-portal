// @__NO_SIDE_EFFECTS__
export function isEdgeBrowser(): boolean {
  return typeof navigator !== "undefined" && navigator.userAgent.indexOf("Edg") > -1
}
