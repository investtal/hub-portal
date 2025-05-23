import type { EntityId } from "@investtal/types"

/**
 *  Number precision: Correct the given number to specifying significant digits.
 *
 * @param num The input number
 * @param precision An integer specifying the number of significant digits
 *
 * @example strip(0.09999999999999998) === 0.1 // true
 */
// @__NO_SIDE_EFFECTS__
export function stripPrecision(num: EntityId, precision = 15): number {
  return +Number.parseFloat(Number(num).toPrecision(precision))
}
