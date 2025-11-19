import React from 'react'

export interface JoinProps {
  children: React.ReactNode
  vertical?: boolean
  className?: string
}

export interface JoinItemProps {
  children: React.ReactNode
  className?: string
}

function JoinRoot({ children, vertical = false, className = '' }: JoinProps) {
  const classes = ['join', vertical && 'join-vertical', className].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}

function JoinItem({ children, className = '' }: JoinItemProps) {
  return <div className={`join-item ${className}`}>{children}</div>
}

export const Join = Object.assign(JoinRoot, {
  Item: JoinItem,
})
