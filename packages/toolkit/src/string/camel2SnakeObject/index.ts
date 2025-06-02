import type { CamelToSnakeNested } from "@investtal/types"
import { camel2snake } from "../camel2Snake"

export function camel2SnakeObject<T>(obj: T): CamelToSnakeNested<T> {
  if (Array.isArray(obj)) {
    return obj.map(item => camel2SnakeObject(item)) as CamelToSnakeNested<T>
  }

  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const newKey = camel2snake(key)
        acc[newKey] = camel2SnakeObject(value)
        return acc
      },
      {} as Record<string, any>,
    ) as CamelToSnakeNested<T>
  }

  return obj as CamelToSnakeNested<T>
}
