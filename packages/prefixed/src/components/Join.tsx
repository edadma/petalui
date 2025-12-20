import React from 'react'

// DaisyUI classes
const dJoin = 'd-join'
const dJoinVertical = 'd-join-vertical'
const dJoinItem = 'd-join-item'

export interface JoinProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
}

export function Join({ children, direction = 'horizontal', className = '', ...rest }: JoinProps) {
  const classes = [dJoin, direction === 'vertical' && dJoinVertical, className].filter(Boolean).join(' ')

  // Automatically add join-item class to all children
  const childrenWithJoinItem = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const existingClassName = (child.props as any).className || ''
      const newClassName = existingClassName ? `${dJoinItem} ${existingClassName}` : dJoinItem

      return React.cloneElement(child as React.ReactElement<any>, {
        className: newClassName,
      })
    }
    return child
  })

  return <div className={classes} {...rest}>{childrenWithJoinItem}</div>
}
