// @__NO_SIDE_EFFECTS__
export function toggleClass(dom: HTMLElement, cls: string, on = true): void {
  if (on) dom.classList.add(cls)
  else dom.classList.remove(cls)
}
