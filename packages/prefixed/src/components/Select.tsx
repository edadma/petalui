import React, { forwardRef, useRef } from 'react'
import { useConfig } from './ConfigProvider'

// DaisyUI classes
const dSelect = 'd-select'
const dSelectBordered = 'd-select-bordered'
const dSelectGhost = 'd-select-ghost'
const dSelectXs = 'd-select-xs'
const dSelectSm = 'd-select-sm'
const dSelectMd = 'd-select-md'
const dSelectLg = 'd-select-lg'
const dSelectXl = 'd-select-xl'
const dSelectNeutral = 'd-select-neutral'
const dSelectPrimary = 'd-select-primary'
const dSelectSecondary = 'd-select-secondary'
const dSelectAccent = 'd-select-accent'
const dSelectInfo = 'd-select-info'
const dSelectSuccess = 'd-select-success'
const dSelectWarning = 'd-select-warning'
const dSelectError = 'd-select-error'
const dFloatingLabel = 'd-floating-label'

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
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    const innerRef = useRef<HTMLSelectElement>(null)
    const selectRef = (ref as React.RefObject<HTMLSelectElement>) || innerRef

    const sizeClasses = {
      xs: dSelectXs,
      sm: dSelectSm,
      md: dSelectMd,
      lg: dSelectLg,
      xl: dSelectXl,
    }

    const colorClasses = {
      neutral: dSelectNeutral,
      primary: dSelectPrimary,
      secondary: dSelectSecondary,
      accent: dSelectAccent,
      info: dSelectInfo,
      success: dSelectSuccess,
      warning: dSelectWarning,
      error: dSelectError,
    }

    const statusClasses = {
      error: dSelectError,
      warning: dSelectWarning,
    }

    // Status takes precedence over color for validation feedback
    const effectiveColorClass = status ? statusClasses[status] : (color ? colorClasses[color] : '')

    // When wrapped with external addons, the wrapper has the styling
    const hasExternalAddons = addonBefore || addonAfter

    const selectClasses = hasExternalAddons
      ? ['grow', 'bg-transparent', 'border-0', 'outline-none', 'focus:outline-none', className].filter(Boolean).join(' ')
      : [
          dSelect,
          'w-full',
          bordered && dSelectBordered,
          ghost && dSelectGhost,
          effectiveSize && sizeClasses[effectiveSize],
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
        dFloatingLabel,
        effectiveSize && sizeClasses[effectiveSize],
      ].filter(Boolean).join(' ')

      return (
        <label className={floatingClasses}>
          <select ref={selectRef} className={`${dSelect} ${dSelectBordered} w-full`} {...props}>
            {children}
          </select>
          <span>{floatingLabel}</span>
        </label>
      )
    }

    // Wrap with external addons if specified
    if (hasExternalAddons) {
      const addonClasses = [
        dSelect,
        dSelectBordered,
        'flex',
        'items-center',
        'gap-2',
        effectiveSize && sizeClasses[effectiveSize],
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
