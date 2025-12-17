import React, { forwardRef, useRef } from 'react'

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** Validation status */
  status?: 'error' | 'warning'
  ghost?: boolean
  bordered?: boolean
  /** Floating label text (uses DaisyUI floating-label) */
  floatingLabel?: string
  /** Text/element before select (outside, using DaisyUI label) */
  addonBefore?: React.ReactNode
  /** Text/element after select (outside, using DaisyUI label) */
  addonAfter?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size,
      color,
      status,
      ghost = false,
      bordered = true,
      floatingLabel,
      addonBefore,
      addonAfter,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const selectRef = (ref as React.RefObject<HTMLSelectElement>) || innerRef

    const sizeClasses = {
      xs: 'd-select-xs',
      sm: 'd-select-sm',
      md: 'd-select-md',
      lg: 'd-select-lg',
      xl: 'd-select-xl',
    }

    const colorClasses = {
      neutral: 'd-select-neutral',
      primary: 'd-select-primary',
      secondary: 'd-select-secondary',
      accent: 'd-select-accent',
      info: 'd-select-info',
      success: 'd-select-success',
      warning: 'd-select-warning',
      error: 'd-select-error',
    }

    const statusClasses = {
      error: 'd-select-error',
      warning: 'd-select-warning',
    }

    // Status takes precedence over color for validation feedback
    const effectiveColorClass = status ? statusClasses[status] : (color ? colorClasses[color] : '')

    // When wrapped with external addons, the wrapper has the styling
    const hasExternalAddons = addonBefore || addonAfter

    const selectClasses = hasExternalAddons
      ? ['grow', 'bg-transparent', 'border-0', 'outline-none', 'focus:outline-none', className].filter(Boolean).join(' ')
      : [
          'd-select',
          'w-full',
          bordered && 'select-bordered',
          ghost && 'd-select-ghost',
          size && sizeClasses[size],
          effectiveColorClass,
          className,
        ].filter(Boolean).join(' ')

    // Build the core select element
    const selectElement = (
      <select ref={selectRef} className={selectClasses} {...props}>
        {children}
      </select>
    )

    // Wrap with floating label if specified
    if (floatingLabel) {
      const floatingClasses = [
        'd-floating-label',
        size && sizeClasses[size],
      ].filter(Boolean).join(' ')

      return (
        <label className={floatingClasses}>
          <select ref={selectRef} className="d-select select-bordered w-full" {...props}>
            {children}
          </select>
          <span>{floatingLabel}</span>
        </label>
      )
    }

    // Wrap with external addons if specified
    if (hasExternalAddons) {
      const addonClasses = [
        'd-select',
        'select-bordered',
        'flex',
        'items-center',
        'gap-2',
        size && sizeClasses[size],
        effectiveColorClass,
      ].filter(Boolean).join(' ')

      return (
        <label className={addonClasses}>
          {addonBefore && <span className="text-base-content/70">{addonBefore}</span>}
          {selectElement}
          {addonAfter && <span className="text-base-content/70">{addonAfter}</span>}
        </label>
      )
    }

    return selectElement
  }
)

Select.displayName = 'Select'
