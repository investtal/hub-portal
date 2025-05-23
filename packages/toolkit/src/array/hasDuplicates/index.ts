/**
 * check if an array contains duplicates
 * Example:
 *  hasDuplicates([1, 2, 2, 3, 4, 4, 5]); // true
    hasDuplicates([1, 2, 3, 4, 5]); // false
 */
// @__NO_SIDE_EFFECTS__
export function hasDuplicates<T = any>(arr: T[]): boolean {
  return arr.length !== new Set(arr).size
}
