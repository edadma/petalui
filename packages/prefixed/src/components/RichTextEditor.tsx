import React, { forwardRef, useCallback, useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeBracketIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  ListBulletIcon,
  NumberedListIcon,
  LinkIcon,
  MinusIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  CommandLineIcon,
  Bars3BottomLeftIcon,
} from '@aster-ui/icons/outline'
import { IconSizeContext, type IconSize } from '../contexts/IconSizeContext'

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
      d-btn d-btn-ghost d-btn-xs px-2 min-h-8 h-8
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

// Map editor size to icon size
const editorSizeToIconSize: Record<'sm' | 'md' | 'lg', IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}

const EditorToolbar: React.FC<{
  editor: Editor | null
  toolbar: ToolbarItem[]
  editorSize: 'sm' | 'md' | 'lg'
}> = ({ editor, toolbar, editorSize }) => {
  const iconSize = editorSizeToIconSize[editorSize]
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
      return <ToolbarDivider key={`d-divider-${index}`} />
    }

    const toolbarActions: Record<
      Exclude<ToolbarItem, '|'>,
      { icon: React.FC; action: () => void; isActive: () => boolean; canExecute: () => boolean; title: string }
    > = {
      bold: {
        icon: BoldIcon,
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive('bold'),
        canExecute: () => editor.can().chain().focus().toggleBold().run(),
        title: 'Bold',
      },
      italic: {
        icon: ItalicIcon,
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive('italic'),
        canExecute: () => editor.can().chain().focus().toggleItalic().run(),
        title: 'Italic',
      },
      underline: {
        icon: UnderlineIcon,
        action: () => editor.chain().focus().toggleUnderline().run(),
        isActive: () => editor.isActive('underline'),
        canExecute: () => editor.can().chain().focus().toggleUnderline().run(),
        title: 'Underline',
      },
      strikethrough: {
        icon: StrikethroughIcon,
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive('strike'),
        canExecute: () => editor.can().chain().focus().toggleStrike().run(),
        title: 'Strikethrough',
      },
      code: {
        icon: CodeBracketIcon,
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive('code'),
        canExecute: () => editor.can().chain().focus().toggleCode().run(),
        title: 'Inline Code',
      },
      heading1: {
        icon: H1Icon,
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive('heading', { level: 1 }),
        canExecute: () => true,
        title: 'Heading 1',
      },
      heading2: {
        icon: H2Icon,
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive('heading', { level: 2 }),
        canExecute: () => true,
        title: 'Heading 2',
      },
      heading3: {
        icon: H3Icon,
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor.isActive('heading', { level: 3 }),
        canExecute: () => true,
        title: 'Heading 3',
      },
      bulletList: {
        icon: ListBulletIcon,
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive('bulletList'),
        canExecute: () => true,
        title: 'Bullet List',
      },
      orderedList: {
        icon: NumberedListIcon,
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive('orderedList'),
        canExecute: () => true,
        title: 'Numbered List',
      },
      blockquote: {
        icon: Bars3BottomLeftIcon,
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive('blockquote'),
        canExecute: () => true,
        title: 'Blockquote',
      },
      codeBlock: {
        icon: CommandLineIcon,
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive('codeBlock'),
        canExecute: () => true,
        title: 'Code Block',
      },
      horizontalRule: {
        icon: MinusIcon,
        action: () => editor.chain().focus().setHorizontalRule().run(),
        isActive: () => false,
        canExecute: () => true,
        title: 'Horizontal Rule',
      },
      link: {
        icon: LinkIcon,
        action: setLink,
        isActive: () => editor.isActive('link'),
        canExecute: () => true,
        title: 'Add Link',
      },
      undo: {
        icon: ArrowUturnLeftIcon,
        action: () => editor.chain().focus().undo().run(),
        isActive: () => false,
        canExecute: () => editor.can().chain().focus().undo().run(),
        title: 'Undo',
      },
      redo: {
        icon: ArrowUturnRightIcon,
        action: () => editor.chain().focus().redo().run(),
        isActive: () => false,
        canExecute: () => editor.can().chain().focus().redo().run(),
        title: 'Redo',
      },
    }

    const { icon: Icon, ...config } = toolbarActions[item]
    return (
      <ToolbarButton
        key={item}
        onClick={config.action}
        isActive={config.isActive()}
        disabled={!config.canExecute()}
        title={config.title}
      >
        <Icon />
      </ToolbarButton>
    )
  }

  return (
    <IconSizeContext.Provider value={iconSize}>
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-base-300 bg-base-200/50">
        {toolbar.map((item, index) => renderToolbarItem(item, index))}
      </div>
    </IconSizeContext.Provider>
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
            class: 'd-link d-link-primary',
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
        {!hideToolbar && <EditorToolbar editor={editor} toolbar={toolbar} editorSize={size} />}
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
