import React, { forwardRef, useCallback, useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dBtn = 'btn'
const dBtnGhost = 'btn-ghost'
const dBtnXs = 'btn-xs'
const dLink = 'link'
const dLinkPrimary = 'link-primary'

// Inline toolbar icons (from Heroicons outline)
const iconProps = (size: number) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  viewBox: '0 0 24 24',
  strokeWidth: 1.5,
  stroke: 'currentColor',
  width: size,
  height: size,
  'aria-hidden': true as const,
})

const BoldIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinejoin="round" d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
  </svg>
)

const ItalicIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
  </svg>
)

const UnderlineIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5" />
  </svg>
)

const StrikethroughIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5" />
  </svg>
)

const CodeBracketIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>
)

const H1Icon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25" />
  </svg>
)

const H2Icon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501" />
  </svg>
)

const H3Icon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501" />
  </svg>
)

const ListBulletIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
)

const NumberedListIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
  </svg>
)

const Bars3BottomLeftIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
)

const CommandLineIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
  </svg>
)

const MinusIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
)

const LinkIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
)

const ArrowUturnLeftIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>
)

const ArrowUturnRightIcon = ({ size }: { size: number }) => (
  <svg {...iconProps(size)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
  </svg>
)

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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
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
      ${dBtn} ${dBtnGhost} ${dBtnXs} px-2 min-h-8 h-8
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

// Map editor size to icon pixel size
const editorSizeToIconSize: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
}

const EditorToolbar: React.FC<{
  editor: Editor | null
  toolbar: ToolbarItem[]
  editorSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
      return <ToolbarDivider key={`divider-${index}`} />
    }

    const toolbarActions: Record<
      Exclude<ToolbarItem, '|'>,
      { icon: React.FC<{ size: number }>; action: () => void; isActive: () => boolean; canExecute: () => boolean; title: string }
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
        <Icon size={iconSize} />
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
      size,
      bordered = true,
      onEditorReady,
      className = '',
      'data-testid': testId = 'rich-text-editor',
      ...rest
    },
    ref
  ) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

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
            class: `${dLink} ${dLinkPrimary}`,
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
          class: `prose prose-sm max-w-none focus:outline-none ${sizeClasses[effectiveSize]}`,
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
        {!hideToolbar && <EditorToolbar editor={editor} toolbar={toolbar} editorSize={effectiveSize} />}
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
