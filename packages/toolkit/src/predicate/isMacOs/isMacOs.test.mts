import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { isMacOs } from "./index"

describe("isMacOs", () => {
  const originalWindow = global.window

  beforeEach(() => {
    // Reset window before each test
    // biome-ignore lint/performance/noDelete: <explanation>
    delete (global as any).window
  })

  afterEach(() => {
    // Restore window after each test
    ;(global as any).window = originalWindow
    vi.restoreAllMocks()
  })

  it("should return false when window is undefined", () => {
    expect(isMacOs()).toBe(false)
  })

  it("should return false when navigator is undefined", () => {
    ;(global as any).window = {}
    expect(isMacOs()).toBe(false)
  })

  it("should return true for iPad user agent", () => {
    ;(global as any).window = {
      navigator: {
        userAgent: "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)",
        maxTouchPoints: 1,
      },
    }
    expect(isMacOs()).toBe(true)
  })

  it("should return true for iPhone user agent", () => {
    ;(global as any).window = {
      navigator: {
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
        maxTouchPoints: 1,
      },
    }
    expect(isMacOs()).toBe(true)
  })

  it("should return true for iPod user agent", () => {
    ;(global as any).window = {
      navigator: {
        userAgent: "Mozilla/5.0 (iPod; CPU iPhone OS 14_0 like Mac OS X)",
        maxTouchPoints: 1,
      },
    }
    expect(isMacOs()).toBe(true)
  })

  it("should return true for Mac with touch points", () => {
    ;(global as any).window = {
      navigator: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        maxTouchPoints: 2,
      },
    }
    expect(isMacOs()).toBe(true)
  })

  it("should return false for non-Mac user agent", () => {
    ;(global as any).window = {
      navigator: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        maxTouchPoints: 1,
      },
    }
    expect(isMacOs()).toBe(false)
  })
})
