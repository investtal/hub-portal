/**
 * Calculate reading time based on word count
 * @param text - The text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string): number {
  // Average reading speed is 200-250 words per minute for adults
  const WORDS_PER_MINUTE = 225

  // Remove HTML tags safely without backtracking vulnerability
  const plainText = text.replace(/<[^<>]*>/g, " ")

  // Count words by splitting on whitespace and filtering empty strings
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length

  // Calculate reading time in minutes, minimum 1 minute
  const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return readingTime
}
