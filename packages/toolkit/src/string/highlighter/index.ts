export { default as Highlighter } from "./Highlighter"

// Re-export core utilities for advanced usage
export { findAll, combineChunks, fillInChunks } from "./highlight-words-core"
export { default as memoizeOne } from "./memoize-core"
export type { EqualityFn, MemoizedFn } from "./memoize-core"

// Export type from the component
export type HighlighterProps = Parameters<typeof import("./Highlighter").default>[0]
