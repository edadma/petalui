# CopyButton

A button component for copying text to the clipboard with visual feedback.

## Usage

```tsx
import { CopyButton } from 'asterui'

export const BasicCopy = () => (
  <CopyButton text="Hello, World!" showTooltip />
)
```

### With Text Content

```tsx
export const TextCopy = () => (
  <CopyButton text="npm install asterui" copiedChildren="Copied!">
    npm install asterui
  </CopyButton>
)
```

### Code Block Integration

The Code component has built-in `copyable` support:

```tsx
import { Code } from 'asterui'

export const CodeBlock = () => (
  <Code copyable>
    <Code.Line>npm install asterui</Code.Line>
    <Code.Line>pnpm add asterui</Code.Line>
  </Code>
)
```

### With Callbacks

```tsx
export const WithCallbacks = () => (
  <CopyButton
    text="Copy me"
    onCopy={() => console.log('Copied!')}
    onError={(err) => console.error('Failed:', err)}
  >
    Copy with feedback
  </CopyButton>
)
```

## Key Props

- `text`: string — The text to copy to clipboard (required).
- `timeout`: number — Duration in ms to show copied state (default `2000`).
- `color`: Color theme for the button.
- `variant`: `'solid'` | `'outline'` | `'ghost'` | `'soft'` | `'dash'` | `'link'`.
- `size`: `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`.
- `shape`: `'square'` | `'circle'`.
- `icon` / `copiedIcon`: Custom icons for default and copied states.
- `children` / `copiedChildren`: Custom content for default and copied states.
- `showTooltip`: boolean — Show tooltip with copy status.
- `tooltipText` / `copiedTooltipText`: Custom tooltip text.
- `onCopy`: Callback when copy succeeds.
- `onError`: Callback when copy fails.

## Tips

- Use `showTooltip` for icon-only buttons to provide clear feedback.
- The button automatically shows a success state (green) when copied.
- Use `variant="ghost"` and `size="sm"` for subtle copy buttons in code blocks.
- The `useClipboard` hook is available if you need more control over clipboard operations.
