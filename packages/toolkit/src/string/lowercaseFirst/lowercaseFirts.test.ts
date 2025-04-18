import { describe, expect, it } from "vitest"
import { lowerCaseFirst } from "./index"

describe("lowerCaseFirst", () => {
  it("should return an empty string if input is undefined", () => {
    expect(lowerCaseFirst(undefined)).toBe("")
  })

  it("should return an empty string if input is an empty string", () => {
    expect(lowerCaseFirst("")).toBe("")
  })

  it("should convert the first character of a string to lowercase", () => {
    expect(lowerCaseFirst("HelloWorld")).toBe("helloWorld")
  })

  it("should return the string as is if the first character is already lowercase", () => {
    expect(lowerCaseFirst("helloWorld")).toBe("helloWorld")
  })

  it("should handle single character strings (uppercase)", () => {
    expect(lowerCaseFirst("A")).toBe("a")
  })

  it("should handle single character strings (lowercase)", () => {
    expect(lowerCaseFirst("a")).toBe("a")
  })

  it("should not change strings starting with non-alphabetic characters", () => {
    expect(lowerCaseFirst("1HelloWorld")).toBe("1HelloWorld")
    expect(lowerCaseFirst("!HelloWorld")).toBe("!HelloWorld")
  })
})
