import { isServer } from "../../predicate/isServer"

// @__NO_SIDE_EFFECTS__
export function requestFullscreen(mode = true, el = "body"): void {
  if (isServer()) return
  if (mode) document.querySelector(el)?.requestFullscreen()
  else document.exitFullscreen()
}
