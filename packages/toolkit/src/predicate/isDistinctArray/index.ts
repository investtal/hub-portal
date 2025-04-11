/**
 * check if all the values of an array are distinct
 * Example:
 *  isDistinctArray([1, 2, 2, 3, 4, 4, 5]); // false
    isDistinctArray([1, 2, 3, 4, 5]); // true
 */
// @__NO_SIDE_EFFECTS__
export function isDistinctArray<T = any>(arr: T[]): boolean {
  return arr.length === new Set(arr).size
}
