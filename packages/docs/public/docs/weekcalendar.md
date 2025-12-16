# WeekCalendar

**Import:** `import { WeekCalendar, type CalendarEvent, type CalendarLocale } from 'asterui'`

## Examples

### Basic Calendar

Simple week calendar showing hourly time slots.

```tsx
import React from 'react'
import { WeekCalendar, Card } from 'asterui'

const App: React.FC = () => (
  <Card className="h-[500px]" bodyClassName="overflow-hidden">
    <WeekCalendar date={new Date()} />
  </Card>
)

export default App
```

### With Events

Calendar displaying events at their scheduled times.

```tsx
import React from 'react'
import { WeekCalendar, Card, type CalendarEvent } from 'asterui'

const App: React.FC = () => {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  const events: CalendarEvent[] = [
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 1, 9, 0), title: 'Standup', color: '#3b82f6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 1, 14, 0), title: 'Design Review', color: '#8b5cf6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 10, 0), title: 'Sprint Planning', color: '#10b981' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 3, 12, 0), title: 'Lunch Meeting', color: '#f59e0b' },
  ]

  return (
    <Card className="h-[500px]" bodyClassName="overflow-hidden">
      <WeekCalendar
        date={new Date()}
        events={events}
        onEventClick={(event) => console.log('Clicked:', event.title)}
      />
    </Card>
  )
}

export default App
```

### Slot Selection

Click on empty time slots to select them.

```tsx
import React from 'react'
import { WeekCalendar, Card } from 'asterui'

const App: React.FC = () => (
  <Card className="h-[500px]" bodyClassName="overflow-hidden">
    <WeekCalendar
      date={new Date()}
      onSelectSlot={(slot) => console.log(`Selected: ${slot.start} - ${slot.end}`)}
    />
  </Card>
)

export default App
```

### Custom Hours

Show only specific hours (e.g., mornings only).

```tsx
import React from 'react'
import { WeekCalendar, Card, type CalendarEvent } from 'asterui'

const App: React.FC = () => {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  const events: CalendarEvent[] = [
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 1, 6, 0), title: 'Morning Run', color: '#10b981' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 7, 0), title: 'Early Sync', color: '#8b5cf6' },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 3, 8, 0), title: 'Team Breakfast', color: '#f59e0b' },
  ]

  return (
    <Card className="h-[400px]" bodyClassName="overflow-hidden">
      <WeekCalendar
        date={new Date()}
        events={events}
        startHour={6}
        endHour={12}
      />
    </Card>
  )
}

export default App
```

### Strikethrough Events

Show cancelled events with strikethrough styling.

```tsx
import React from 'react'
import { WeekCalendar, Card, type CalendarEvent } from 'asterui'

const App: React.FC = () => {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  const events: CalendarEvent[] = [
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 10, 0), title: 'Cancelled Meeting', color: '#ef4444', strikethrough: true },
    { date: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 2, 14, 0), title: 'Active Event', color: '#10b981' },
  ]

  return (
    <Card className="h-[500px]" bodyClassName="overflow-hidden">
      <WeekCalendar date={new Date()} events={events} />
    </Card>
  )
}

export default App
```

### Allow Past Interaction

Enable clicking on past time slots.

```tsx
import React from 'react'
import { WeekCalendar, Card } from 'asterui'

const App: React.FC = () => (
  <Card className="h-[500px]" bodyClassName="overflow-hidden">
    <WeekCalendar
      date={new Date()}
      allowPastInteraction
      onDayClick={(date) => console.log('Day clicked:', date)}
      onSelectSlot={(slot) => console.log('Slot selected:', slot)}
    />
  </Card>
)

export default App
```

## API

### WeekCalendar

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `date` | The date to display (determines which week is shown) | `Date` | `new Date()` |
| `events` | Array of calendar events to display | `CalendarEvent[]` | `[]` |
| `startHour` | Start hour for the time grid (0-23) | `number` | `9` |
| `endHour` | End hour for the time grid (0-23) | `number` | `17` |
| `allowPastInteraction` | Allow clicking on past time slots | `boolean` | `false` |
| `fitContainer` | Fit rows to container height instead of scrolling | `boolean` | `false` |
| `locale` | Locale configuration for day names and time format | `CalendarLocale` | `-` |
| `onDayClick` | Handler when a day header is clicked | `(date: Date) => void` | `-` |
| `onEventClick` | Handler when an event is clicked | `(event: CalendarEvent) => void` | `-` |
| `onSelectSlot` | Handler when a time slot is clicked | `(slotInfo: { start: Date; end: Date }) => void` | `-` |

### CalendarEvent

| Property | Description | Type |
|----------|-------------|------|
| `date` | Event date and time (hour determines which row) | `Date` |
| `title` | Event title | `string` |
| `color` | Event dot color | `string` |
| `strikethrough` | Show event with strikethrough (cancelled) | `boolean` |
| `style` | Custom inline styles for the event | `CSSProperties` |

### CalendarLocale

| Property | Description | Type |
|----------|-------------|------|
| `locale` | Locale identifier | `string` |
| `daysShort` | Short day names (Sun-Sat) | `string[]` |
| `monthsLong` | Full month names | `string[]` |
| `moreText` | Text for "+N more" | `string` |
| `formatTime` | Custom time formatter | `(date: Date) => string` |

## Usage Notes

- The WeekCalendar is a scrolling component by default. Use `bodyClassName="overflow-hidden"` on the parent Card to properly contain it.
- Default time range is 9am-5pm. Use `startHour` and `endHour` to customize.
- Events are placed in rows based on the hour of their `date` property.
