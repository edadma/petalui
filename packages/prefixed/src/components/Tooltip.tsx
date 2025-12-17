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
    top: 'd-tooltip-top',
    bottom: 'd-tooltip-bottom',
    left: 'd-tooltip-left',
    right: 'd-tooltip-right',
  }

  const colorClasses = color
    ? {
        neutral: 'tooltip-neutral',
        primary: 'd-tooltip-primary',
        secondary: 'd-tooltip-secondary',
        accent: 'd-tooltip-accent',
        info: 'd-tooltip-info',
        success: 'd-tooltip-success',
        warning: 'd-tooltip-warning',
        error: 'd-tooltip-error',
      }[color]
    : undefined

  const classes = [
    'd-tooltip',
    positionClasses[position],
    colorClasses,
    open && 'd-tooltip-open',
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
