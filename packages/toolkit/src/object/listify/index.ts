import type { Entity } from "@investtal/types"

/**
 * @description Map an object to an array
 * @example const people = { John: { age: 42 }, Adam: { age: 39 } };
 * listify(people, (key, value) => ({ name: key, ...value }));
 * [ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ]
 */
// @__NO_SIDE_EFFECTS__
export function listify<O extends Record<string, any>, T = any>(
  obj: O,
  mapFn: (key: string, value: Entity) => any,
): T[] {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push(mapFn(key, value))
    return acc
  }, [] as T[])
}
