import React from 'react'

// DaisyUI classes
const dMockupBrowser = 'd-mockup-browser'
const dMockupBrowserToolbar = 'd-mockup-browser-toolbar'

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
    <div className={`${dMockupBrowser} border border-base-300 ${className}`} {...rest}>
      <div className={dMockupBrowserToolbar}>
        <div className="input">{url}</div>
      </div>
      <div className={`border-t border-base-300 ${contentClassName}`}>
        {children}
      </div>
    </div>
  )
}
