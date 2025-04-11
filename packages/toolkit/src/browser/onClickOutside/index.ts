import { isServer } from "../../predicate/isServer"

// @__NO_SIDE_EFFECTS__
export function onClickOutside(element: HTMLElement, callback: CallableFunction): void {
  if (isServer()) return
  document.addEventListener("click", e => {
    if (!element.contains(e.target as any)) callback()
  })
}
