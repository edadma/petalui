import React, { createContext, useContext, useId, useState } from 'react'

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  children?: React.ReactNode
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  onHoverChange?: (value: number) => void
  count?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  color?: string
  mask?: 'star' | 'star-2' | 'heart'
  allowClear?: boolean
  allowHalf?: boolean
  disabled?: boolean
}

export interface RatingItemProps {
  value: number
  mask?: 'star' | 'star-2' | 'heart'
  color?: string
  hidden?: boolean
  half?: 'first' | 'second'
  className?: string
}

interface RatingContextValue {
  name: string
  currentValue: number
  hoverValue: number
  onChange: (value: number) => void
  onHover: (value: number) => void
  size?: string
  disabled?: boolean
  halfGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}

const RatingContext = createContext<RatingContextValue | null>(null)

function RatingRoot({
  children,
  value,
  defaultValue = 0,
  onChange,
  onHoverChange,
  count = 5,
  size,
  gap = 'md',
  color = 'bg-warning',
  mask = 'star-2',
  allowClear = true,
  allowHalf = false,
  disabled = false,
  className = '',
  ...rest
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState(0)
  const currentValue = value !== undefined ? value : internalValue
  const name = useId()

  const handleChange = (newValue: number) => {
    if (disabled) return
    // Allow clearing if clicking the same value and allowClear is true
    const finalValue = allowClear && newValue === currentValue ? 0 : newValue
    if (value === undefined) {
      setInternalValue(finalValue)
    }
    // Clear hover state so the clicked value shows immediately
    setHoverValue(0)
    onChange?.(finalValue)
  }

  const handleHover = (hoverVal: number) => {
    if (disabled) return
    setHoverValue(hoverVal)
    onHoverChange?.(hoverVal)
  }

  const sizeClasses = {
    xs: 'd-rating-xs',
    sm: 'd-rating-sm',
    md: 'd-rating-md',
    lg: 'd-rating-lg',
    xl: 'd-rating-xl',
  }

  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-0.5',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  }

  const classes = [
    'd-rating',
    // Half-star mode requires a size class to render correctly, default to md
    allowHalf ? sizeClasses[size || 'md'] : (size && sizeClasses[size]),
    allowHalf ? 'd-rating-half' : (gap && gapClasses[gap]),
    className,
  ].filter(Boolean).join(' ')

  // Auto-generate items if no children provided
  // Note: half-star mode requires mask-star-2 per DaisyUI
  const effectiveMask = allowHalf ? 'star-2' : mask
  const items = children || (
    <>
      {allowClear && <RatingItem value={0} hidden />}
      {allowHalf ? (
        // Half-star mode: each star is two inputs
        Array.from({ length: count }, (_, i) => (
          <React.Fragment key={i + 1}>
            <RatingItem value={i + 0.5} mask={effectiveMask} color={color} half="first" />
            <RatingItem value={i + 1} mask={effectiveMask} color={color} half="second" />
          </React.Fragment>
        ))
      ) : (
        // Standard mode: one input per star
        Array.from({ length: count }, (_, i) => (
          <RatingItem key={i + 1} value={i + 1} mask={effectiveMask} color={color} />
        ))
      )}
    </>
  )

  return (
    <RatingContext.Provider value={{ name, currentValue, hoverValue, onChange: handleChange, onHover: handleHover, size, disabled, halfGap: allowHalf ? gap : undefined }}>
      <div
        role="radiogroup"
        aria-label="Rating"
        className={classes}
        data-value={currentValue}
        onMouseLeave={() => handleHover(0)}
        {...rest}
      >
        {items}
      </div>
    </RatingContext.Provider>
  )
}

function RatingItem({ value, mask = 'star-2', color = 'bg-warning', hidden = false, half, className = '' }: RatingItemProps) {
  const context = useContext(RatingContext)
  if (!context) {
    throw new Error('Rating.Item must be used within Rating')
  }

  const { name, currentValue, hoverValue, onChange, onHover, disabled, halfGap } = context

  const maskClasses = {
    star: 'd-mask-star',
    'star-2': 'd-mask-star-2',
    heart: 'd-mask-heart',
  }

  const halfGapClasses = {
    none: '',
    xs: 'mr-0.5',
    sm: 'mr-1',
    md: 'mr-2',
    lg: 'mr-3',
  }

  const halfClasses = {
    first: 'd-mask-half-1',
    second: `d-mask-half-2 ${halfGap ? halfGapClasses[halfGap] : ''}`.trim(),
  }

  // Hidden items only get rating-hidden class (no mask)
  // Visible items get mask classes - DaisyUI CSS handles filled/unfilled state
  const classes = hidden
    ? 'd-rating-hidden'
    : [
        'd-mask',
        maskClasses[mask],
        half && halfClasses[half],
        color,
        className,
      ].filter(Boolean).join(' ')

  if (disabled) {
    return (
      <div
        className={classes}
        aria-current={currentValue === value ? 'true' : undefined}
        aria-label={`Rating ${value}`}
      />
    )
  }

  // Use hoverValue for checked state when hovering (for visual preview)
  // DaisyUI CSS fills all stars up to the checked one
  const displayValue = hoverValue > 0 ? hoverValue : currentValue

  return (
    <input
      type="radio"
      name={name}
      className={classes}
      checked={displayValue === value}
      onChange={() => {}} // Controlled by onClick
      onClick={() => onChange(value)}
      onMouseEnter={() => onHover(value)}
      aria-label={`Rating ${value}`}
    />
  )
}

export const Rating = Object.assign(RatingRoot, {
  Item: RatingItem,
})
