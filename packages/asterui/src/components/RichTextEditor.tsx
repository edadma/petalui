import React, { forwardRef, useCallback, useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

export type ToolbarItem =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'codeBlock'
  | 'horizontalRule'
  | 'link'
  | 'undo'
  | 'redo'
  | '|'

export interface RichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Initial HTML content */
  value?: string
  /** Callback when content changes */
  onChange?: (html: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Toolbar items to display */
  toolbar?: ToolbarItem[]
  /** Hide the toolbar */
  hideToolbar?: boolean
  /** Make editor read-only */
  readOnly?: boolean
  /** Auto focus on mount */
  autoFocus?: boolean
  /** Minimum height of the editor */
  minHeight?: string | number
  /** Maximum height of the editor (enables scrolling) */
  maxHeight?: string | number
  /** Editor size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show border around editor */
  bordered?: boolean
  /** Callback with editor instance */
  onEditorReady?: (editor: Editor) => void
  'data-testid'?: string
}

const defaultToolbar: ToolbarItem[] = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  '|',
  'heading1',
  'heading2',
  '|',
  'bulletList',
  'orderedList',
  'blockquote',
  '|',
  'link',
  'code',
  'codeBlock',
  '|',
  'undo',
  'redo',
]

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  disabled,
  title,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      btn btn-ghost btn-xs px-2 min-h-8 h-8
      ${isActive ? 'bg-base-300 text-base-content' : 'text-base-content/70'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-200'}
    `}
  >
    {children}
  </button>
)

const ToolbarDivider: React.FC = () => (
  <div className="w-px h-6 bg-base-300 mx-1" />
)

// Icons as simple SVG components
const icons = {
  bold: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
    </svg>
  ),
  italic: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m-2 0l-4 16m0 0h4" />
    </svg>
  ),
  underline: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v7a5 5 0 0010 0V4M5 20h14" />
    </svg>
  ),
  strikethrough: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10c0-3.87-3.13-6-7-6-3.87 0-6 2.13-6 5s2.13 4 6 4M4 12h16m-7 0c3.87 0 7 1.13 7 4s-2.13 5-6 5c-3.87 0-7-2.13-7-6" />
    </svg>
  ),
  code: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  heading1: <span className="font-bold text-sm">H1</span>,
  heading2: <span className="font-bold text-sm">H2</span>,
  heading3: <span className="font-bold text-sm">H3</span>,
  bulletList: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M8 6h12M4 12h.01M8 12h12M4 18h.01M8 18h12" />
    </svg>
  ),
  orderedList: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M8 6h12M4 12h.01M8 12h12M4 18h.01M8 18h12" />
      <text x="2" y="8" fontSize="6" fill="currentColor">1</text>
    </svg>
  ),
  blockquote: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
  ),
  codeBlock: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  horizontalRule: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
    </svg>
  ),
  link: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  undo: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4 4m-4-4l4-4" />
    </svg>
  ),
  redo: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2m15-7l-4 4m4-4l-4-4" />
    </svg>
  ),
}

const EditorToolbar: React.FC<{
  editor: Editor | null
  toolbar: ToolbarItem[]
}> = ({ editor, toolbar }) => {
  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  const renderToolbarItem = (item: ToolbarItem, index: number) => {
    if (item === '|') {
      return <ToolbarDivider key={`divider-${index}`} />
    }

    const toolbarActions: Record<
      Exclude<ToolbarItem, '|'>,
      { action: () => void; isActive: () => boolean; canExecute: () => boolean; title: string }
    > = {
      bold: {
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive('bold'),
        canExecute: () => editor.can().chain().focus().toggleBold().run(),
        title: 'Bold',
      },
      italic: {
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive('italic'),
        canExecute: () => editor.can().chain().focus().toggleItalic().run(),
        title: 'Italic',
      },
      underline: {
        action: () => editor.chain().focus().toggleUnderline().run(),
        isActive: () => editor.isActive('underline'),
        canExecute: () => editor.can().chain().focus().toggleUnderline().run(),
        title: 'Underline',
      },
      strikethrough: {
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive('strike'),
        canExecute: () => editor.can().chain().focus().toggleStrike().run(),
        title: 'Strikethrough',
      },
      code: {
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive('code'),
        canExecute: () => editor.can().chain().focus().toggleCode().run(),
        title: 'Inline Code',
      },
      heading1: {
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive('heading', { level: 1 }),
        canExecute: () => true,
        title: 'Heading 1',
      },
      heading2: {
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive('heading', { level: 2 }),
        canExecute: () => true,
        title: 'Heading 2',
      },
      heading3: {
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor.isActive('heading', { level: 3 }),
        canExecute: () => true,
        title: 'Heading 3',
      },
      bulletList: {
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive('bulletList'),
        canExecute: () => true,
        title: 'Bullet List',
      },
      orderedList: {
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive('orderedList'),
        canExecute: () => true,
        title: 'Numbered List',
      },
      blockquote: {
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive('blockquote'),
        canExecute: () => true,
        title: 'Blockquote',
      },
      codeBlock: {
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive('codeBlock'),
        canExecute: () => true,
        title: 'Code Block',
      },
      horizontalRule: {
        action: () => editor.chain().focus().setHorizontalRule().run(),
        isActive: () => false,
        canExecute: () => true,
        title: 'Horizontal Rule',
      },
      link: {
        action: setLink,
        isActive: () => editor.isActive('link'),
        canExecute: () => true,
        title: 'Add Link',
      },
      undo: {
        action: () => editor.chain().focus().undo().run(),
        isActive: () => false,
        canExecute: () => editor.can().chain().focus().undo().run(),
        title: 'Undo',
      },
      redo: {
        action: () => editor.chain().focus().redo().run(),
        isActive: () => false,
        canExecute: () => editor.can().chain().focus().redo().run(),
        title: 'Redo',
      },
    }

    const config = toolbarActions[item]
    return (
      <ToolbarButton
        key={item}
        onClick={config.action}
        isActive={config.isActive()}
        disabled={!config.canExecute()}
        title={config.title}
      >
        {icons[item]}
      </ToolbarButton>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-base-300 bg-base-200/50">
      {toolbar.map((item, index) => renderToolbarItem(item, index))}
    </div>
  )
}

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value = '',
      onChange,
      placeholder = 'Start typing...',
      toolbar = defaultToolbar,
      hideToolbar = false,
      readOnly = false,
      autoFocus = false,
      minHeight = 200,
      maxHeight,
      size = 'md',
      bordered = true,
      onEditorReady,
      className = '',
      'data-testid': testId = 'rich-text-editor',
      ...rest
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Underline,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'link link-primary',
          },
        }),
        Placeholder.configure({
          placeholder,
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      content: value,
      editable: !readOnly,
      autofocus: autoFocus,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
      editorProps: {
        attributes: {
          class: `prose prose-sm max-w-none focus:outline-none ${sizeClasses[size]}`,
        },
      },
    })

    useEffect(() => {
      if (editor && onEditorReady) {
        onEditorReady(editor)
      }
    }, [editor, onEditorReady])

    // Sync value prop changes
    useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value, false)
      }
    }, [value, editor])

    // Sync editable state
    useEffect(() => {
      if (editor) {
        editor.setEditable(!readOnly)
      }
    }, [readOnly, editor])

    const minHeightStyle = typeof minHeight === 'number' ? `${minHeight}px` : minHeight
    const maxHeightStyle = maxHeight
      ? typeof maxHeight === 'number'
        ? `${maxHeight}px`
        : maxHeight
      : undefined

    return (
      <div
        ref={ref}
        className={`
          bg-base-100 rounded-lg overflow-hidden
          ${bordered ? 'border border-base-300' : ''}
          ${className}
        `}
        data-testid={testId}
        {...rest}
      >
        {!hideToolbar && <EditorToolbar editor={editor} toolbar={toolbar} />}
        <div
          className={`
            p-4 overflow-y-auto
            ${maxHeightStyle ? 'overflow-y-auto' : ''}
          `}
          style={{
            minHeight: minHeightStyle,
            maxHeight: maxHeightStyle,
          }}
        >
          <EditorContent
            editor={editor}
            className={`
              [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-base-content/40
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
              [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mt-4 [&_.ProseMirror_h1]:mb-2
              [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-3 [&_.ProseMirror_h2]:mb-2
              [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mt-2 [&_.ProseMirror_h3]:mb-1
              [&_.ProseMirror_p]:my-2
              [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:my-2
              [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:my-2
              [&_.ProseMirror_li]:my-1
              [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-base-300
              [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-2
              [&_.ProseMirror_code]:bg-base-200 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5
              [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-sm
              [&_.ProseMirror_pre]:bg-base-200 [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded-lg
              [&_.ProseMirror_pre]:my-2 [&_.ProseMirror_pre]:overflow-x-auto
              [&_.ProseMirror_pre_code]:bg-transparent [&_.ProseMirror_pre_code]:p-0
              [&_.ProseMirror_hr]:border-base-300 [&_.ProseMirror_hr]:my-4
              [&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline
            `}
          />
        </div>
      </div>
    )
  }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
