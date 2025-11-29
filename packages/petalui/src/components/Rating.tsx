import React, { createContext, useContext, useId, useState } from 'react'

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  children: React.ReactNode
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  readOnly?: boolean
}

export interface RatingItemProps {
  value: number
  mask?: 'star' | 'star-2' | 'heart'
  color?: string
  hidden?: boolean
  className?: string
}

interface RatingContextValue {
  name: string
  currentValue: number
  onChange: (value: number) => void
  size?: string
  readOnly?: boolean
}

const RatingContext = createContext<RatingContextValue | null>(null)

function RatingRoot({
  children,
  value,
  defaultValue = 0,
  onChange,
  size,
  readOnly = false,
  className = '',
  ...rest
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue
  const name = useId()

  const handleChange = (newValue: number) => {
    if (readOnly) return
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const sizeClasses = {
    xs: 'rating-xs',
    sm: 'rating-sm',
    md: 'rating-md',
    lg: 'rating-lg',
    xl: 'rating-xl',
  }

  const classes = ['rating', size && sizeClasses[size], className].filter(Boolean).join(' ')

  return (
    <RatingContext.Provider value={{ name, currentValue, onChange: handleChange, size, readOnly }}>
      <div className={classes} data-value={currentValue} {...rest}>{children}</div>
    </RatingContext.Provider>
  )
}

function RatingItem({ value, mask = 'star', color = 'bg-warning', hidden = false, className = '' }: RatingItemProps) {
  const context = useContext(RatingContext)
  if (!context) {
    throw new Error('Rating.Item must be used within Rating')
  }

  const { name, currentValue, onChange, readOnly } = context

  const maskClasses = {
    star: 'mask-star',
    'star-2': 'mask-star-2',
    heart: 'mask-heart',
  }

  const classes = [
    'mask',
    maskClasses[mask],
    hidden && 'rating-hidden',
    !hidden && color,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (readOnly) {
    return (
      <div
        className={classes}
        aria-current={currentValue === value ? 'true' : undefined}
        aria-label={`Rating ${value}`}
      />
    )
  }

  return (
    <input
      type="radio"
      name={name}
      className={classes}
      checked={currentValue === value}
      onChange={() => onChange(value)}
      aria-label={`Rating ${value}`}
    />
  )
}

export const Rating = Object.assign(RatingRoot, {
  Item: RatingItem,
})
