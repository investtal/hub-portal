import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { globProcess } from "../../object/process"
import { isMacOsPlatform } from "./index"

describe("isMacOsPlatform", () => {
  let platformSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    platformSpy = vi.spyOn(globProcess, "platform", "get")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should return true for darwin platform", () => {
    platformSpy.mockReturnValue("darwin")
    expect(isMacOsPlatform()).toBe(true)
  })

  it("should return true for DARWIN platform (case insensitive)", () => {
    platformSpy.mockReturnValue("DARWIN")
    expect(isMacOsPlatform()).toBe(true)
  })

  it("should return false for non-darwin platform", () => {
    platformSpy.mockReturnValue("win32")
    expect(isMacOsPlatform()).toBe(false)
  })

  it("should return false when platform is undefined", () => {
    platformSpy.mockReturnValue(undefined)
    expect(isMacOsPlatform()).toBe(false)
  })

  it("should return false when platform is empty string", () => {
    platformSpy.mockReturnValue("")
    expect(isMacOsPlatform()).toBe(false)
  })
})
