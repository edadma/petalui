import React from 'react'

export interface BrowserProps {
  children: React.ReactNode
  url?: string
  className?: string
  contentClassName?: string
}

export const Browser: React.FC<BrowserProps> = ({
  children,
  url = 'https://example.com',
  className = '',
  contentClassName = '',
}) => {
  return (
    <div className={`mockup-browser border border-base-300 ${className}`}>
      <div className="mockup-browser-toolbar">
        <div className="input">{url}</div>
      </div>
      <div className={`border-t border-base-300 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
