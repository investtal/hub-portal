import { isPrefersReducedMotion } from "../../predicate/isPrefersReducedMotion"

/**
 * Animates an element using keyframes. Returns a promise that resolves after the animation completes or gets canceled.
 */
// @__NO_SIDE_EFFECTS__
export function animateTo(
  el: HTMLElement,
  keyframes: Keyframe[],
  options?: KeyframeAnimationOptions,
): Promise<unknown> {
  return new Promise(resolve => {
    if (options?.duration === Number.POSITIVE_INFINITY) {
      throw new Error("Promise-based animations must be finite.")
    }

    const animation = el.animate(keyframes, {
      ...options,
      duration: isPrefersReducedMotion() ? 0 : options?.duration,
    })

    animation.addEventListener("cancel", resolve, { once: true })
    animation.addEventListener("finish", resolve, { once: true })
  })
}
