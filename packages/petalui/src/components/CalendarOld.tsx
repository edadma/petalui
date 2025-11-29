import React, { useState } from 'react'

export interface CalendarOldEvent {
  date: Date
  title: string
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
}

export interface CalendarOldProps {
  value?: Date | Date[] | null
  defaultValue?: Date | Date[] | null
  onChange?: (date: Date | Date[] | null) => void
  mode?: 'single' | 'multiple' | 'range'
  events?: CalendarOldEvent[]
  disabledDate?: (date: Date) => boolean
  fullscreen?: boolean
  showWeekNumbers?: boolean
  className?: string
  headerRender?: (props: {
    value: Date
    onPrevMonth: () => void
    onNextMonth: () => void
    onPrevYear: () => void
    onNextYear: () => void
  }) => React.ReactNode
  dateRender?: (date: Date, events: CalendarOldEvent[]) => React.ReactNode
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const badgeColorClasses = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'badge-info',
} as const

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  const time = date.getTime()
  return time >= start.getTime() && time <= end.getTime()
}

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const CalendarOld: React.FC<CalendarOldProps> = ({
  value,
  defaultValue,
  onChange,
  mode = 'single',
  events = [],
  disabledDate,
  fullscreen = false,
  showWeekNumbers = false,
  className = '',
  headerRender,
  dateRender,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
    return []
  })

  const [viewMonth, setViewMonth] = useState(
    selectedDates[0] ? selectedDates[0].getMonth() : new Date().getMonth()
  )
  const [viewYear, setViewYear] = useState(
    selectedDates[0] ? selectedDates[0].getFullYear() : new Date().getFullYear()
  )
  const [rangeStart, setRangeStart] = useState<Date | null>(null)

  const currentDates = value !== undefined
    ? (Array.isArray(value) ? value : value ? [value] : [])
    : selectedDates

  const handleDateClick = (date: Date) => {
    if (disabledDate && disabledDate(date)) return

    let newDates: Date[]

    if (mode === 'single') {
      newDates = [date]
    } else if (mode === 'multiple') {
      const exists = currentDates.some(d => isSameDay(d, date))
      newDates = exists
        ? currentDates.filter(d => !isSameDay(d, date))
        : [...currentDates, date]
    } else {
      // range mode
      if (!rangeStart) {
        setRangeStart(date)
        newDates = [date]
      } else {
        const start = rangeStart < date ? rangeStart : date
        const end = rangeStart < date ? date : rangeStart
        newDates = [start, end]
        setRangeStart(null)
      }
    }

    if (value === undefined) {
      setSelectedDates(newDates)
    }

    onChange?.(mode === 'single' ? newDates[0] || null : newDates)
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

  const handlePrevYear = () => setViewYear(viewYear - 1)
  const handleNextYear = () => setViewYear(viewYear + 1)

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const weeks: (number | null)[][] = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  const isSelected = (day: number | null): boolean => {
    if (!day) return false
    const date = new Date(viewYear, viewMonth, day)
    return currentDates.some(d => isSameDay(d, date))
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

  const isInSelectedRange = (day: number | null): boolean => {
    if (!day || mode !== 'range' || currentDates.length !== 2) return false
    const date = new Date(viewYear, viewMonth, day)
    return isInRange(date, currentDates[0], currentDates[1])
  }

  const isRangeStart = (day: number | null): boolean => {
    if (!day || mode !== 'range' || currentDates.length === 0) return false
    const date = new Date(viewYear, viewMonth, day)
    return isSameDay(date, currentDates[0])
  }

  const isRangeEnd = (day: number | null): boolean => {
    if (!day || mode !== 'range' || currentDates.length !== 2) return false
    const date = new Date(viewYear, viewMonth, day)
    return isSameDay(date, currentDates[1])
  }

  const getEventsForDate = (day: number): CalendarOldEvent[] => {
    const date = new Date(viewYear, viewMonth, day)
    return events.filter(event => isSameDay(event.date, date))
  }

  const isDisabled = (day: number | null): boolean => {
    if (!day) return false
    const date = new Date(viewYear, viewMonth, day)
    return disabledDate ? disabledDate(date) : false
  }

  const containerClasses = [
    'calendar',
    fullscreen ? 'h-full' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {/* Header */}
      {headerRender ? (
        headerRender({
          value: new Date(viewYear, viewMonth),
          onPrevMonth: handlePrevMonth,
          onNextMonth: handleNextMonth,
          onPrevYear: handlePrevYear,
          onNextYear: handleNextYear,
        })
      ) : (
        <div className="flex items-center justify-between mb-4 px-4 py-3 bg-base-200 rounded-lg">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevYear}
              className="btn btn-ghost btn-sm"
              title="Previous year"
            >
              «
            </button>
            <button
              type="button"
              onClick={handlePrevMonth}
              className="btn btn-ghost btn-sm"
              title="Previous month"
            >
              ‹
            </button>
          </div>

          <div className="text-lg font-semibold">
            {MONTHS[viewMonth]} {viewYear}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleNextMonth}
              className="btn btn-ghost btn-sm"
              title="Next month"
            >
              ›
            </button>
            <button
              type="button"
              onClick={handleNextYear}
              className="btn btn-ghost btn-sm"
              title="Next year"
            >
              »
            </button>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="bg-base-100 rounded-lg p-4">
        {/* Days of week header */}
        <div className={`grid ${showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7'} gap-2 mb-2`}>
          {showWeekNumbers && (
            <div className="text-center text-xs font-semibold text-base-content/40 py-2">
              Wk
            </div>
          )}
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-base-content/70 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, weekIndex) => {
          const weekDate = new Date(viewYear, viewMonth, week.find(d => d !== null) || 1)

          return (
            <div
              key={weekIndex}
              className={`grid ${showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7'} gap-2 mb-2`}
            >
              {showWeekNumbers && (
                <div className="flex items-center justify-center text-xs text-base-content/40">
                  {getWeekNumber(weekDate)}
                </div>
              )}

              {week.map((day, dayIndex) => {
                const dateEvents = day ? getEventsForDate(day) : []
                const disabled = isDisabled(day)

                return (
                  <button
                    key={dayIndex}
                    type="button"
                    disabled={!day || disabled}
                    onClick={() => day && handleDateClick(new Date(viewYear, viewMonth, day))}
                    className={`
                      relative min-h-[60px] p-2 rounded-lg text-sm transition-colors
                      ${!day ? 'invisible' : ''}
                      ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-base-200 cursor-pointer'}
                      ${isSelected(day) && !isInSelectedRange(day) ? 'bg-primary text-primary-content hover:bg-primary/90' : ''}
                      ${isInSelectedRange(day) && !isSelected(day) ? 'bg-primary/20' : ''}
                      ${isRangeStart(day) || isRangeEnd(day) ? 'bg-primary text-primary-content' : ''}
                      ${isToday(day) && !isSelected(day) && !isInSelectedRange(day) ? 'border-2 border-primary' : 'border-2 border-transparent'}
                    `}
                  >
                    {day && (
                      <>
                        {dateRender ? (
                          dateRender(new Date(viewYear, viewMonth, day), dateEvents)
                        ) : (
                          <>
                            <div className="font-semibold">{day}</div>
                            {dateEvents.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {dateEvents.slice(0, 2).map((event, idx) => (
                                  <div
                                    key={idx}
                                    className={`badge badge-xs ${
                                      event.color ? badgeColorClasses[event.color] : 'badge-primary'
                                    }`}
                                    title={event.title}
                                  />
                                ))}
                                {dateEvents.length > 2 && (
                                  <div className="badge badge-xs badge-ghost">
                                    +{dateEvents.length - 2}
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Today button */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => {
            const today = new Date()
            setViewMonth(today.getMonth())
            setViewYear(today.getFullYear())
            if (mode === 'single') {
              handleDateClick(today)
            }
          }}
          className="btn btn-ghost btn-sm"
        >
          Today
        </button>
      </div>
    </div>
  )
}
