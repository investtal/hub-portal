/**
 * Group array elements into two or more arrays arrays, depending on the provided function's return value.
 * Ex: const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
       partition(users, o => o.active);
       [
         [{ user: 'fred', age: 40, active: true }],
         [{ user: 'barney', age: 36, active: false }]
       ]
 */
// @__NO_SIDE_EFFECTS__
export function partition<T = any>(
  arr: T[],
  fn: (val: T, index: number, arr: T[]) => boolean,
): MapIterator<T> {
  return arr
    .reduce((acc: Map<any, any>, val, i, arr) => {
      const current = fn(val, i, arr)
      if (acc.has(current)) acc.get(current).push(val)
      else acc.set(current, [val])
      return acc
    }, new Map())
    .values()
}
