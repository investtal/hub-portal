// @__NO_SIDE_EFFECTS__
export function nextFrame(): Promise<number> {
  return new Promise(requestAnimationFrame)
}
