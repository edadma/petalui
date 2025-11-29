import React from 'react'

export interface CodeMockupLineProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
  prefix?: string
}

const Line: React.FC<CodeMockupLineProps> = ({
  children,
  prefix = '$',
  className = '',
  ...rest
}) => {
  return (
    <pre data-prefix={prefix} className={className} {...rest}>
      <code>{children}</code>
    </pre>
  )
}

export interface CodeMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CodeMockup: React.FC<CodeMockupProps> & { Line: typeof Line } = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div className={`mockup-code ${className}`} {...rest}>
      {children}
    </div>
  )
}

CodeMockup.Line = Line
