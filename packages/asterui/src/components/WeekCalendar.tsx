import React, { useMemo, useRef, useEffect, forwardRef } from 'react'

// Types (shared with MonthCalendar)
export type CalendarEvent = {
  date: Date
  title: string
  color: string
  strikethrough?: boolean
  style?: React.CSSProperties
}

export type CalendarLocale = {
  locale: string
  daysShort: string[]
  monthsLong: string[]
  moreText: string
  formatTime?: (date: Date) => string
}

// Default English locale
const defaultLocale: CalendarLocale = {
  locale: 'en',
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthsLong: [
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
  ],
  moreText: 'more',
  formatTime: (date: Date): string => {
    const hour = date.getHours()
    const formatted = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${hour < 12 ? 'AM' : 'PM'}`
    return formatted.replace(' ', '').toLowerCase().replace(':00', '')
  },
}

// Utility functions
const isToday = (date: Date) => isEqual(date, new Date())

const isEqual = (a: Date, b: Date) => {
  const acopy = new Date(a)
  const bcopy = new Date(b)
  acopy.setHours(0, 0, 0, 0)
  bcopy.setHours(0, 0, 0, 0)
  return bcopy.getTime() === acopy.getTime()
}

const isPastDate = (date: Date) => {
  const today = new Date()
  const checkDate = new Date(date)
  today.setHours(0, 0, 0, 0)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate < today
}

const getWeekStart = (date: Date): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const formatDate = (date: Date, format: string): string => {
  const day = date.getDate()
  const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]

  if (format === 'YYYY-MM-DD') {
    return date.toISOString().split('T')[0]
  }
  if (format === 'ddd') {
    return dayName
  }
  if (format === 'D') {
    return day.toString()
  }
  return date.toISOString()
}

export interface WeekCalendarProps<T extends CalendarEvent = CalendarEvent>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  date?: Date
  events?: T[]
  onEventClick?: (event: T) => void
  onDayClick?: (date: Date) => void
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void
  locale?: CalendarLocale
  allowPastInteraction?: boolean
  fitContainer?: boolean
  /** Start hour for the time grid (0-23) */
  startHour?: number
  /** End hour for the time grid (0-23) */
  endHour?: number
}

export const WeekCalendar = forwardRef<HTMLDivElement, WeekCalendarProps>(
  <T extends CalendarEvent>(
    {
      date = new Date(),
      events = [],
      locale = defaultLocale,
      onEventClick,
      onDayClick,
      onSelectSlot,
      allowPastInteraction = false,
      fitContainer = false,
      startHour = 9,
      endHour = 17,
      className = '',
      ...rest
    }: WeekCalendarProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const bodyRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    // Adjust header padding to account for scrollbar
    useEffect(() => {
      const adjustScrollbar = () => {
        if (bodyRef.current && headerRef.current) {
          const bodyElement = bodyRef.current
          const headerElement = headerRef.current
          const scrollbarWidth = bodyElement.offsetWidth - bodyElement.clientWidth
          headerElement.style.paddingRight = `${scrollbarWidth}px`
        }
      }

      adjustScrollbar()
      window.addEventListener('resize', adjustScrollbar)
      return () => window.removeEventListener('resize', adjustScrollbar)
    }, [])


    const weekStart = getWeekStart(date)
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    // Group events by day
    const eventsByDay = useMemo(() => {
      const grouped: Record<string, T[]> = {}
      events.forEach((event) => {
        const eventDate = formatDate(event.date, 'YYYY-MM-DD')
        if (!grouped[eventDate]) {
          grouped[eventDate] = []
        }
        grouped[eventDate].push(event as T)
      })
      return grouped
    }, [events])

    // Time slots from startHour to endHour
    const timeSlots = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour)

    const formatHour = (hour: number) => {
      if (locale.formatTime) {
        return locale.formatTime(new Date(2000, 0, 1, hour, 0))
      }
      return `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${hour < 12 ? 'AM' : 'PM'}`
    }

    const getEventsForDayAndHour = (dayStr: string, hour: number) => {
      const dayEvents = eventsByDay[dayStr] || []
      return dayEvents.filter((event) => {
        const eventHour = event.date.getHours()
        return eventHour === hour
      })
    }

    return (
      <div
        ref={ref}
        className={`flex h-full flex-col overflow-hidden border-b border-base-200 bg-base-100 ${className}`}
        {...rest}
      >
        {/* Header with days */}
        <div
          ref={headerRef}
          className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-base-200 bg-base-100"
        >
          <div className="week-calendar-time-column" />
          {weekDays.map((day) => {
            const isPast = isPastDate(day)
            const isTodayDate = isToday(day)

            return (
              <div
                key={formatDate(day, 'YYYY-MM-DD')}
                className={`
                  cursor-pointer px-2 py-0.5 text-center transition-colors hover:bg-primary/5
                  ${isPast && !allowPastInteraction ? 'cursor-not-allowed' : ''}
                `}
                onClick={() => {
                  if (isPast && !allowPastInteraction) {
                    return
                  }
                  onDayClick?.(day)
                }}
              >
                <div
                  className={`
                    text-xs font-medium uppercase
                    ${isPast ? 'text-base-content/40' : 'text-base-content/60'}
                  `}
                >
                  {formatDate(day, 'ddd')}
                </div>
                <div
                  className={`
                    mx-auto flex items-center justify-center text-xs font-medium transition-all
                    ${isTodayDate ? 'font-bold text-primary' : ''}
                    ${isPast && !isTodayDate ? 'text-base-content/40' : 'text-base-content'}
                  `}
                >
                  {formatDate(day, 'D')}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time grid */}
        <div
          ref={bodyRef}
          className={fitContainer ? 'grid flex-1' : 'flex-1 overflow-y-auto'}
          style={fitContainer ? { gridTemplateRows: `repeat(${timeSlots.length}, 1fr)` } : undefined}
        >
          {timeSlots.map((hour) => (
            <div
              key={hour}
              className={`grid grid-cols-[80px_repeat(7,1fr)] border-b border-base-200 last:border-b-0 ${fitContainer ? 'min-h-10' : 'h-20'}`}
            >
              {/* Time label */}
              <div className="flex items-start justify-end border-l border-r border-base-200 bg-base-200/50 p-2 pt-1 text-xs text-base-content/50">
                {formatHour(hour)}
              </div>

              {/* Day cells */}
              {weekDays.map((day) => {
                const dayStr = formatDate(day, 'YYYY-MM-DD')
                const hourEvents = getEventsForDayAndHour(dayStr, hour)
                const isPast = isPastDate(day) && !isToday(day)

                return (
                  <div
                    key={`${dayStr}-${hour}`}
                    className={`
                      relative flex cursor-pointer flex-col justify-start overflow-y-auto border-r border-base-200 p-1 last:border-r-0
                      hover:bg-primary/5
                      ${fitContainer ? '' : 'h-20'}
                      ${isPast && !allowPastInteraction ? 'cursor-not-allowed hover:cursor-not-allowed' : ''}
                    `}
                    onClick={(e) => {
                      if (isPast && !allowPastInteraction) {
                        return
                      }

                      if (
                        onSelectSlot &&
                        (e.target === e.currentTarget ||
                          (e.target as HTMLElement).classList.contains('week-calendar-time-cell'))
                      ) {
                        const start = new Date(day)
                        start.setHours(hour, 0, 0, 0)

                        const end = new Date(day)
                        end.setHours(hour + 1, 0, 0, 0)

                        onSelectSlot({ start, end })
                      }
                    }}
                  >
                    {hourEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className={`
                          mb-px flex shrink-0 cursor-pointer items-center rounded px-1 py-0.5 text-xs leading-none
                          text-base-content transition-colors hover:bg-base-content/5 last:mb-0
                          ${event.strikethrough ? 'line-through' : ''}
                        `}
                        style={event.style}
                        title={event.title}
                        onClick={(e) => {
                          e.stopPropagation()
                          onEventClick?.(event)
                        }}
                      >
                        <div
                          className="mr-1.5 inline-block h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: event.color || '#bfbfbf' }}
                        />
                        <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
) as <T extends CalendarEvent = CalendarEvent>(
  props: WeekCalendarProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement

;(WeekCalendar as React.FC).displayName = 'WeekCalendar'
