import React, { useState, forwardRef } from 'react'

// Types
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

const isFutureDate = (date: Date) => {
  const today = new Date()
  const checkDate = new Date(date)
  today.setHours(0, 0, 0, 0)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate > today
}

const isPastDate = (date: Date) => {
  const today = new Date()
  const checkDate = new Date(date)
  today.setHours(0, 0, 0, 0)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate < today
}

const getEventsForDate = <T extends CalendarEvent>(events: T[], date: Date) => {
  return events.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  )
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const generateCalendarGrid = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const prevMonthDays = []

  if (firstDayOfMonth > 0) {
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1
      prevMonthDays.push({
        day,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
        date: new Date(prevMonthYear, prevMonth, day),
      })
    }
  }

  const currentMonthDays = []

  for (let day = 1; day <= daysInMonth; day++) {
    currentMonthDays.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    })
  }

  const nextMonthDays = []
  const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length
  const daysToAdd = 6 * 7 - totalDaysDisplayed

  if (daysToAdd > 0) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year

    for (let day = 1; day <= daysToAdd; day++) {
      nextMonthDays.push({
        day,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
        date: new Date(nextMonthYear, nextMonth, day),
      })
    }
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
}

export interface MonthCalendarProps<T extends CalendarEvent = CalendarEvent>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  date?: Date
  events?: T[]
  onEventClick?: (event: T) => void
  onDayClick?: (date: Date) => void
  locale?: CalendarLocale
  allowPastInteraction?: boolean
  maxEventsPerDay?: number
  onMoreEventsClick?: (date: Date, events: T[]) => void
  header?: boolean
  daySelector?: boolean
  ellipsis?: boolean
}

export const MonthCalendar = forwardRef<HTMLDivElement, MonthCalendarProps>(
  <T extends CalendarEvent>(
    {
      date = new Date(),
      events = [],
      maxEventsPerDay = 5,
      onEventClick,
      onDayClick,
      onMoreEventsClick,
      header,
      daySelector,
      locale = defaultLocale,
      ellipsis,
      allowPastInteraction = false,
      className = '',
      ...rest
    }: MonthCalendarProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const year = date.getFullYear()
    const month = date.getMonth()

    return (
      <div
        ref={ref}
        className={`flex h-full w-full flex-col bg-base-100 ${className}`}
        {...rest}
      >
        {header && (
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="m-0 text-lg font-medium text-base-content">
                {locale.monthsLong[month]} {year}
              </h2>
            </div>
          </div>
        )}

        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-base-300">
          {locale.daysShort.map((day, index) => (
            <div
              key={index}
              className="py-1 text-center text-xs font-medium uppercase text-base-content/60"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid flex-1 grid-cols-7 grid-rows-6 border-l border-base-300">
          {generateCalendarGrid(year, month).map((dateObj, index) => {
            const dateEvents = getEventsForDate(events as T[], dateObj.date)
            const isPast = isPastDate(dateObj.date) && !isToday(dateObj.date)
            const isSelected = daySelector && isEqual(dateObj.date, selectedDate)

            return (
              <div
                key={index}
                className={`
                  relative cursor-pointer overflow-hidden border-b border-r border-base-300 p-1
                  hover:bg-base-200
                  ${!dateObj.isCurrentMonth ? 'bg-base-200' : ''}
                  ${isToday(dateObj.date) ? 'bg-primary/10' : ''}
                  ${isPast ? 'opacity-60' : ''}
                  ${isPast && !allowPastInteraction ? 'cursor-not-allowed' : ''}
                  ${isSelected ? 'z-10 outline outline-2 outline-primary' : ''}
                `}
                onClick={() => {
                  if (isPast && !allowPastInteraction) {
                    return
                  }

                  if (daySelector) {
                    setSelectedDate(dateObj.date)
                  }

                  setTimeout(() => {
                    onDayClick?.(dateObj.date)
                  }, 0)
                }}
              >
                {/* Date number */}
                <div className="mb-0.5 flex justify-center">
                  <span
                    className={`
                      flex items-center justify-center text-xs leading-none
                      ${isToday(dateObj.date) ? 'font-bold text-primary' : 'text-base-content'}
                      ${!dateObj.isCurrentMonth ? 'text-base-content/40' : ''}
                      ${isPast && dateObj.isCurrentMonth ? 'text-base-content/40' : ''}
                    `}
                  >
                    {dateObj.day}
                  </span>
                </div>

                {/* Events container */}
                <div className="flex flex-col">
                  {dateEvents
                    .slice(
                      0,
                      dateEvents.length > maxEventsPerDay
                        ? maxEventsPerDay - 1
                        : maxEventsPerDay
                    )
                    .map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`
                          flex cursor-pointer items-center rounded px-1 py-0.5 text-xs leading-none
                          transition-colors hover:bg-base-content/5
                          ${isFutureDate(event.date) ? 'text-base-content' : 'text-base-content'}
                          ${event.strikethrough ? 'line-through' : ''}
                        `}
                        style={event.style}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onEventClick) {
                            onEventClick(event)
                          }
                        }}
                        title={event.title}
                      >
                        <span
                          className="mr-1.5 inline-block h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                        <span
                          className={`overflow-hidden whitespace-nowrap ${ellipsis ? 'text-ellipsis' : ''}`}
                        >
                          {event.title}
                        </span>
                      </div>
                    ))}
                  {dateEvents.length > maxEventsPerDay && (
                    <div
                      className="cursor-pointer rounded px-1 py-0.5 text-[11px] text-base-content/60 hover:bg-base-content/5"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onMoreEventsClick) {
                          onMoreEventsClick(dateObj.date, dateEvents)
                        }
                      }}
                    >
                      +{dateEvents.length - maxEventsPerDay + 1} {locale.moreText}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
) as <T extends CalendarEvent = CalendarEvent>(
  props: MonthCalendarProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement

;(MonthCalendar as React.FC).displayName = 'MonthCalendar'
