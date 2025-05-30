import { isServer } from "../../predicate/isServer"

/**
 * Smooth-scrolls to the top of the page.
 * Use Window.requestAnimationFrame() to animate the scrolling
 */
// @__NO_SIDE_EFFECTS__
export function scrollToTop(): void {
  if (isServer()) return

  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
