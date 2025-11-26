import React from 'react'

export interface CodeMockupLineProps {
  children: React.ReactNode
  prefix?: string
  className?: string
}

const Line: React.FC<CodeMockupLineProps> = ({
  children,
  prefix = '$',
  className = '',
}) => {
  return (
    <pre data-prefix={prefix} className={className}>
      <code>{children}</code>
    </pre>
  )
}

export interface CodeMockupProps {
  children: React.ReactNode
  className?: string
}

export const CodeMockup: React.FC<CodeMockupProps> & { Line: typeof Line } = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mockup-code ${className}`}>
      {children}
    </div>
  )
}

CodeMockup.Line = Line
