import { cacheStringFunction } from "../cacheStringFunc"

// @__NO_SIDE_EFFECTS__
export const capitalizeFirst: (value: string) => string = cacheStringFunction((value: string) => {
  return value.replace(/^./, value[0].toUpperCase())
})
