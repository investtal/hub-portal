# Highlighter Component

A React component for highlighting search terms within text.

## Features

- ✅ Highlight multiple search terms
- ✅ Case-sensitive and case-insensitive matching
- ✅ Support for regex patterns
- ✅ Custom styling for highlighted and unhighlighted text
- ✅ Active highlight support
- ✅ Auto-escape special characters
- ✅ Custom sanitization functions
- ✅ Custom highlight and unhighlight tags
- ✅ TypeScript support

## Usage

```tsx
import { Highlighter } from '@investtal/toolkit/react'

function SearchResults() {
  return (
    <Highlighter
      searchWords={['search', 'term']}
      textToHighlight="This is the text to search within"
      highlightClassName="bg-yellow-200"
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchWords` | `Array<string>` | Required | Array of search terms to highlight |
| `textToHighlight` | `string` | Required | The text content to search within |
| `highlightClassName` | `string \| object` | `""` | CSS class name(s) for highlighted text |
| `unhighlightClassName` | `string` | `""` | CSS class name for unhighlighted text |
| `highlightStyle` | `object` | `{}` | Inline styles for highlighted text |
| `unhighlightStyle` | `object` | `undefined` | Inline styles for unhighlighted text |
| `highlightTag` | `string \| React.ComponentType` | `"mark"` | HTML tag or React component for highlights |
| `unhighlightTag` | `string \| React.ComponentType` | `"span"` | HTML tag or React component for unhighlighted text |
| `activeIndex` | `number` | `-1` | Index of the match to apply active styling |
| `activeClassName` | `string` | `""` | CSS class for the active match |
| `activeStyle` | `object` | `undefined` | Inline styles for the active match |
| `caseSensitive` | `boolean` | `false` | Whether to perform case-sensitive matching |
| `autoEscape` | `boolean` | `undefined` | Whether to escape regex special characters |
| `sanitize` | `function` | `undefined` | Function to sanitize text before matching |
| `findChunks` | `function` | `undefined` | Custom function for finding matches |
| `className` | `string` | `undefined` | CSS class for the wrapper element |

## Examples

### Basic Usage

```tsx
<Highlighter
  searchWords={['react', 'typescript']}
  textToHighlight="Building React applications with TypeScript is awesome!"
  highlightClassName="bg-yellow-200 font-bold"
/>
```

### Case-sensitive Search

```tsx
<Highlighter
  searchWords={['React']}
  textToHighlight="react vs React - case matters!"
  caseSensitive={true}
  highlightClassName="bg-blue-200"
/>
```

### Active Highlight

```tsx
<Highlighter
  searchWords={['search']}
  textToHighlight="First search term and second search term"
  activeIndex={1}
  activeClassName="bg-red-500 text-white"
  highlightClassName="bg-yellow-200"
/>
```

### Custom Sanitization

```tsx
const removeAccents = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

<Highlighter
  searchWords={['cafe']}
  textToHighlight="I love café and naïve"
  sanitize={removeAccents}
  highlightClassName="bg-green-200"
/>
```

### Regex Support

```tsx
<Highlighter
  searchWords={[/\d{3}-\d{3}-\d{4}/]} // Phone number pattern
  textToHighlight="Call me at 123-456-7890 or 987-654-3210"
  highlightClassName="bg-purple-200"
/>
```

### Object-based Class Names

```tsx
<Highlighter
  searchWords={['error', 'warning', 'info']}
  textToHighlight="This is an error, this is a warning, and this is info"
  highlightClassName={{
    error: 'bg-red-200 text-red-800',
    warning: 'bg-yellow-200 text-yellow-800',
    info: 'bg-blue-200 text-blue-800'
  }}
/>
```

### Custom Components

```tsx
const CustomHighlight = ({ children, highlightIndex, ...props }) => (
  <mark
    {...props}
    className="custom-highlight"
    data-index={highlightIndex}
  >
    {children}
  </mark>
)

<Highlighter
  searchWords={['custom']}
  textToHighlight="This uses a custom highlight component"
  highlightTag={CustomHighlight}
/>
```

## API Reference

### Core Algorithm

The highlighter uses the following process:

1. **Sanitization**: Apply sanitize function to both search terms and text
2. **Chunk Finding**: Locate all matches using regex or custom findChunks
3. **Chunk Combination**: Merge overlapping matches
4. **Chunk Filling**: Create chunks for non-highlighted text
5. **Rendering**: Generate React elements for each chunk

### Dependencies

- `react` - For component rendering
- `./highlight-words-core` - Core highlighting algorithm
- `./memoize-core` - Performance optimization
