import React, { forwardRef, useRef } from 'react'
import { useConfig } from '../providers/ConfigProvider'

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

export interface SelectOption {
  label: React.ReactNode
  value: string | number
  disabled?: boolean
}

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
  /** Select options array (recommended for better performance) */
  options?: SelectOption[]
  className?: string
  children?: React.ReactNode
  'data-testid'?: string
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
      options,
      className = '',
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const { componentSize } = useConfig()
    const effectiveSize = size ?? componentSize ?? 'md'

    // Render options from array or use children
    const renderOptions = () => {
      if (options) {
        return options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))
      }
      return children
    }

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
    const hasWrapper = hasExternalAddons || !!floatingLabel
    const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)
    const selectTestId = testId ? (hasWrapper ? getTestId('select') : testId) : undefined

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
      <select ref={selectRef} className={selectClasses} data-testid={selectTestId} {...props}>
        {renderOptions()}
      </select>
    )

    // Wrap with floating label if specified
    if (floatingLabel) {
      const floatingClasses = [
        dFloatingLabel,
        effectiveSize && sizeClasses[effectiveSize],
      ].filter(Boolean).join(' ')

      return (
        <label className={floatingClasses} data-testid={testId}>
          <select
            ref={selectRef}
            className={`${dSelect} ${dSelectBordered} w-full`}
            data-testid={selectTestId}
            {...props}
          >
            {renderOptions()}
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
        <label className={addonClasses} data-testid={testId}>
          {addonBefore && (
            <span className="text-base-content/70" data-testid={getTestId('addon-before')}>
              {addonBefore}
            </span>
          )}
          {selectElement}
          {addonAfter && (
            <span className="text-base-content/70" data-testid={getTestId('addon-after')}>
              {addonAfter}
            </span>
          )}
        </label>
      )
    }

    return selectElement
  }
)

Select.displayName = 'Select'
