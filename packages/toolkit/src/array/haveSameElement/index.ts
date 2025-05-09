import { isDeepEqual } from "../../predicate/isDeepEqual"

/**
 * Function check two array have at least a same element
 */
// @__NO_SIDE_EFFECTS__
export function haveSameElement<T1, T2>(arr1: T1[], arr2: T2[]): boolean {
  for (let i = 0; i < arr1.length; i++) {
    const el = arr1[i]
    if (arr2.some(e => isDeepEqual(e, el))) {
      return true
    }
  }
  return false
}
