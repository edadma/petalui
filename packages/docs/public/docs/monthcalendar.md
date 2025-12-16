# MonthCalendar

**Import:** `import { MonthCalendar, type CalendarEvent, type CalendarLocale } from 'asterui'`

## Examples

### Basic Calendar

Simple month calendar wrapped in a Card.

```tsx
import React from 'react'
import { MonthCalendar, Card } from 'asterui'

const App: React.FC = () => (
  <Card className="h-[600px]">
    <MonthCalendar date={new Date()} />
  </Card>
)

export default App
```

### With Events

Calendar displaying events with colored dots.

```tsx
import React from 'react'
import { MonthCalendar, Card, type CalendarEvent } from 'asterui'

const App: React.FC = () => {
  const events: CalendarEvent[] = [
    { date: new Date(2024, 0, 15, 10, 0), title: 'Team Meeting', color: '#3b82f6' },
    { date: new Date(2024, 0, 15, 14, 0), title: 'Code Review', color: '#10b981' },
    { date: new Date(2024, 0, 20, 9, 0), title: 'Sprint Planning', color: '#f59e0b' },
  ]

  return (
    <Card className="h-[600px]">
      <MonthCalendar
        date={new Date(2024, 0, 1)}
        events={events}
        onEventClick={(event) => console.log('Clicked:', event.title)}
      />
    </Card>
  )
}

export default App
```

### Day Selection

Enable day selection with visual feedback.

```tsx
import React, { useState } from 'react'
import { MonthCalendar, Card } from 'asterui'

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <Card className="h-[600px]">
      <MonthCalendar
        date={new Date()}
        daySelector
        onDayClick={(date) => setSelectedDate(date)}
      />
      {selectedDate && <p>Selected: {selectedDate.toLocaleDateString()}</p>}
    </Card>
  )
}

export default App
```

### Max Events Per Day

Limit visible events with '+N more' overflow.

```tsx
import React from 'react'
import { MonthCalendar, Card, type CalendarEvent } from 'asterui'

const App: React.FC = () => {
  // Create many events on the same day
  const events: CalendarEvent[] = [
    { date: new Date(2024, 0, 15, 9, 0), title: 'Meeting 1', color: '#3b82f6' },
    { date: new Date(2024, 0, 15, 10, 0), title: 'Meeting 2', color: '#10b981' },
    { date: new Date(2024, 0, 15, 11, 0), title: 'Meeting 3', color: '#f59e0b' },
    { date: new Date(2024, 0, 15, 14, 0), title: 'Meeting 4', color: '#ef4444' },
  ]

  return (
    <Card className="h-[600px]">
      <MonthCalendar
        date={new Date(2024, 0, 1)}
        events={events}
        maxEventsPerDay={2}
        onMoreEventsClick={(date, events) => console.log('More events:', events)}
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
import { MonthCalendar, Card, type CalendarEvent } from 'asterui'

const App: React.FC = () => {
  const events: CalendarEvent[] = [
    { date: new Date(2024, 0, 15, 10, 0), title: 'Cancelled Meeting', color: '#ef4444', strikethrough: true },
    { date: new Date(2024, 0, 15, 14, 0), title: 'Active Event', color: '#10b981' },
  ]

  return (
    <Card className="h-[600px]">
      <MonthCalendar date={new Date(2024, 0, 1)} events={events} />
    </Card>
  )
}

export default App
```

### Allow Past Interaction

Enable clicking on past dates.

```tsx
import React, { useState } from 'react'
import { MonthCalendar, Card, Button } from 'asterui'

const App: React.FC = () => {
  const [date, setDate] = useState(new Date())

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  return (
    <Card className="h-[600px]">
      <div className="flex gap-2 mb-4">
        <Button size="sm" onClick={prevMonth}>Previous</Button>
        <Button size="sm" onClick={nextMonth}>Next</Button>
      </div>
      <MonthCalendar
        date={date}
        header
        allowPastInteraction
        onDayClick={(date) => console.log('Clicked:', date)}
      />
    </Card>
  )
}

export default App
```

## API

### MonthCalendar

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `date` | The date to display (determines which month is shown) | `Date` | `new Date()` |
| `events` | Array of calendar events to display | `CalendarEvent[]` | `[]` |
| `header` | Show month/year header | `boolean` | `false` |
| `daySelector` | Enable day selection with visual feedback | `boolean` | `false` |
| `ellipsis` | Truncate long event titles with ellipsis | `boolean` | `false` |
| `maxEventsPerDay` | Maximum events to show per day before "+N more" | `number` | `5` |
| `allowPastInteraction` | Allow clicking on past dates | `boolean` | `false` |
| `locale` | Locale configuration for day/month names | `CalendarLocale` | `-` |
| `onDayClick` | Handler when a day cell is clicked | `(date: Date) => void` | `-` |
| `onEventClick` | Handler when an event is clicked | `(event: CalendarEvent) => void` | `-` |
| `onMoreEventsClick` | Handler when "+N more" is clicked | `(date: Date, events: CalendarEvent[]) => void` | `-` |

### CalendarEvent

| Property | Description | Type |
|----------|-------------|------|
| `date` | Event date and time | `Date` |
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
