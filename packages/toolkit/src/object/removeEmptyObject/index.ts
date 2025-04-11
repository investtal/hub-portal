import { isDefined } from "../../predicate/isDefined"
import { isNotEmpty } from "../../predicate/isNotEmpty"
import { isNotNull } from "../../predicate/isNotNull"

/**
 * @description Remove empty fields from an object and returns a new filtered object
 * @param {any} obj - The input obj
 * @returns {any} - the clean obj
 */
// @__NO_SIDE_EFFECTS__
export function removeEmptyObj<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => isNotNull(v) && isDefined(v) && isNotEmpty(v)),
  ) as Partial<T>
}
