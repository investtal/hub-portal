import { invariant } from "../../common/invariant"
import { isBrowser } from "../../predicate/isBrowser"

// @__NO_SIDE_EFFECTS__
export function useObserverElement(): (
  element: Element,
  callback: IntersectionObserverCallback,
) => void {
  invariant(isBrowser())

  let observer: IntersectionObserver | null = null

  const callbacks = new Map<Element, CallableFunction>()

  const observe = (element: Element, callback: IntersectionObserverCallback) => {
    if (!observer) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const callback = callbacks.get(entry.target)
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0
          if (isVisible && callback) {
            callback()
          }
        }
      })
    }
    callbacks.set(element, callback)
    observer.observe(element)

    return () => {
      callbacks.delete(element)
      observer?.unobserve(element)
      if (callbacks.size === 0) {
        observer?.disconnect()
        observer = null
      }
    }
  }

  return observe
}
