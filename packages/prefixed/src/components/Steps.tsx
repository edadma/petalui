import React from 'react'

export type StepsDirection = 'horizontal' | 'vertical'

export interface StepItem {
  key?: string
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  disabled?: boolean
}

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange'> {
  /** Step items (compound pattern) */
  children?: React.ReactNode
  /** Step items (data-driven pattern) */
  items?: StepItem[]
  /** Current step index (0-based) */
  current?: number
  /** Layout direction */
  direction?: StepsDirection
  /** @deprecated Use direction="vertical" instead */
  vertical?: boolean
  /** Callback when step is clicked */
  onChange?: (current: number) => void
}

export interface StepProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'color' | 'title'> {
  /** Step title/label */
  children?: React.ReactNode
  /** Step title (alternative to children) */
  title?: React.ReactNode
  /** Step description */
  description?: React.ReactNode
  /** Step icon */
  icon?: React.ReactNode
  /** Step color */
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** Custom content for step indicator */
  dataContent?: string
  /** Whether step is disabled */
  disabled?: boolean
  /** Internal: step index */
  _index?: number
  /** Internal: whether step is clickable */
  _clickable?: boolean
  /** Internal: click handler */
  _onClick?: (index: number) => void
}

const colorClasses: Record<string, string> = {
  neutral: 'd-step-neutral',
  primary: 'd-step-primary',
  secondary: 'd-step-secondary',
  accent: 'd-step-accent',
  info: 'd-step-info',
  success: 'd-step-success',
  warning: 'd-step-warning',
  error: 'd-step-error',
}

function StepsRoot({
  children,
  items,
  current,
  direction,
  vertical = false,
  onChange,
  className = '',
  ...rest
}: StepsProps) {
  const isVertical = direction === 'vertical' || vertical

  const classes = ['d-steps', isVertical && 'd-steps-vertical', className]
    .filter(Boolean)
    .join(' ')

  // Render data-driven items if provided
  if (items && items.length > 0) {
    return (
      <ul className={classes} {...rest}>
        {items.map((item, index) => {
          const isCompleted = current !== undefined && index < current
          const isCurrent = current !== undefined && index === current
          const stepColor = item.color || ((isCompleted || isCurrent) ? 'primary' : undefined)

          return (
            <Step
              key={item.key ?? index}
              color={stepColor}
              icon={item.icon}
              title={item.title}
              description={item.description}
              disabled={item.disabled}
              _index={index}
              _clickable={!!onChange && !item.disabled}
              _onClick={onChange}
              aria-current={isCurrent ? 'step' : undefined}
            />
          )
        })}
      </ul>
    )
  }

  // For compound pattern, inject props into children if current is provided
  const processedChildren =
    current !== undefined
      ? React.Children.map(children, (child, index) => {
          if (React.isValidElement<StepProps>(child)) {
            const isCompleted = index < current
            const isCurrent = index === current
            const childColor = child.props.color || ((isCompleted || isCurrent) ? 'primary' : undefined)

            return React.cloneElement(child, {
              color: childColor,
              _index: index,
              _clickable: !!onChange && !child.props.disabled,
              _onClick: onChange,
              'aria-current': isCurrent ? 'step' : undefined,
            } as Partial<StepProps>)
          }
          return child
        })
      : children

  return (
    <ul className={classes} {...rest}>
      {processedChildren}
    </ul>
  )
}

function Step({
  children,
  title,
  description,
  icon,
  color,
  dataContent,
  disabled = false,
  className = '',
  _index,
  _clickable,
  _onClick,
  ...rest
}: StepProps) {
  const classes = ['d-step', color && colorClasses[color], disabled && 'step-disabled', className]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (_clickable && _onClick && _index !== undefined && !disabled) {
      _onClick(_index)
    }
  }

  const displayContent = title ?? children

  return (
    <li
      className={classes}
      data-content={dataContent}
      onClick={handleClick}
      style={_clickable && !disabled ? { cursor: 'pointer' } : undefined}
      {...rest}
    >
      {icon && <span className="d-step-icon">{icon}</span>}
      {displayContent}
      {description && <span className="text-xs opacity-70 block">{description}</span>}
    </li>
  )
}

export const Steps = Object.assign(StepsRoot, {
  Step,
})
