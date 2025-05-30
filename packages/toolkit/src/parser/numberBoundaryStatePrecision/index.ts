let _boundaryCheckingState = true

/**
 *  Number precision: Log a warning if the given number is out of bounds.
 *
 * @param num The input number
 */
// @__NO_SIDE_EFFECTS__
export function checkBoundaryPrecision(num: number): void {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(
        `${num} is beyond boundary when transfer to integer, the results may not be accurate`,
      )
    }
  }
}

/**
 * Number precision: Whether to check the bounds of number, default is enabled.
 *
 * @param flag The value to indicate whether is enabled
 */
// @__NO_SIDE_EFFECTS__
export function enableBoundaryCheckingPrecision(flag: boolean): void {
  _boundaryCheckingState = flag
}
