import React from 'react'

export interface ProgressProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  type?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
}

export function Progress({ value, max = 100, type, className = '', ...rest }: ProgressProps) {
  const classes = [
    'progress',
    type && `progress-${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <progress className={classes} value={value} max={max} {...rest} />
}
