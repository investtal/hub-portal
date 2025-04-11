import { nextEvent } from "../nextEvent"

// @__NO_SIDE_EFFECTS__
export function transitionEnd(element: HTMLElement): Promise<Event> {
  return nextEvent(element, "transitionend")
}
