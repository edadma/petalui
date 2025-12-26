import React, { useState } from 'react'

// DaisyUI classes
const dBtn = 'btn'
const dBtnGhost = 'btn-ghost'
const dBtnXs = 'btn-xs'
const dLink = 'link'
const dLinkPrimary = 'link-primary'

export type TypographySize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
export type TitleLevel = 1 | 2 | 3 | 4 | 5

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: TypographySize
  'data-testid'?: string
}

export interface TitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'> {
  level?: TitleLevel
  children: React.ReactNode
  copyable?: boolean
  ellipsis?: boolean
  'data-testid'?: string
}

export interface ParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  ellipsis?: boolean | { rows?: number; expandable?: boolean; onExpand?: () => void }
  copyable?: boolean
  size?: TypographySize
  align?: 'left' | 'center' | 'right'
  'data-testid'?: string
}

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  code?: boolean
  mark?: boolean
  strong?: boolean
  italic?: boolean
  underline?: boolean
  delete?: boolean
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'error'
  size?: TypographySize
  copyable?: boolean
  'data-testid'?: string
}

export interface TypographyLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  children: React.ReactNode
  external?: boolean
  size?: TypographySize
  'data-testid'?: string
}

function CopyButton({ text, 'data-testid': testId }: { text: string; 'data-testid'?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`${dBtn} ${dBtnGhost} ${dBtnXs} ml-2 opacity-0 group-hover:opacity-100 transition-opacity`}
      title="Copy to clipboard"
      data-testid={testId}
    >
      {copied ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      )}
    </button>
  )
}

function TypographyRoot({ children, size = 'base', className = '', 'data-testid': testId, ...rest }: TypographyProps) {
  const sizeClasses = {
    xs: 'prose-xs text-xs',
    sm: 'prose-sm text-sm',
    base: 'prose-base text-base',
    lg: 'prose-lg text-lg',
    xl: 'prose-xl text-xl',
    '2xl': 'prose-2xl text-2xl',
  }

  const classes = [
    // Prose classes (only apply if @tailwindcss/typography is installed)
    'prose dark:prose-invert max-w-none',
    // Fallback styles (always apply)
    'text-base-content leading-relaxed',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} data-testid={testId} {...rest}>{children}</div>
}

function Title({ level = 1, children, copyable, ellipsis, className = '', id, 'data-testid': testId, ...rest }: TitleProps) {
  const textContent = typeof children === 'string' ? children : ''
  const generatedId = id || (textContent ? textContent.toLowerCase().replace(/\s+/g, '-') : undefined)
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

  const levelClasses = {
    1: 'text-4xl font-bold mb-4',
    2: 'text-3xl font-bold mb-3',
    3: 'text-2xl font-semibold mb-3',
    4: 'text-xl font-semibold mb-2',
    5: 'text-lg font-semibold mb-2',
  }

  const ellipsisClass = ellipsis ? 'truncate' : ''
  const classes = `group ${levelClasses[level]} ${ellipsisClass} ${className}`.trim()

  const content = (
    <>
      {children}
      {copyable && <CopyButton text={textContent} data-testid={getTestId('copy')} />}
    </>
  )

  switch (level) {
    case 1:
      return <h1 id={generatedId} className={classes} data-testid={testId} {...rest}>{content}</h1>
    case 2:
      return <h2 id={generatedId} className={classes} data-testid={testId} {...rest}>{content}</h2>
    case 3:
      return <h3 id={generatedId} className={classes} data-testid={testId} {...rest}>{content}</h3>
    case 4:
      return <h4 id={generatedId} className={classes} data-testid={testId} {...rest}>{content}</h4>
    case 5:
      return <h5 id={generatedId} className={classes} data-testid={testId} {...rest}>{content}</h5>
    default:
      return <h1 id={generatedId} className={classes} data-testid={testId} {...rest}>{content}</h1>
  }
}

const lineClampClasses = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
} as const

function Paragraph({ children, ellipsis, copyable, size, align, className = '', 'data-testid': testId, ...rest }: ParagraphProps) {
  const [expanded, setExpanded] = useState(false)
  const textContent = typeof children === 'string' ? children : ''
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

  const isEllipsisObject = typeof ellipsis === 'object'
  const rows = isEllipsisObject ? ellipsis.rows || 3 : 3
  const expandable = isEllipsisObject ? ellipsis.expandable : false

  const clampedRows = Math.min(Math.max(rows, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6
  const ellipsisClass =
    ellipsis && !expanded ? lineClampClasses[clampedRows] : ''

  const classes = [
    'group',
    'mb-4',
    ellipsisClass,
    size === 'sm' && 'text-sm',
    size === 'base' && 'text-base',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    size === '2xl' && 'text-2xl',
    align === 'left' && 'text-left',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div data-testid={testId} {...rest}>
      <p className={classes} data-testid={getTestId('text')}>
        {children}
        {copyable && <CopyButton text={textContent} data-testid={getTestId('copy')} />}
      </p>
      {expandable && ellipsis && (
        <button
          onClick={() => {
            setExpanded(!expanded)
            if (isEllipsisObject && ellipsis.onExpand) {
              ellipsis.onExpand()
            }
          }}
          className="text-primary text-sm hover:underline"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

function Text({
  children,
  code,
  mark,
  strong,
  italic,
  underline,
  delete: del,
  type = 'default',
  size,
  copyable,
  className = '',
  'data-testid': testId,
  ...rest
}: TextProps) {
  const textContent = typeof children === 'string' ? children : ''
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)

  const typeClasses = {
    default: '',
    secondary: 'text-base-content/70',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  }

  let content = children

  if (code) {
    content = (
      <code className="px-1.5 py-0.5 bg-base-200 rounded text-sm font-mono">{content}</code>
    )
  }

  if (mark) {
    content = <mark className="bg-warning/30 px-1">{content}</mark>
  }

  if (strong) {
    content = <strong className="font-bold">{content}</strong>
  }

  if (italic) {
    content = <em className="italic">{content}</em>
  }

  if (underline) {
    content = <u className="underline">{content}</u>
  }

  if (del) {
    content = <del className="line-through opacity-70">{content}</del>
  }

  const classes = [
    'group',
    'inline',
    typeClasses[type],
    size === 'xs' && 'text-xs',
    size === 'sm' && 'text-sm',
    size === 'base' && 'text-base',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    size === '2xl' && 'text-2xl',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} data-testid={testId} {...rest}>
      {content}
      {copyable && <CopyButton text={textContent} data-testid={getTestId('copy')} />}
    </span>
  )
}

function Link({ href = '#', children, target, external, size, className = '', 'data-testid': testId, ...rest }: TypographyLinkProps) {
  const isExternal = external || (href && href.startsWith('http'))
  const linkTarget = target || (isExternal ? '_blank' : undefined)
  const rel = isExternal ? 'noopener noreferrer' : undefined

  const classes = [
    dLink,
    dLinkPrimary,
    size === 'sm' && 'text-sm',
    size === 'base' && 'text-base',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    size === '2xl' && 'text-2xl',
    className,
  ].filter(Boolean).join(' ')

  return (
    <a
      href={href}
      target={linkTarget}
      rel={rel}
      className={classes}
      data-testid={testId}
      {...rest}
    >
      {children}
      {isExternal && (
        <svg className="w-3 h-3 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      )}
    </a>
  )
}

export const Typography = Object.assign(TypographyRoot, {
  Title,
  Paragraph,
  Text,
  Link,
})

export default Typography
