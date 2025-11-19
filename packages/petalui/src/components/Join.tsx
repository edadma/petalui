import React from 'react'

export interface JoinProps {
  children: React.ReactNode
  vertical?: boolean
  className?: string
}

export function Join({ children, vertical = false, className = '' }: JoinProps) {
  const classes = ['join', vertical && 'join-vertical', className].filter(Boolean).join(' ')

  // Automatically add join-item class to all children
  const childrenWithJoinItem = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const existingClassName = (child.props as any).className || ''
      const newClassName = existingClassName ? `join-item ${existingClassName}` : 'join-item'

      return React.cloneElement(child as React.ReactElement<any>, {
        className: newClassName,
      })
    }
    return child
  })

  return <div className={classes}>{childrenWithJoinItem}</div>
}
