import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react'
import { Input } from './Input'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dBtn = 'd-btn'
const dBtnGhost = 'd-btn-ghost'
const dBtnSm = 'd-btn-sm'
const dBtnSquare = 'd-btn-square'

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  format?: string
  placeholder?: string
  disabledDate?: (date: Date) => boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Test ID prefix for child elements */
  'data-testid'?: string
}

export type DateRangeValue = [Date | null, Date | null]

export interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: DateRangeValue
  defaultValue?: DateRangeValue
  onChange?: (range: DateRangeValue) => void
  format?: string
  placeholder?: [string, string] | string
  disabledDate?: (date: Date) => boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Test ID prefix for child elements */
  'data-testid'?: string
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function formatDate(date: Date | null, format: string = 'MM/DD/YYYY'): string {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

function isBeforeDay(a: Date, b: Date): boolean {
  return stripTime(a).getTime() < stripTime(b).getTime()
}

function isAfterDay(a: Date, b: Date): boolean {
  return stripTime(a).getTime() > stripTime(b).getTime()
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function formatRange(range: DateRangeValue, format: string = 'MM/DD/YYYY'): string {
  const [start, end] = range
  if (start && end) return `${formatDate(start, format)} - ${formatDate(end, format)}`
  if (start) return `${formatDate(start, format)} - `
  return ''
}

const DatePickerComponent = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue,
    onChange,
    format,
    placeholder,
    disabledDate,
    disabled = false,
    size,
    'data-testid': testId,
    className = '',
    ...rest
  },
  ref
) {
  const { componentSize, locale } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
  const resolvedPlaceholder = placeholder ?? locale?.DatePicker?.placeholder ?? 'Select date'
  const todayLabel = locale?.DatePicker?.today ?? 'Today'
  const todayDate = new Date()
  const isTodayDisabled = disabled || disabledDate?.(todayDate)

  // Helper for test IDs
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value || defaultValue || null
  )
  const [isOpen, setIsOpen] = useState(false)
  const [focusedDate, setFocusedDate] = useState<Date | null>(null)
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  )
  const [viewYear, setViewYear] = useState(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const calendarId = React.useId()
  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
    },
    [ref]
  )

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value)
    }
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      setFocusedDate(selectedDate ?? todayDate)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !calendarRef.current) return
    const focusTarget = calendarRef.current.querySelector<HTMLButtonElement>('[data-calendar-focus="true"]')
    focusTarget?.focus()
  }, [isOpen, viewMonth, viewYear, focusedDate])

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day)
    if (disabled || disabledDate?.(newDate)) return
    setSelectedDate(newDate)
    onChange?.(newDate)
    setIsOpen(false)
  }

  const focusNextEnabledDate = (start: Date, delta: number) => {
    let candidate = addDays(start, delta)
    for (let i = 0; i < 31; i++) {
      if (!disabledDate?.(candidate)) return candidate
      candidate = addDays(candidate, delta)
    }
    return start
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!focusedDate) return
    let nextDate = focusedDate

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, -1)
        break
      case 'ArrowDown':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, 7)
        break
      case 'ArrowUp':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, -7)
        break
      case 'Home':
        event.preventDefault()
        nextDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1)
        if (disabledDate?.(nextDate)) {
          nextDate = focusNextEnabledDate(nextDate, 1)
        }
        break
      case 'End':
        event.preventDefault()
        nextDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), getDaysInMonth(focusedDate.getFullYear(), focusedDate.getMonth()))
        if (disabledDate?.(nextDate)) {
          nextDate = focusNextEnabledDate(nextDate, -1)
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleDateSelect(focusedDate.getDate())
        return
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        return
      default:
        return
    }

    setFocusedDate(nextDate)
    setViewMonth(nextDate.getMonth())
    setViewYear(nextDate.getFullYear())
  }

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOfMonth = getFirstDayOfMonth(viewYear, viewMonth)

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const isSelectedDay = (day: number | null): boolean => {
    if (!day || !selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    )
  }

  const isToday = (day: number | null): boolean => {
    if (!day) return false
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    )
  }

  return (
    <div ref={setContainerRef} className={`relative ${className}`} data-state={isOpen ? 'open' : 'closed'} data-testid={testId} {...rest}>
      <Input
        value={formatDate(selectedDate, format)}
        placeholder={resolvedPlaceholder}
        disabled={disabled}
        size={effectiveSize}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={calendarId}
        className="cursor-pointer"
        data-testid={getTestId('input')}
      />

      {isOpen && (
        <div
          ref={calendarRef}
          id={calendarId}
          role="dialog"
          aria-label="Date picker calendar"
          className="absolute top-full left-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 z-50 w-80"
          data-testid={getTestId('calendar')}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className={`${dBtn} ${dBtnGhost} ${dBtnSm} ${dBtnSquare}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="text-base font-semibold">
              {MONTHS[viewMonth]} {viewYear}
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className={`${dBtn} ${dBtnGhost} ${dBtnSm} ${dBtnSquare}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2" role="row">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-base-content/60 py-2"
                role="columnheader"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1" role="grid" onKeyDown={handleKeyDown}>
            {calendarDays.map((day, index) => {
              const dayDate = day ? new Date(viewYear, viewMonth, day) : null
              const isDayDisabled = disabled || (!!dayDate && !!disabledDate?.(dayDate))
              const isFocusedDay = !!dayDate && !!focusedDate && isSameDay(dayDate, focusedDate)

              return (
                <button
                  key={index}
                  type="button"
                  disabled={!day || isDayDisabled}
                  aria-disabled={isDayDisabled || undefined}
                  aria-selected={isSelectedDay(day) || undefined}
                  role="gridcell"
                  onClick={() => day && handleDateSelect(day)}
                  tabIndex={isFocusedDay ? 0 : -1}
                  data-calendar-focus={isFocusedDay ? 'true' : undefined}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg
                    ${!day ? 'invisible' : ''}
                    ${day && !isDayDisabled ? 'hover:bg-base-200 cursor-pointer' : ''}
                    ${isSelectedDay(day) ? 'bg-primary text-primary-content hover:bg-primary/90' : ''}
                    ${isToday(day) && !isSelectedDay(day) ? 'border border-primary' : ''}
                    ${isDayDisabled ? 'text-base-content/30 cursor-not-allowed' : ''}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Today button */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                const today = new Date()
                if (disabledDate?.(today)) return
                setSelectedDate(today)
                setViewMonth(today.getMonth())
                setViewYear(today.getFullYear())
                onChange?.(today)
                setIsOpen(false)
              }}
              className={`${dBtn} ${dBtnGhost} ${dBtnSm}`}
              disabled={isTodayDisabled}
            >
              {todayLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(function DateRangePicker(
  {
    value,
    defaultValue,
    onChange,
    format,
    placeholder,
    disabledDate,
    disabled = false,
    size,
    'data-testid': testId,
    className = '',
    ...rest
  },
  ref
) {
  const { componentSize, locale } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'

  const localeRangePlaceholder = locale?.DatePicker?.rangePlaceholder
  const [startPlaceholder, endPlaceholder] = Array.isArray(placeholder)
    ? placeholder
    : [
        placeholder ?? localeRangePlaceholder?.[0] ?? 'Start date',
        localeRangePlaceholder?.[1] ?? 'End date',
      ]
  const resolvedPlaceholder = Array.isArray(placeholder)
    ? `${startPlaceholder} - ${endPlaceholder}`
    : placeholder ?? `${startPlaceholder} - ${endPlaceholder}`
  const todayLabel = locale?.DatePicker?.today ?? 'Today'
  const todayDate = new Date()
  const isTodayDisabled = disabled || disabledDate?.(todayDate)

  // Helper for test IDs
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined)
  const [selectedRange, setSelectedRange] = useState<DateRangeValue>(
    value || defaultValue || [null, null]
  )
  const [isOpen, setIsOpen] = useState(false)
  const [focusedDate, setFocusedDate] = useState<Date | null>(null)
  const initialDate = selectedRange[0] ?? selectedRange[1] ?? new Date()
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())

  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const calendarId = React.useId()
  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
    },
    [ref]
  )

  useEffect(() => {
    if (value !== undefined) {
      setSelectedRange(value)
    }
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      setFocusedDate(selectedRange[0] ?? selectedRange[1] ?? todayDate)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !calendarRef.current) return
    const focusTarget = calendarRef.current.querySelector<HTMLButtonElement>('[data-calendar-focus="true"]')
    focusTarget?.focus()
  }, [isOpen, viewMonth, viewYear, focusedDate])

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day)
    if (disabled || disabledDate?.(newDate)) return
    let [start, end] = selectedRange

    if (!start || (start && end)) {
      start = newDate
      end = null
    } else if (start && !end) {
      if (isBeforeDay(newDate, start)) {
        end = start
        start = newDate
      } else {
        end = newDate
      }
    }

    const nextRange: DateRangeValue = [start, end]
    setSelectedRange(nextRange)
    onChange?.(nextRange)
    if (start && end) {
      setIsOpen(false)
    }
  }

  const focusNextEnabledDate = (start: Date, delta: number) => {
    let candidate = addDays(start, delta)
    for (let i = 0; i < 31; i++) {
      if (!disabledDate?.(candidate)) return candidate
      candidate = addDays(candidate, delta)
    }
    return start
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!focusedDate) return
    let nextDate = focusedDate

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, -1)
        break
      case 'ArrowDown':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, 7)
        break
      case 'ArrowUp':
        event.preventDefault()
        nextDate = focusNextEnabledDate(focusedDate, -7)
        break
      case 'Home':
        event.preventDefault()
        nextDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1)
        if (disabledDate?.(nextDate)) {
          nextDate = focusNextEnabledDate(nextDate, 1)
        }
        break
      case 'End':
        event.preventDefault()
        nextDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), getDaysInMonth(focusedDate.getFullYear(), focusedDate.getMonth()))
        if (disabledDate?.(nextDate)) {
          nextDate = focusNextEnabledDate(nextDate, -1)
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        handleDateSelect(focusedDate.getDate())
        return
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        return
      default:
        return
    }

    setFocusedDate(nextDate)
    setViewMonth(nextDate.getMonth())
    setViewYear(nextDate.getFullYear())
  }

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOfMonth = getFirstDayOfMonth(viewYear, viewMonth)

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const isToday = (day: number | null): boolean => {
    if (!day) return false
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    )
  }

  const [rangeStart, rangeEnd] = selectedRange

  return (
    <div ref={setContainerRef} className={`relative ${className}`} data-state={isOpen ? 'open' : 'closed'} data-testid={testId} {...rest}>
      <Input
        value={formatRange(selectedRange, format)}
        placeholder={resolvedPlaceholder}
        disabled={disabled}
        size={effectiveSize}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={calendarId}
        className="cursor-pointer"
        data-testid={getTestId('input')}
      />

      {isOpen && (
        <div
          ref={calendarRef}
          id={calendarId}
          role="dialog"
          aria-label="Date range picker calendar"
          className="absolute top-full left-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 z-50 w-80"
          data-testid={getTestId('calendar')}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className={`${dBtn} ${dBtnGhost} ${dBtnSm} ${dBtnSquare}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="text-base font-semibold">
              {MONTHS[viewMonth]} {viewYear}
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className={`${dBtn} ${dBtnGhost} ${dBtnSm} ${dBtnSquare}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2" role="row">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-base-content/60 py-2"
                role="columnheader"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1" role="grid" onKeyDown={handleKeyDown}>
            {calendarDays.map((day, index) => {
              const dayDate = day ? new Date(viewYear, viewMonth, day) : null
              const isDayDisabled = disabled || (!!dayDate && !!disabledDate?.(dayDate))
              const isStart = !!dayDate && !!rangeStart && isSameDay(dayDate, rangeStart)
              const isEnd = !!dayDate && !!rangeEnd && isSameDay(dayDate, rangeEnd)
              const isInRange = !!dayDate && !!rangeStart && !!rangeEnd
                && isAfterDay(dayDate, rangeStart)
                && isBeforeDay(dayDate, rangeEnd)
              const isFocusedDay = !!dayDate && !!focusedDate && isSameDay(dayDate, focusedDate)

              return (
                <button
                  key={index}
                  type="button"
                  disabled={!day || isDayDisabled}
                  aria-disabled={isDayDisabled || undefined}
                  aria-selected={isStart || isEnd || isInRange || undefined}
                  role="gridcell"
                  onClick={() => day && handleDateSelect(day)}
                  tabIndex={isFocusedDay ? 0 : -1}
                  data-calendar-focus={isFocusedDay ? 'true' : undefined}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg
                    ${!day ? 'invisible' : ''}
                    ${day && !isDayDisabled ? 'hover:bg-base-200 cursor-pointer' : ''}
                    ${isInRange ? 'bg-primary/10' : ''}
                    ${isStart || isEnd ? 'bg-primary text-primary-content hover:bg-primary/90' : ''}
                    ${isToday(day) && !isStart && !isEnd ? 'border border-primary' : ''}
                    ${isDayDisabled ? 'text-base-content/30 cursor-not-allowed' : ''}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Today button */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                const today = new Date()
                if (disabledDate?.(today)) return
                setSelectedRange([today, today])
                setViewMonth(today.getMonth())
                setViewYear(today.getFullYear())
                onChange?.([today, today])
                setIsOpen(false)
              }}
              className={`${dBtn} ${dBtnGhost} ${dBtnSm}`}
              disabled={isTodayDisabled}
            >
              {todayLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

DatePickerComponent.displayName = 'DatePicker'
DateRangePicker.displayName = 'DatePicker.Range'

type DatePickerType = typeof DatePickerComponent & {
  Range: typeof DateRangePicker
}

export const DatePicker = DatePickerComponent as DatePickerType
DatePicker.Range = DateRangePicker
