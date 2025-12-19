import { useState } from 'react'
import { MonthCalendar, Card, Button, Space, message, type CalendarEvent } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { MonthCalendar, Card } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[600px]">
        <MonthCalendar date={new Date()} />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { MonthCalendar, Card, message, type CalendarEvent } from 'asterui'
// @example-imports: { useState } from 'react'
export function WithEventsDemo() {
  // @example-include
  const [date] = useState(new Date())

  const events: CalendarEvent[] = [
    { date: new Date(date.getFullYear(), date.getMonth(), 5), title: 'Team Meeting', color: '#3b82f6' },
    { date: new Date(date.getFullYear(), date.getMonth(), 5), title: 'Code Review', color: '#10b981' },
    { date: new Date(date.getFullYear(), date.getMonth(), 12), title: 'Sprint Planning', color: '#8b5cf6' },
    { date: new Date(date.getFullYear(), date.getMonth(), 12), title: 'Design Review', color: '#f59e0b' },
    { date: new Date(date.getFullYear(), date.getMonth(), 18), title: 'Demo Day', color: '#ef4444' },
    { date: new Date(date.getFullYear(), date.getMonth(), 25), title: 'Retro', color: '#06b6d4' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[600px]">
        <MonthCalendar
          date={date}
          events={events}
          header
          onEventClick={(event) => message.info(`Clicked: ${event.title}`)}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { MonthCalendar, Card } from 'asterui'
// @example-imports: { useState } from 'react'
export function DaySelectorDemo() {
  // @example-include
  const [date] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[600px]">
        <MonthCalendar
          date={date}
          header
          daySelector
          onDayClick={(date) => setSelectedDate(date)}
        />
        {selectedDate && (
          <p className="mt-2 text-sm">Selected: {selectedDate.toLocaleDateString()}</p>
        )}
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { MonthCalendar, Card, message, type CalendarEvent } from 'asterui'
// @example-imports: { useState } from 'react'
export function MaxEventsDemo() {
  // @example-include
  const [date] = useState(new Date())

  const events: CalendarEvent[] = [
    { date: new Date(date.getFullYear(), date.getMonth(), 10), title: 'Event 1', color: '#3b82f6' },
    { date: new Date(date.getFullYear(), date.getMonth(), 10), title: 'Event 2', color: '#10b981' },
    { date: new Date(date.getFullYear(), date.getMonth(), 10), title: 'Event 3', color: '#8b5cf6' },
    { date: new Date(date.getFullYear(), date.getMonth(), 10), title: 'Event 4', color: '#f59e0b' },
    { date: new Date(date.getFullYear(), date.getMonth(), 10), title: 'Event 5', color: '#ef4444' },
    { date: new Date(date.getFullYear(), date.getMonth(), 10), title: 'Event 6', color: '#06b6d4' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[600px]">
        <MonthCalendar
          date={date}
          events={events}
          header
          maxEventsPerDay={3}
          onMoreEventsClick={(date, events) =>
            message.info(`${events.length} events on ${date.toLocaleDateString()}`)
          }
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { MonthCalendar, Card, type CalendarEvent } from 'asterui'
// @example-imports: { useState } from 'react'
export function StrikethroughDemo() {
  // @example-include
  const [date] = useState(new Date())

  const events: CalendarEvent[] = [
    { date: new Date(date.getFullYear(), date.getMonth(), 8), title: 'Cancelled Meeting', color: '#ef4444', strikethrough: true },
    { date: new Date(date.getFullYear(), date.getMonth(), 8), title: 'Active Event', color: '#10b981' },
    { date: new Date(date.getFullYear(), date.getMonth(), 15), title: 'Postponed', color: '#f59e0b', strikethrough: true },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[600px]">
        <MonthCalendar
          date={date}
          events={events}
          header
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { MonthCalendar, Card, Button, Space, message } from 'asterui'
// @example-imports: { useState } from 'react'
export function AllowPastInteractionDemo() {
  // @example-include
  const [date, setDate] = useState(new Date())

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[600px]">
        <Space className="mb-4">
          <Button onClick={prevMonth}>Previous</Button>
          <Button onClick={nextMonth}>Next</Button>
        </Space>
        <MonthCalendar
          date={date}
          header
          daySelector
          allowPastInteraction
          onDayClick={(date) => message.info(`Clicked: ${date.toLocaleDateString()}`)}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}
