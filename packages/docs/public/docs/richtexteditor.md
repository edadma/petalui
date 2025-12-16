# RichTextEditor

**Import:** `import { RichTextEditor } from 'asterui/editor'`

**Note:** This component requires additional dependencies:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-underline
```

## Examples

### Basic Editor

Simple rich text editor with default toolbar.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <RichTextEditor placeholder="Start writing..." />
)

export default App
```

### Controlled Editor

Editor with controlled value and onChange handler.

```tsx
import React, { useState } from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => {
  const [content, setContent] = useState('<p>Edit this text...</p>')

  return (
    <div>
      <RichTextEditor value={content} onChange={setContent} />
      <p>HTML Output: {content}</p>
    </div>
  )
}

export default App
```

### Minimal Toolbar

Editor with only basic formatting options.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <RichTextEditor
    placeholder="Simple formatting only..."
    toolbar={['bold', 'italic', 'underline', '|', 'link']}
  />
)

export default App
```

### Full Toolbar

Editor with all available toolbar options.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <RichTextEditor
    placeholder="All formatting options..."
    toolbar={[
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'heading1',
      'heading2',
      'heading3',
      '|',
      'bulletList',
      'orderedList',
      'blockquote',
      '|',
      'code',
      'codeBlock',
      'horizontalRule',
      '|',
      'link',
      '|',
      'undo',
      'redo',
    ]}
  />
)

export default App
```

### No Toolbar

Distraction-free writing without toolbar.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <RichTextEditor
    hideToolbar
    placeholder="Write without distractions..."
    minHeight={150}
  />
)

export default App
```

### Different Sizes

Text size variants for the editor.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <div className="space-y-4">
    <RichTextEditor size="sm" placeholder="Small editor..." minHeight={100} />
    <RichTextEditor size="md" placeholder="Medium editor..." minHeight={100} />
    <RichTextEditor size="lg" placeholder="Large editor..." minHeight={100} />
  </div>
)

export default App
```

### Max Height with Scrolling

Editor with fixed max height that scrolls when content exceeds it.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <RichTextEditor
    placeholder="This editor scrolls when content exceeds max height..."
    minHeight={100}
    maxHeight={200}
  />
)

export default App
```

### Read-Only Mode

Display formatted content without allowing edits.

```tsx
import React from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <RichTextEditor
    readOnly
    hideToolbar
    value="<h2>Read-Only Content</h2><p>This content <strong>cannot be edited</strong>.</p>"
  />
)

export default App
```

### Borderless Inside Card

Editor without border, useful when placed inside a Card.

```tsx
import React from 'react'
import { Card } from 'asterui'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => (
  <Card>
    <RichTextEditor
      bordered={false}
      placeholder="Borderless editor inside a card..."
      minHeight={150}
    />
  </Card>
)

export default App
```

### Editor Instance Access

Access the Tiptap editor instance for advanced features like word count.

```tsx
import React, { useState } from 'react'
import { RichTextEditor } from 'asterui/editor'

const App: React.FC = () => {
  const [wordCount, setWordCount] = useState(0)

  return (
    <div>
      <RichTextEditor
        placeholder="Start typing to see word count..."
        onEditorReady={(editor) => {
          editor.on('update', () => {
            const text = editor.getText()
            const words = text.trim().split(/\s+/).filter(Boolean).length
            setWordCount(words)
          })
        }}
      />
      <p>Word count: {wordCount}</p>
    </div>
  )
}

export default App
```

## API

### RichTextEditor

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | HTML content (controlled) | `string` | `''` |
| `onChange` | Callback when content changes | `(html: string) => void` | `-` |
| `placeholder` | Placeholder text | `string` | `'Start typing...'` |
| `toolbar` | Toolbar items to display | `ToolbarItem[]` | `[default set]` |
| `hideToolbar` | Hide the toolbar | `boolean` | `false` |
| `readOnly` | Make editor read-only | `boolean` | `false` |
| `autoFocus` | Auto focus on mount | `boolean` | `false` |
| `minHeight` | Minimum height of editor | `string \| number` | `200` |
| `maxHeight` | Maximum height (enables scrolling) | `string \| number` | `-` |
| `size` | Text size variant | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `bordered` | Show border around editor | `boolean` | `true` |
| `onEditorReady` | Callback with Tiptap editor instance | `(editor: Editor) => void` | `-` |
| `data-testid` | Test ID for the component | `string` | `'rich-text-editor'` |
| `className` | Additional CSS classes | `string` | `-` |

### ToolbarItem

Available toolbar items:

| Item | Description |
|------|-------------|
| `bold` | Bold text |
| `italic` | Italic text |
| `underline` | Underlined text |
| `strikethrough` | Strikethrough text |
| `code` | Inline code |
| `heading1` | Heading level 1 |
| `heading2` | Heading level 2 |
| `heading3` | Heading level 3 |
| `bulletList` | Unordered list |
| `orderedList` | Ordered list |
| `blockquote` | Blockquote |
| `codeBlock` | Code block |
| `horizontalRule` | Horizontal line |
| `link` | Insert/edit link |
| `undo` | Undo last change |
| `redo` | Redo last change |
| `\|` | Toolbar divider |

## Accessibility

The RichTextEditor uses semantic HTML elements and supports:

- Keyboard navigation within the editor
- Proper focus management
- Screen reader compatible toolbar buttons with titles

## Testing

The component exposes `data-testid` attributes for testing:

| Element | Test ID |
|---------|---------|
| Root | `rich-text-editor` (or custom) |

Pass a custom `data-testid` prop to use a different ID:

```tsx
<RichTextEditor data-testid="post-editor" />
```
