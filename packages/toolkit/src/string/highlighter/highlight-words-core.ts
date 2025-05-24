/**
 * Creates an array of chunk objects representing both higlightable and non highlightable pieces of text that match each search word.
 * @return Array of "chunks" (where a Chunk is { start:number, end:number, highlight:boolean })
 */
export const findAll = ({
  autoEscape,
  caseSensitive = false,
  findChunks = defaultFindChunks,
  sanitize,
  searchWords,
  textToHighlight,
}: {
  autoEscape?: boolean
  caseSensitive?: boolean
  findChunks?: typeof defaultFindChunks
  sanitize?: typeof defaultSanitize
  searchWords: Array<string>
  textToHighlight: string
}): Array<any> =>
  fillInChunks({
    chunksToHighlight: combineChunks({
      chunks: findChunks({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToHighlight,
      }),
    }),
    totalLength: textToHighlight ? textToHighlight.length : 0,
  })

/**
 * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
 * @return {start:number, end:number}[]
 */
export const combineChunks = ({
  chunks,
}: {
  chunks: Array<any>
}): Array<any> => {
  chunks = chunks
    .sort((first, second) => first.start - second.start)
    .reduce((processedChunks, nextChunk) => {
      // First chunk just goes straight in the array...
      if (processedChunks.length === 0) {
        return [nextChunk]
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // ... subsequent chunks get checked to see if they overlap...
        const prevChunk = processedChunks.pop()
        if (nextChunk.start < prevChunk.end) {
          // It may be the case that prevChunk completely surrounds nextChunk, so take the
          // largest of the end indexes.
          const endIndex = Math.max(prevChunk.end, nextChunk.end)
          processedChunks.push({ highlight: false, start: prevChunk.start, end: endIndex })
        } else {
          processedChunks.push(prevChunk, nextChunk)
        }
        return processedChunks
      }
    }, [])

  return chunks
}

/**
 * Examine text for any matches.
 * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
 * @return {start:number, end:number}[]
 */
const defaultFindChunks = ({
  autoEscape,
  caseSensitive,
  sanitize = defaultSanitize,
  searchWords,
  textToHighlight,
}: {
  autoEscape?: boolean
  caseSensitive?: boolean
  sanitize?: typeof defaultSanitize
  searchWords: Array<string>
  textToHighlight: string
}): Array<any> => {
  textToHighlight = sanitize(textToHighlight)

  return searchWords
    .filter(searchWord => searchWord) // Remove empty words
    .reduce((chunks, searchWord) => {
      searchWord = sanitize(searchWord)

      if (autoEscape) {
        searchWord = escapeRegExpFn(searchWord)
      }

      const regex = new RegExp(searchWord, caseSensitive ? "g" : "gi")

      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      let match: RegExpExecArray | null = null
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      while ((match = regex.exec(textToHighlight))) {
        const start = match.index
        const end = regex.lastIndex
        // We do not return zero-length matches
        if (end > start) {
          // @ts-expect-error
          chunks.push({ highlight: false, start, end })
        }

        // Prevent browsers like Firefox from getting stuck in an infinite loop
        // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
        if (match.index === regex.lastIndex) {
          regex.lastIndex++
        }
      }

      return chunks
    }, [])
}
// Allow the findChunks to be overridden in findAll,
// but for backwards compatibility we export as the old name
export { defaultFindChunks as findChunks }

/**
 * Given a set of chunks to highlight, create an additional set of chunks
 * to represent the bits of text between the highlighted text.
 * @param chunksToHighlight {start:number, end:number}[]
 * @param totalLength number
 * @return {start:number, end:number, highlight:boolean}[]
 */
export const fillInChunks = ({
  chunksToHighlight,
  totalLength,
}: {
  chunksToHighlight: Array<any>
  totalLength: number
}): Array<any> => {
  const allChunks: Array<any> = []
  const append = (start, end, highlight) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight,
      })
    }
  }

  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false)
  } else {
    let lastIndex = 0
    for (const chunk of chunksToHighlight) {
      append(lastIndex, chunk.start, false)
      append(chunk.start, chunk.end, true)
      lastIndex = chunk.end
    }
    append(lastIndex, totalLength, false)
  }
  return allChunks
}

function defaultSanitize(string: string): string {
  return string
}

function escapeRegExpFn(string: string): string {
  return string.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
}
