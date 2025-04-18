export function lowerCaseFirst(input: string | undefined): string {
  if (!input) return ""

  return input.charAt(0).toLowerCase() + input.slice(1)
}
