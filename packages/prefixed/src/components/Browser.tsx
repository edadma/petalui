import React from 'react'

export interface BrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  url?: string
  contentClassName?: string
}

export const Browser: React.FC<BrowserProps> = ({
  children,
  url = 'https://example.com',
  className = '',
  contentClassName = '',
  ...rest
}) => {
  return (
    <div className={`d-mockup-browser border border-base-300 ${className}`} {...rest}>
      <div className="d-mockup-browser-toolbar">
        <div className="d-input">{url}</div>
      </div>
      <div className={`border-t border-base-300 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
