import React from 'react'

export interface JoinProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
}

export function Join({ children, direction = 'horizontal', className = '', ...rest }: JoinProps) {
  const classes = ['d-join', direction === 'vertical' && 'd-join-vertical', className].filter(Boolean).join(' ')

  // Automatically add join-item class to all children
  const childrenWithJoinItem = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const existingClassName = (child.props as any).className || ''
      const newClassName = existingClassName ? `d-join-item ${existingClassName}` : 'd-join-item'

      return React.cloneElement(child as React.ReactElement<any>, {
        className: newClassName,
      })
    }
    return child
  })

  return <div className={classes} {...rest}>{childrenWithJoinItem}</div>
}
