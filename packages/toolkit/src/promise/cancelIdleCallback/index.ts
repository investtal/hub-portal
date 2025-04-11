function cancelIdleCallbackShim(id: any): void {
  clearTimeout(id)
}

// @__NO_SIDE_EFFECTS__
export const cancelIdleCallback: (id: any) => void =
  typeof window !== "undefined"
    ? window.cancelIdleCallback || cancelIdleCallbackShim
    : cancelIdleCallbackShim
