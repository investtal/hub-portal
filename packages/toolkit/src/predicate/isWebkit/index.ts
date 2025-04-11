// @__NO_SIDE_EFFECTS__
export function isWebkit(): boolean {
  return typeof document !== "undefined" && "webkitFontSmoothing" in document.documentElement.style
}
