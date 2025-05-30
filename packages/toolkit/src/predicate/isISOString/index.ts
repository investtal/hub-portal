// @__NO_SIDE_EFFECTS__
export function isISOString(val: string): boolean {
  const d = new Date(val)
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val
}
