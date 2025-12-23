import React, { useId } from 'react'

// DaisyUI classes
const dTooltip = 'tooltip'
const dTooltipTop = 'tooltip-top'
const dTooltipBottom = 'tooltip-bottom'
const dTooltipLeft = 'tooltip-left'
const dTooltipRight = 'tooltip-right'
const dTooltipNeutral = 'tooltip-neutral'
const dTooltipPrimary = 'tooltip-primary'
const dTooltipSecondary = 'tooltip-secondary'
const dTooltipAccent = 'tooltip-accent'
const dTooltipInfo = 'tooltip-info'
const dTooltipSuccess = 'tooltip-success'
const dTooltipWarning = 'tooltip-warning'
const dTooltipError = 'tooltip-error'
const dTooltipOpen = 'tooltip-open'

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tip: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  open?: boolean
  /** Test ID for testing */
  'data-testid'?: string
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
  const tooltipId = useId()

  const positionClasses = {
    top: dTooltipTop,
    bottom: dTooltipBottom,
    left: dTooltipLeft,
    right: dTooltipRight,
  }

  const colorClasses = color
    ? {
        neutral: dTooltipNeutral,
        primary: dTooltipPrimary,
        secondary: dTooltipSecondary,
        accent: dTooltipAccent,
        info: dTooltipInfo,
        success: dTooltipSuccess,
        warning: dTooltipWarning,
        error: dTooltipError,
      }[color]
    : undefined

  const classes = [
    dTooltip,
    positionClasses[position],
    colorClasses,
    open && dTooltipOpen,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Clone children to add aria-describedby
  const childWithAria = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<{ 'aria-describedby'?: string }>, {
        'aria-describedby': tooltipId,
      })
    : children

  return (
    <div className={classes} data-tip={tip} data-state={open ? 'open' : 'closed'} {...rest}>
      {childWithAria}
      {/* Screen reader accessible tooltip text */}
      <span id={tooltipId} role="tooltip" className="sr-only">
        {tip}
      </span>
    </div>
  )
}
