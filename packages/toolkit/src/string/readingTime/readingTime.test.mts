import { describe, expect, it } from "vitest"
import { calculateReadingTime } from "."

describe("calculateReadingTime", () => {
  it("should return 1 minute for empty text", () => {
    expect(calculateReadingTime("")).toBe(1)
    expect(calculateReadingTime("   ")).toBe(1)
    expect(calculateReadingTime("\n\t")).toBe(1)
  })

  it("should return 1 minute for very short text", () => {
    expect(calculateReadingTime("Hello")).toBe(1)
    expect(calculateReadingTime("Hello world")).toBe(1)
    expect(calculateReadingTime("This is a short sentence.")).toBe(1)
  })

  it("should calculate reading time for normal text", () => {
    // 225 words = 1 minute
    const shortText = "word ".repeat(100).trim()
    expect(calculateReadingTime(shortText)).toBe(1)

    // 450 words = 2 minutes
    const mediumText = "word ".repeat(450).trim()
    expect(calculateReadingTime(mediumText)).toBe(2)

    // 675 words = 3 minutes
    const longText = "word ".repeat(675).trim()
    expect(calculateReadingTime(longText)).toBe(3)
  })

  it("should handle HTML content by removing tags", () => {
    const htmlText = "<p>This is a <strong>paragraph</strong> with <em>HTML</em> tags.</p>"
    // 8 words should take 1 minute
    expect(calculateReadingTime(htmlText)).toBe(1)

    const complexHtml = `
      <div>
        <h1>Title</h1>
        <p>First paragraph with <a href="#">link</a>.</p>
        <p>Second paragraph with <span>inline</span> elements.</p>
      </div>
    `
    // 12 words should take 1 minute
    expect(calculateReadingTime(complexHtml)).toBe(1)
  })

  it("should handle text with multiple whitespace characters", () => {
    const textWithSpaces = "word1    word2\nword3\tword4\r\nword5"
    expect(calculateReadingTime(textWithSpaces)).toBe(1)

    const textWithTabs = "word1\tword2\tword3\tword4\tword5"
    expect(calculateReadingTime(textWithTabs)).toBe(1)
  })

  it("should handle text with punctuation", () => {
    const textWithPunctuation = "Hello, world! How are you? I'm doing great. This is a test."
    // 12 words should take 1 minute
    expect(calculateReadingTime(textWithPunctuation)).toBe(1)
  })

  it("should handle text with numbers and special characters", () => {
    const textWithNumbers = "The year is 2024. There are 365 days. The temperature is 25°C."
    // 12 words should take 1 minute
    expect(calculateReadingTime(textWithNumbers)).toBe(1)

    const textWithSpecialChars = "Email: test@example.com, Phone: +1-555-123-4567"
    // 8 words should take 1 minute
    expect(calculateReadingTime(textWithSpecialChars)).toBe(1)
  })

  it("should handle edge cases around the 225 word boundary", () => {
    // 224 words = 1 minute (rounds up to 1)
    const justUnderBoundary = "word ".repeat(224).trim()
    expect(calculateReadingTime(justUnderBoundary)).toBe(1)

    // 225 words = 1 minute
    const atBoundary = "word ".repeat(225).trim()
    expect(calculateReadingTime(atBoundary)).toBe(1)

    // 226 words = 2 minutes (rounds up to 2)
    const justOverBoundary = "word ".repeat(226).trim()
    expect(calculateReadingTime(justOverBoundary)).toBe(2)
  })

  it("should handle very long text", () => {
    // 1000 words = 5 minutes (1000 / 225 = 4.44, rounds up to 5)
    const veryLongText = "word ".repeat(1000).trim()
    expect(calculateReadingTime(veryLongText)).toBe(5)

    // 2000 words = 9 minutes (2000 / 225 = 8.89, rounds up to 9)
    const extremelyLongText = "word ".repeat(2000).trim()
    expect(calculateReadingTime(extremelyLongText)).toBe(9)
  })

  it("should handle text with mixed content", () => {
    const mixedText = `
      <h1>Welcome to our blog</h1>
      <p>This is the first paragraph with some <strong>important</strong> content.</p>
      <p>Here's another paragraph with a <a href="https://example.com">link</a>.</p>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
      <p>Final paragraph with some concluding thoughts.</p>
    `
    // 25 words should take 1 minute
    expect(calculateReadingTime(mixedText)).toBe(1)
  })

  it("should handle text with non-English characters", () => {
    const unicodeText = "Hello 世界! This is a test with 中文 characters. こんにちは!"
    // 10 words should take 1 minute
    expect(calculateReadingTime(unicodeText)).toBe(1)
  })

  it("should handle text with emojis", () => {
    const emojiText = "Hello 👋 world! This is a test with emojis 🚀 and symbols ✨."
    // 10 words should take 1 minute
    expect(calculateReadingTime(emojiText)).toBe(1)
  })
})
