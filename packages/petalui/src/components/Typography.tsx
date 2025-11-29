import React, { useState } from 'react'

export type TypographySize = 'sm' | 'base' | 'lg' | 'xl' | '2xl'
export type TitleLevel = 1 | 2 | 3 | 4 | 5

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: TypographySize
}

export interface TitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'> {
  level?: TitleLevel
  children: React.ReactNode
  copyable?: boolean
  ellipsis?: boolean
}

export interface ParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  ellipsis?: boolean | { rows?: number; expandable?: boolean; onExpand?: () => void }
  copyable?: boolean
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
  copyable?: boolean
}

export interface TypographyLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  external?: boolean
}

function CopyButton({ text }: { text: string }) {
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
      className="btn btn-ghost btn-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
      title="Copy to clipboard"
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

function TypographyRoot({ children, size = 'base', className = '', ...rest }: TypographyProps) {
  const sizeClasses = {
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

  return <div className={classes} {...rest}>{children}</div>
}

function Title({ level = 1, children, copyable, ellipsis, className = '', id, ...rest }: TitleProps) {
  const textContent = typeof children === 'string' ? children : ''
  const generatedId = id || (textContent ? textContent.toLowerCase().replace(/\s+/g, '-') : undefined)

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
      {copyable && <CopyButton text={textContent} />}
    </>
  )

  switch (level) {
    case 1:
      return <h1 id={generatedId} className={classes} {...rest}>{content}</h1>
    case 2:
      return <h2 id={generatedId} className={classes} {...rest}>{content}</h2>
    case 3:
      return <h3 id={generatedId} className={classes} {...rest}>{content}</h3>
    case 4:
      return <h4 id={generatedId} className={classes} {...rest}>{content}</h4>
    case 5:
      return <h5 id={generatedId} className={classes} {...rest}>{content}</h5>
    default:
      return <h1 id={generatedId} className={classes} {...rest}>{content}</h1>
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

function Paragraph({ children, ellipsis, copyable, className = '', ...rest }: ParagraphProps) {
  const [expanded, setExpanded] = useState(false)
  const textContent = typeof children === 'string' ? children : ''

  const isEllipsisObject = typeof ellipsis === 'object'
  const rows = isEllipsisObject ? ellipsis.rows || 3 : 3
  const expandable = isEllipsisObject ? ellipsis.expandable : false

  const clampedRows = Math.min(Math.max(rows, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6
  const ellipsisClass =
    ellipsis && !expanded ? lineClampClasses[clampedRows] : ''

  const classes = `group mb-4 ${ellipsisClass} ${className}`.trim()

  return (
    <div {...rest}>
      <p className={classes}>
        {children}
        {copyable && <CopyButton text={textContent} />}
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
  copyable,
  className = '',
  ...rest
}: TextProps) {
  const textContent = typeof children === 'string' ? children : ''

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

  const classes = `group inline ${typeClasses[type]} ${className}`.trim()

  return (
    <span className={classes} {...rest}>
      {content}
      {copyable && <CopyButton text={textContent} />}
    </span>
  )
}

function Link({ href, children, target, external, className = '', ...rest }: TypographyLinkProps) {
  const isExternal = external || href.startsWith('http')
  const linkTarget = target || (isExternal ? '_blank' : undefined)
  const rel = isExternal ? 'noopener noreferrer' : undefined

  return (
    <a
      href={href}
      target={linkTarget}
      rel={rel}
      className={`link link-primary ${className}`}
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
