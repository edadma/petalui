import React, { useState, useRef, useEffect, forwardRef, useCallback, useId } from 'react'
import { Input } from './Input'

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  format?: '12' | '24'
  placeholder?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showSeconds?: boolean
  allowClear?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  status?: 'error' | 'warning'
  'data-testid'?: string
}

function formatTime(date: Date | null, format: '12' | '24' = '24', showSeconds: boolean = false): string {
  if (!date) return ''

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  if (format === '12') {
    const period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    const timeStr = showSeconds
      ? `${hours}:${minutes}:${seconds} ${period}`
      : `${hours}:${minutes} ${period}`
    return timeStr
  }

  const hoursStr = String(hours).padStart(2, '0')
  return showSeconds ? `${hoursStr}:${minutes}:${seconds}` : `${hoursStr}:${minutes}`
}

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(({
  value,
  defaultValue,
  onChange,
  format = '24',
  placeholder = 'Select time',
  disabled = false,
  className,
  size = 'md',
  showSeconds = false,
  allowClear = true,
  open: controlledOpen,
  onOpenChange,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  status,
  'data-testid': testId,
  ...rest
}, ref) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    value !== undefined ? value : defaultValue || null
  )
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const [hours, setHours] = useState(selectedTime ? selectedTime.getHours() : 0)
  const [minutes, setMinutes] = useState(selectedTime ? selectedTime.getMinutes() : 0)
  const [seconds, setSeconds] = useState(selectedTime ? selectedTime.getSeconds() : 0)
  const [period, setPeriod] = useState<'AM' | 'PM'>(
    selectedTime && selectedTime.getHours() >= 12 ? 'PM' : 'AM'
  )
  const [focusedColumn, setFocusedColumn] = useState<'hour' | 'minute' | 'second' | 'period'>('hour')

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId()
  const baseTestId = testId || 'timepicker'

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value)
      if (value) {
        setHours(value.getHours())
        setMinutes(value.getMinutes())
        setSeconds(value.getSeconds())
        setPeriod(value.getHours() >= 12 ? 'PM' : 'AM')
      }
    }
  }, [value])

  const setOpen = useCallback((newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [controlledOpen, onOpenChange])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setOpen])

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }

      if (e.key === 'Tab') {
        // Allow tab to cycle through columns
        return
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const delta = e.key === 'ArrowUp' ? -1 : 1

        if (focusedColumn === 'hour') {
          const maxHour = format === '12' ? 12 : 23
          const minHour = format === '12' ? 1 : 0
          let newHour = hours + (delta * hourStep)
          if (newHour > maxHour) newHour = minHour
          if (newHour < minHour) newHour = maxHour
          handleHourChange(newHour)
        } else if (focusedColumn === 'minute') {
          let newMinute = minutes + (delta * minuteStep)
          if (newMinute > 59) newMinute = 0
          if (newMinute < 0) newMinute = 59
          handleMinuteChange(newMinute)
        } else if (focusedColumn === 'second') {
          let newSecond = seconds + (delta * secondStep)
          if (newSecond > 59) newSecond = 0
          if (newSecond < 0) newSecond = 59
          handleSecondChange(newSecond)
        } else if (focusedColumn === 'period') {
          handlePeriodChange(period === 'AM' ? 'PM' : 'AM')
        }
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const columns: Array<'hour' | 'minute' | 'second' | 'period'> = ['hour', 'minute']
        if (showSeconds) columns.push('second')
        if (format === '12') columns.push('period')

        const currentIndex = columns.indexOf(focusedColumn)
        const delta = e.key === 'ArrowLeft' ? -1 : 1
        let newIndex = currentIndex + delta
        if (newIndex < 0) newIndex = columns.length - 1
        if (newIndex >= columns.length) newIndex = 0
        setFocusedColumn(columns[newIndex])
      }

      if (e.key === 'Enter') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, focusedColumn, hours, minutes, seconds, period, format, showSeconds, hourStep, minuteStep, secondStep, setOpen])

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTime(null)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setPeriod('AM')
    onChange?.(null)
  }, [onChange])

  const handleTimeChange = (newHours: number, newMinutes: number, newSeconds: number) => {
    const now = new Date()
    const newTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      newHours,
      newMinutes,
      newSeconds
    )
    setSelectedTime(newTime)
    onChange?.(newTime)
  }

  const handleHourChange = (newHour: number) => {
    let actualHour = newHour
    if (format === '12') {
      actualHour = period === 'PM' ? (newHour % 12) + 12 : newHour % 12
    }
    setHours(actualHour)
    handleTimeChange(actualHour, minutes, seconds)
  }

  const handleMinuteChange = (newMinute: number) => {
    setMinutes(newMinute)
    handleTimeChange(hours, newMinute, seconds)
  }

  const handleSecondChange = (newSecond: number) => {
    setSeconds(newSecond)
    handleTimeChange(hours, minutes, newSecond)
  }

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod)
    const newHours = newPeriod === 'PM'
      ? (hours % 12) + 12
      : hours % 12
    setHours(newHours)
    handleTimeChange(newHours, minutes, seconds)
  }

  const renderTimeColumn = (
    columnType: 'hour' | 'minute' | 'second',
    label: string,
    maxValue: number,
    currentValue: number,
    onChangeValue: (value: number) => void,
    step: number = 1,
    start: number = 0
  ) => {
    const items: number[] = []
    for (let i = start; i <= maxValue; i += step) {
      items.push(i)
    }
    const listboxId = `${uniqueId}-${columnType}-listbox`
    const isFocused = focusedColumn === columnType

    return (
      <div
        className="flex flex-col w-16"
        role="listbox"
        aria-label={`Select ${label.toLowerCase()}`}
        id={listboxId}
        data-testid={`${baseTestId}-${columnType}-column`}
        tabIndex={0}
        onFocus={() => setFocusedColumn(columnType)}
      >
        <div className="text-xs font-semibold text-center text-base-content/60 py-2" aria-hidden="true">
          {label}
        </div>
        <div className="overflow-y-auto max-h-48">
          {items.map((item) => {
            const isSelected = currentValue === item
            return (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onChangeValue(item)}
                data-testid={`${baseTestId}-${columnType}-${item}`}
                className={[
                  'w-full px-4 py-2 text-center hover:bg-base-200 transition-colors',
                  isSelected ? 'bg-primary text-primary-content' : '',
                  isFocused && isSelected ? 'ring-2 ring-primary ring-offset-1' : ''
                ].filter(Boolean).join(' ')}
              >
                {String(item).padStart(2, '0')}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const displayHours = format === '12' ? (hours % 12 || 12) : hours

  const statusClasses = {
    error: 'd-input-error',
    warning: 'd-input-warning',
  }

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={['relative', className].filter(Boolean).join(' ')}
      data-testid={baseTestId}
      data-state={isOpen ? 'open' : 'closed'}
      {...rest}
    >
      <div className="relative">
        <Input
          value={formatTime(selectedTime, format, showSeconds)}
          placeholder={placeholder}
          disabled={disabled}
          size={size}
          readOnly
          onClick={() => !disabled && setOpen(!isOpen)}
          className={['cursor-pointer pr-8', status ? statusClasses[status] : ''].filter(Boolean).join(' ')}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${uniqueId}-dropdown` : undefined}
          data-testid={`${baseTestId}-input`}
        />
        {allowClear && selectedTime && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 d-btn d-btn-ghost d-btn-xs d-btn-circle"
            aria-label="Clear time"
            data-testid={`${baseTestId}-clear`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          id={`${uniqueId}-dropdown`}
          className="absolute top-full left-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-xl z-[9999] w-fit"
          role="dialog"
          aria-label="Time picker"
          data-testid={`${baseTestId}-dropdown`}
        >
          <div className="flex divide-x divide-base-300">
            {renderTimeColumn(
              'hour',
              'Hour',
              format === '12' ? 12 : 23,
              displayHours,
              handleHourChange,
              hourStep,
              format === '12' ? 1 : 0
            )}

            {renderTimeColumn('minute', 'Min', 59, minutes, handleMinuteChange, minuteStep)}

            {showSeconds && renderTimeColumn('second', 'Sec', 59, seconds, handleSecondChange, secondStep)}

            {format === '12' && (
              <div
                className="flex flex-col w-16"
                role="listbox"
                aria-label="Select period"
                data-testid={`${baseTestId}-period-column`}
                tabIndex={0}
                onFocus={() => setFocusedColumn('period')}
              >
                <div className="text-xs font-semibold text-center text-base-content/60 py-2" aria-hidden="true">
                  Period
                </div>
                <div className="flex flex-col p-2 gap-2">
                  <button
                    type="button"
                    role="option"
                    aria-selected={period === 'AM'}
                    onClick={() => handlePeriodChange('AM')}
                    data-testid={`${baseTestId}-period-am`}
                    className={[
                      'd-btn d-btn-sm',
                      period === 'AM' ? 'd-btn-primary' : 'd-btn-ghost'
                    ].join(' ')}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    role="option"
                    aria-selected={period === 'PM'}
                    onClick={() => handlePeriodChange('PM')}
                    data-testid={`${baseTestId}-period-pm`}
                    className={[
                      'd-btn d-btn-sm',
                      period === 'PM' ? 'd-btn-primary' : 'd-btn-ghost'
                    ].join(' ')}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 p-3 border-t border-base-300">
            <button
              type="button"
              onClick={() => {
                const now = new Date()
                setHours(now.getHours())
                setMinutes(now.getMinutes())
                setSeconds(now.getSeconds())
                setPeriod(now.getHours() >= 12 ? 'PM' : 'AM')
                handleTimeChange(now.getHours(), now.getMinutes(), now.getSeconds())
              }}
              className="d-btn d-btn-ghost d-btn-sm"
              data-testid={`${baseTestId}-now`}
            >
              Now
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="d-btn d-btn-primary d-btn-sm"
              data-testid={`${baseTestId}-ok`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

TimePicker.displayName = 'TimePicker'
