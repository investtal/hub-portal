// Take this from https://developer.chrome.com/blog/using-requestidlecallback

function requestIdleCallbackShim(cb: any): number {
  const start = Date.now()
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    })
  }, 1) as unknown as number
}

// @__NO_SIDE_EFFECTS__
export const requestIdleCallback: (cb: any) => number =
  typeof window !== "undefined"
    ? window.requestIdleCallback || requestIdleCallbackShim
    : requestIdleCallbackShim
