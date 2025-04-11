// @__NO_SIDE_EFFECTS__
export function freezeMainThread(duration: number): void {
  const start = Date.now()
  while (Date.now() - start < duration) {}
}
