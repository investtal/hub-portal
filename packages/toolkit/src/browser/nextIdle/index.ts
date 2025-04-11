// @__NO_SIDE_EFFECTS__
export function nextIdle(): Promise<void> | typeof setTimeout {
  // @ts-expect-error Ignore
  return window !== undefined ? new Promise(window.requestIdleCallback || setTimeout) : setTimeout
}
