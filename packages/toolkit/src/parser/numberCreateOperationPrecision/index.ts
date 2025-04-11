/**
 * Create an operation to support rest params.
 *
 * @param operation The original operation
 */
// @__NO_SIDE_EFFECTS__
export function createOperationPrecision(
  operation: (n1: number, n2: number) => number,
): (...nums: number[]) => number {
  return (...nums: number[]) => {
    const [first, ...others] = nums
    return others.reduce((prev, next) => operation(prev, next), first) as number
  }
}
