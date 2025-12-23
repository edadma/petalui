import React, { useId } from 'react'

// DaisyUI classes
const dTooltip = 'd-tooltip'
const dTooltipTop = 'd-tooltip-top'
const dTooltipBottom = 'd-tooltip-bottom'
const dTooltipLeft = 'd-tooltip-left'
const dTooltipRight = 'd-tooltip-right'
const dTooltipNeutral = 'd-tooltip-neutral'
const dTooltipPrimary = 'd-tooltip-primary'
const dTooltipSecondary = 'd-tooltip-secondary'
const dTooltipAccent = 'd-tooltip-accent'
const dTooltipInfo = 'd-tooltip-info'
const dTooltipSuccess = 'd-tooltip-success'
const dTooltipWarning = 'd-tooltip-warning'
const dTooltipError = 'd-tooltip-error'
const dTooltipOpen = 'd-tooltip-open'

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
