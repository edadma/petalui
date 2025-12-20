import React, { useState, useCallback, createContext, useContext } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dJoin = 'join'
const dJoinItem = 'join-item'
const dBtn = 'btn'
const dBtnXs = 'btn-xs'
const dBtnSm = 'btn-sm'
const dBtnLg = 'btn-lg'
const dBtnXl = 'btn-xl'
const dBtnActive = 'btn-active'

export type SegmentedValue = string | number

interface SegmentedContextValue {
  value?: SegmentedValue
  onChange?: (value: SegmentedValue) => void
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled: boolean
}

const SegmentedContext = createContext<SegmentedContextValue | null>(null)

const useSegmentedContext = () => {
  const context = useContext(SegmentedContext)
  if (!context) {
    throw new Error('Segmented.Item must be used within a Segmented component')
  }
  return context
}

export interface SegmentedItemProps {
  /** Option value */
  value: SegmentedValue
  /** Disable this option */
  disabled?: boolean
  /** Icon to display before label */
  icon?: React.ReactNode
  /** Label content */
  children: React.ReactNode
  /** Additional CSS class */
  className?: string
}

const sizeClasses = {
  xs: dBtnXs,
  sm: dBtnSm,
  md: '',
  lg: dBtnLg,
  xl: dBtnXl,
}

const SegmentedItem: React.FC<SegmentedItemProps> = ({
  value,
  disabled: itemDisabled = false,
  icon,
  children,
  className = '',
}) => {
  const { value: selectedValue, onChange, size, disabled: groupDisabled } = useSegmentedContext()

  const isSelected = selectedValue === value
  const isDisabled = groupDisabled || itemDisabled

  const handleClick = () => {
    if (!isDisabled) {
      onChange?.(value)
    }
  }

  const buttonClasses = [
    dJoinItem,
    dBtn,
    sizeClasses[size],
    isSelected ? dBtnActive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
      aria-pressed={isSelected}
      data-testid={`segmented-item-${value}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </button>
  )
}

export interface SegmentedProps {
  /** Currently selected value (controlled) */
  value?: SegmentedValue
  /** Default selected value (uncontrolled) */
  defaultValue?: SegmentedValue
  /** Callback when selection changes */
  onChange?: (value: SegmentedValue) => void
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Take full width of container */
  block?: boolean
  /** Disable all options */
  disabled?: boolean
  /** Additional CSS class */
  className?: string
  /** Segmented.Item children */
  children: React.ReactNode
}

export const Segmented: React.FC<SegmentedProps> & { Item: typeof SegmentedItem } = ({
  value,
  defaultValue,
  onChange,
  size,
  block = false,
  disabled = false,
  className = '',
  children,
}) => {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'

  const [internalValue, setInternalValue] = useState<SegmentedValue | undefined>(defaultValue)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = useCallback(
    (newValue: SegmentedValue) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, onChange]
  )

  const contextValue: SegmentedContextValue = {
    value: currentValue,
    onChange: handleChange,
    size: effectiveSize,
    disabled,
  }

  const containerClasses = [dJoin, block ? `w-full [&>.${dJoinItem}]:flex-1` : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <SegmentedContext.Provider value={contextValue}>
      <div className={containerClasses} role="group" data-testid="segmented">
        {children}
      </div>
    </SegmentedContext.Provider>
  )
}

Segmented.Item = SegmentedItem
