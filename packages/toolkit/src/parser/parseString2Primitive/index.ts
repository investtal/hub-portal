// @__NO_SIDE_EFFECTS__
export function parseString2Primitive(value: any): any {
  if (typeof value !== "string") {
    return value
  }

  if (value.match(/^[+-]?(?:\d*\.)?\d+$/)) {
    return Number(value)
  }

  if (value === "true") {
    return true
  }

  if (value === "false") {
    return false
  }

  return value
}
