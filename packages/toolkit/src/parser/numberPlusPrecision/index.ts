import { createOperationPrecision } from "../numberCreateOperationPrecision"
import { digitLengthPrecision } from "../numberDigitLengthPrecision"
import { timesPrecision } from "../numberTimesPrecision"

/**
 *  Number precision: Accurate addition.
 *
 * @param nums The numbers to add
 */
// @__NO_SIDE_EFFECTS__
export const plusPrecision: (num1: number, num2: number) => number = createOperationPrecision(
  (num1, num2) => {
    // take the largest decimal place
    const baseNum = 10 ** Math.max(digitLengthPrecision(num1), digitLengthPrecision(num2))
    // Convert decimals to integers and calculate
    return (timesPrecision(num1, baseNum) + timesPrecision(num2, baseNum)) / baseNum
  },
)
