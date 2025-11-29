import React from 'react'

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tip: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  open?: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  tip,
  className = '',
  position = 'top',
  color,
  open = false,
  ...rest
}) => {
  const positionClasses = {
    top: 'tooltip-top',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
    right: 'tooltip-right',
  }

  const colorClasses = color
    ? {
        neutral: 'tooltip-neutral',
        primary: 'tooltip-primary',
        secondary: 'tooltip-secondary',
        accent: 'tooltip-accent',
        info: 'tooltip-info',
        success: 'tooltip-success',
        warning: 'tooltip-warning',
        error: 'tooltip-error',
      }[color]
    : undefined

  const classes = [
    'tooltip',
    positionClasses[position],
    colorClasses,
    open && 'tooltip-open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-tip={tip} data-state={open ? 'open' : 'closed'} {...rest}>
      {children}
    </div>
  )
}
