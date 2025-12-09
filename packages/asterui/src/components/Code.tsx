import React from 'react'
import { CopyButton } from './CopyButton'

export interface CodeLineProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
  prefix?: string
  highlight?: boolean
}

const Line: React.FC<CodeLineProps> = ({
  children,
  prefix = '$',
  highlight = false,
  className = '',
  ...rest
}) => {
  return (
    <pre
      data-prefix={prefix}
      className={`${highlight ? 'bg-warning text-warning-content' : ''} ${className}`}
      {...rest}
    >
      <code>{children}</code>
    </pre>
  )
}

export interface CodeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Show copy button. Pass true to auto-extract text, or a string to specify custom copy text */
  copyable?: boolean | string
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  const lines: string[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props?.children) {
      const text = typeof child.props.children === 'string'
        ? child.props.children
        : ''
      if (text) lines.push(text)
    }
  })
  return lines.join('\n')
}

export const Code: React.FC<CodeProps> & { Line: typeof Line } = ({
  children,
  className = '',
  copyable,
  style,
  ...rest
}) => {
  const copyText = typeof copyable === 'string'
    ? copyable
    : copyable
      ? extractTextFromChildren(children)
      : null

  return (
    <div
      className={`mockup-code ${className}`}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      {...rest}
    >
      {children}
      {copyText !== null && (
        <div style={{ position: 'absolute', top: 8, right: 8 }}>
          <CopyButton
            text={copyText}
            size="xs"
            variant="ghost"
            showTooltip
          />
        </div>
      )}
    </div>
  )
}

Code.Line = Line
