import type { CamelToSnakeNested } from "@investtal/types"
import { camel2snake } from "../camel2Snake"

// @__NO_SIDE_EFFECTS__
export function camel2SnakeObject<T extends Object>(obj: T): CamelToSnakeNested<T> {
  return Object.entries(obj).reduce(
    // biome-ignore lint/performance/noAccumulatingSpread: Ignore here
    (acc, cur) => ({ ...acc, [camel2snake(cur[0])]: cur[1] }),
    {} as CamelToSnakeNested<T>,
  )
}
