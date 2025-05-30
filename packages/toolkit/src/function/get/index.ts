/**
 * @description Get nested object property from path string
 * @example const obj = {
  selector: { to: { val: 'val to select' } },
  target: [1, 2, { a: 'test' }] };

  get(obj, 'selector.to.val') --> 'val to select'
  get(obj, 'target[0]') --> 1
  get(obj, 'target[2].a'); --> 'test'
 */
// @__NO_SIDE_EFFECTS__
export function get<T = any>(from: any, selector: string): T {
  return selector
    .replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter(t => t !== "")
    .reduce((acc, curr) => acc?.[curr], from)
}
