import { useState, useEffect, memo } from 'react'
import { Card, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// Singleton: load RichTextEditor component once, share across all instances
let cachedEditor: React.ComponentType<any> | null = null
let loadPromise: Promise<void> | null = null

const RichTextEditor = memo((props: any) => {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (cachedEditor) return

    if (!loadPromise) {
      loadPromise = import('@aster-ui/prefixed/editor').then(m => {
        cachedEditor = m.RichTextEditor
      })
    }

    loadPromise.then(() => forceUpdate(n => n + 1))
  }, [])

  if (!cachedEditor) {
    return <div style={{ minHeight: props.minHeight || 200 }} className="animate-pulse bg-base-300/50 rounded border border-base-300" />
  }

  const LoadedEditor = cachedEditor
  return <LoadedEditor {...props} />
})

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <RichTextEditor placeholder="Start writing..." />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [content, setContent] = useState('<p>Edit this text...</p>')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md" block>
        <RichTextEditor value={content} onChange={setContent} />
        <Card size="sm" className="bg-base-200">
          <p className="text-sm font-medium mb-2">HTML Output:</p>
          <code className="text-xs break-all">{content}</code>
        </Card>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function MinimalToolbarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <RichTextEditor
        placeholder="Simple formatting only..."
        toolbar={['bold', 'italic', 'underline', '|', 'link']}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function FullToolbarDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function NoToolbarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <RichTextEditor
        hideToolbar
        placeholder="Write without distractions..."
        minHeight={150}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md" block>
        <div>
          <p className="text-sm mb-1">Small</p>
          <RichTextEditor
            size="sm"
            placeholder="Small editor..."
            toolbar={['bold', 'italic', 'link']}
            minHeight={100}
          />
        </div>
        <div>
          <p className="text-sm mb-1">Medium (default)</p>
          <RichTextEditor
            size="md"
            placeholder="Medium editor..."
            toolbar={['bold', 'italic', 'link']}
            minHeight={100}
          />
        </div>
        <div>
          <p className="text-sm mb-1">Large</p>
          <RichTextEditor
            size="lg"
            placeholder="Large editor..."
            toolbar={['bold', 'italic', 'link']}
            minHeight={100}
          />
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function MaxHeightDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <RichTextEditor
        placeholder="This editor scrolls when content exceeds max height..."
        minHeight={100}
        maxHeight={200}
        value="<p>Try adding more content to see the scrolling behavior.</p><p>Keep typing...</p><p>More text here...</p><p>And more...</p><p>Even more content...</p><p>The editor will scroll!</p>"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function ReadOnlyDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <RichTextEditor
        readOnly
        hideToolbar
        value="<h2>Read-Only Content</h2><p>This content <strong>cannot be edited</strong>. It's useful for displaying formatted content without allowing modifications.</p><ul><li>Item one</li><li>Item two</li><li>Item three</li></ul>"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
export function BorderlessDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card>
        <RichTextEditor
          bordered={false}
          placeholder="Borderless editor inside a card..."
          minHeight={150}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { RichTextEditor } from 'asterui/editor'
// @example-imports: { useState } from 'react'
export function EditorInstanceDemo() {
  // @example-include
  const [wordCount, setWordCount] = useState(0)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm" block>
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
        <p className="text-sm text-base-content/60">Word count: {wordCount}</p>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
