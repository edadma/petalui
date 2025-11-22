import { CalendarOld } from '@edadma/petalui'
import type { CalendarOldEvent } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'
import { useState } from 'react'

const calendarApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled selected date(s)',
    type: 'Date | Date[] | null',
  },
  {
    property: 'defaultValue',
    description: 'Default selected date(s)',
    type: 'Date | Date[] | null',
  },
  {
    property: 'onChange',
    description: 'Callback when date(s) change',
    type: '(date: Date | Date[] | null) => void',
  },
  {
    property: 'mode',
    description: 'Selection mode',
    type: "'single' | 'multiple' | 'range'",
    default: "'single'",
  },
  {
    property: 'events',
    description: 'Events to display on calendar',
    type: 'CalendarOldEvent[]',
    default: '[]',
  },
  {
    property: 'disabledDate',
    description: 'Function to disable specific dates',
    type: '(date: Date) => boolean',
  },
  {
    property: 'fullscreen',
    description: 'Enable fullscreen mode',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showWeekNumbers',
    description: 'Show week numbers',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'headerRender',
    description: 'Custom header render function',
    type: '(props) => React.ReactNode',
  },
  {
    property: 'dateRender',
    description: 'Custom date cell render function',
    type: '(date: Date, events: CalendarOldEvent[]) => React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const calendarEventApi: ApiProperty[] = [
  {
    property: 'date',
    description: 'Event date',
    type: 'Date',
  },
  {
    property: 'title',
    description: 'Event title',
    type: 'string',
  },
  {
    property: 'color',
    description: 'Event badge color',
    type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'",
  },
]

export function CalendarOldPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [dateRange, setDateRange] = useState<Date[]>([])

  // Sample events
  const sampleEvents: CalendarOldEvent[] = [
    {
      date: new Date(2025, 10, 25),
      title: 'Team Meeting',
      color: 'primary',
    },
    {
      date: new Date(2025, 10, 25),
      title: 'Project Deadline',
      color: 'error',
    },
    {
      date: new Date(2025, 10, 28),
      title: 'Thanksgiving',
      color: 'warning',
    },
    {
      date: new Date(2025, 11, 1),
      title: 'Sprint Planning',
      color: 'info',
    },
    {
      date: new Date(2025, 11, 15),
      title: 'Company Event',
      color: 'success',
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">CalendarOld</h1>
        <p className="text-base-content/70">Full calendar view with events and date selection.</p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Basic CalendarOld"
          description="Simple calendar with single date selection."
          code={`import React, { useState } from 'react'
import { CalendarOld } from '@edadma/petalui'

const App: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <CalendarOld
      value={date}
      onChange={setDate}
    />
  )
}

export default App`}
          noColumnBreak
        >
          <CalendarOld
            value={selectedDate}
            onChange={(date) => setSelectedDate(date as Date)}
          />
        </ExampleSection>

        <ExampleSection
          title="With Events"
          description="Display events as badges on calendar dates."
          code={`import React from 'react'
import { CalendarOld } from '@edadma/petalui'
import type { CalendarOldEvent } from '@edadma/petalui'

const events: CalendarOldEvent[] = [
  { date: new Date(2025, 10, 25), title: 'Team Meeting', color: 'primary' },
  { date: new Date(2025, 10, 28), title: 'Thanksgiving', color: 'warning' },
]

const App: React.FC = () => (
  <CalendarOld events={events} />
)

export default App`}
          noColumnBreak
        >
          <CalendarOld events={sampleEvents} />
        </ExampleSection>

        <ExampleSection
          title="Multiple Selection"
          description="Select multiple dates."
          code={`import React, { useState } from 'react'
import { CalendarOld } from '@edadma/petalui'

const App: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([])

  return (
    <div>
      <CalendarOld
        mode="multiple"
        value={dates}
        onChange={(dates) => setDates(dates as Date[])}
      />
      <p className="mt-4">Selected: {dates.length} dates</p>
    </div>
  )
}

export default App`}
          noColumnBreak
        >
          <div>
            <CalendarOld
              mode="multiple"
              value={selectedDates}
              onChange={(dates) => setSelectedDates(dates as Date[])}
            />
            <p className="mt-4 text-center">Selected: {selectedDates.length} dates</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Range Selection"
          description="Select a date range."
          code={`import React, { useState } from 'react'
import { CalendarOld } from '@edadma/petalui'

const App: React.FC = () => {
  const [range, setRange] = useState<Date[]>([])

  return (
    <div>
      <CalendarOld
        mode="range"
        value={range}
        onChange={(dates) => setRange(dates as Date[])}
      />
      {range.length === 2 && (
        <p className="mt-4">
          Range: {range[0].toLocaleDateString()} - {range[1].toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

export default App`}
          noColumnBreak
        >
          <div>
            <CalendarOld
              mode="range"
              value={dateRange}
              onChange={(dates) => setDateRange(dates as Date[])}
            />
            {dateRange.length === 2 && (
              <p className="mt-4 text-center">
                Range: {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}
              </p>
            )}
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Week Numbers"
          description="Display ISO week numbers."
          code={`import React from 'react'
import { CalendarOld } from '@edadma/petalui'

const App: React.FC = () => (
  <CalendarOld showWeekNumbers />
)

export default App`}
          noColumnBreak
        >
          <CalendarOld showWeekNumbers />
        </ExampleSection>

        <ExampleSection
          title="Disabled Dates"
          description="Disable weekends and past dates."
          code={`import React from 'react'
import { CalendarOld } from '@edadma/petalui'

const App: React.FC = () => {
  const disabledDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const day = date.getDay()
    // Disable weekends and past dates
    return date < today || day === 0 || day === 6
  }

  return <CalendarOld disabledDate={disabledDate} />
}

export default App`}
          noColumnBreak
        >
          <CalendarOld
            disabledDate={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const day = date.getDay()
              return date < today || day === 0 || day === 6
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Custom Date Rendering"
          description="Render custom content for each date."
          code={`import React from 'react'
import { CalendarOld } from '@edadma/petalui'

const App: React.FC = () => (
  <CalendarOld
    dateRender={(date, events) => (
      <div className="flex flex-col items-center">
        <div className="font-semibold">{date.getDate()}</div>
        {events.length > 0 && (
          <div className="text-xs text-primary">
            {events.length} event{events.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    )}
    events={[
      { date: new Date(2025, 10, 25), title: 'Meeting', color: 'primary' },
    ]}
  />
)

export default App`}
          noColumnBreak
        >
          <CalendarOld
            dateRender={(date, events) => (
              <div className="flex flex-col items-center">
                <div className="font-semibold">{date.getDate()}</div>
                {events.length > 0 && (
                  <div className="text-xs text-primary">
                    {events.length} event{events.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            )}
            events={sampleEvents}
          />
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="CalendarOld" data={calendarApi} />

        <ApiTable title="CalendarOldEvent" data={calendarEventApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use <code>mode="single"</code> for single date selection</li>
              <li>Use <code>mode="multiple"</code> to select multiple dates</li>
              <li>Use <code>mode="range"</code> for date range selection</li>
              <li>Add events with color coding to highlight important dates</li>
              <li>Use <code>disabledDate</code> to restrict date selection</li>
              <li>Customize rendering with <code>dateRender</code> for advanced use cases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
