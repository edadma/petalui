import { useState } from 'react'
import { WeekCalendar, Card, message, type CalendarEvent } from 'asterui'
import { Demo } from './Demo'

// @example-imports: { WeekCalendar, Card } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[500px]" bodyClassName="overflow-hidden">
        <WeekCalendar date={new Date()} />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { WeekCalendar, Card, message, type CalendarEvent } from 'asterui'
// @example-imports: { useState } from 'react'
export function WithEventsDemo() {
  // @example-include
  const [date] = useState(new Date())

  // Create events for this week
  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - date.getDay())

  const events: CalendarEvent[] = [
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 1, 9, 0), title: 'Standup', color: '#3b82f6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 1, 14, 0), title: 'Design Review', color: '#8b5cf6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 10, 0), title: 'Sprint Planning', color: '#10b981' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 3, 12, 0), title: 'Lunch Meeting', color: '#f59e0b' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 4, 15, 0), title: 'Demo', color: '#ef4444' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 5, 16, 0), title: 'Team Sync', color: '#06b6d4' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[500px]" bodyClassName="overflow-hidden">
        <WeekCalendar
          date={date}
          events={events}
          onEventClick={(event) => message.info(`Clicked: ${event.title}`)}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { WeekCalendar, Card, message } from 'asterui'
// @example-imports: { useState } from 'react'
export function SlotSelectionDemo() {
  // @example-include
  const [date] = useState(new Date())
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[500px]" bodyClassName="overflow-hidden">
        <WeekCalendar
          date={date}
          onSelectSlot={(slot) => message.info(`Selected: ${slot.start.toLocaleString()} - ${slot.end.toLocaleTimeString()}`)}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { WeekCalendar, Card, type CalendarEvent } from 'asterui'
// @example-imports: { useState } from 'react'
export function StrikethroughDemo() {
  // @example-include
  const [date] = useState(new Date())

  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - date.getDay())

  const events: CalendarEvent[] = [
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 10, 0), title: 'Cancelled Meeting', color: '#ef4444', strikethrough: true },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 14, 0), title: 'Active Event', color: '#10b981' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 4, 12, 0), title: 'Postponed', color: '#f59e0b', strikethrough: true },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[500px]" bodyClassName="overflow-hidden">
        <WeekCalendar
          date={date}
          events={events}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { WeekCalendar, Card, type CalendarEvent } from 'asterui'
// @example-imports: { useState } from 'react'
export function CustomHoursDemo() {
  // @example-include
  const [date] = useState(new Date())

  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - date.getDay())

  const events: CalendarEvent[] = [
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 1, 6, 0), title: 'Morning Run', color: '#10b981' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 7, 0), title: 'Early Sync', color: '#8b5cf6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 3, 8, 0), title: 'Team Breakfast', color: '#f59e0b' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 4, 9, 0), title: 'Standup', color: '#3b82f6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 5, 10, 0), title: 'Code Review', color: '#ef4444' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[400px]" bodyClassName="overflow-hidden">
        <WeekCalendar
          date={date}
          events={events}
          startHour={6}
          endHour={12}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { WeekCalendar, Card, message } from 'asterui'
// @example-imports: { useState } from 'react'
export function AllowPastInteractionDemo() {
  // @example-include
  const [date] = useState(new Date())
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Card className="h-[500px]" bodyClassName="overflow-hidden">
        <WeekCalendar
          date={date}
          allowPastInteraction
          onDayClick={(date) => message.info(`Day clicked: ${date.toLocaleDateString()}`)}
          onSelectSlot={(slot) => message.info(`Slot: ${slot.start.toLocaleTimeString()}`)}
        />
      </Card>
      {/* @example-return-end */}
    </Demo>
  )
}
