import type { SnakeToCamelNested } from "@investtal/types"
import { snake2camel } from "../snakeToCamel"

export function snakeToCamelObject<T>(obj: T): SnakeToCamelNested<T> {
  if (Array.isArray(obj)) {
    return obj.map(item => snakeToCamelObject(item)) as SnakeToCamelNested<T>
  }

  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const newKey = snake2camel(key)
        acc[newKey] = snakeToCamelObject(value)
        return acc
      },
      {} as Record<string, any>,
    ) as SnakeToCamelNested<T>
  }

  return obj as SnakeToCamelNested<T>
}
