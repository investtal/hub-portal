import { describe, expect, it } from "vitest"
import { lowerCaseFirst } from "./index"

describe("lowerCaseFirst", () => {
  it("should return an empty string if input is undefined", () => {
    expect(lowerCaseFirst(undefined)).toBe("")
  })

  it("should return an empty string if input is an empty string", () => {
    expect(lowerCaseFirst("")).toBe("")
  })

  const testCases = [
    { input: "HelloWorld", expected: "helloWorld", description: "convert uppercase first char" },
    { input: "helloWorld", expected: "helloWorld", description: "keep lowercase first char" },
    { input: "A", expected: "a", description: "handle single uppercase char" },
    { input: "a", expected: "a", description: "handle single lowercase char" },
    { input: "1HelloWorld", expected: "1HelloWorld", description: "handle leading number" },
    { input: "!HelloWorld", expected: "!HelloWorld", description: "handle leading symbol" },
  ]

  for (const { input, expected, description } of testCases) {
    it.concurrent(`should ${description}: '${input}' -> '${expected}'`, () => {
      expect(lowerCaseFirst(input)).toBe(expected)
    })
  }
})
