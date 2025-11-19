import { Stats, Button } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const statsApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Stat items to display',
    type: 'React.ReactNode',
  },
  {
    property: 'vertical',
    description: 'Stack stats vertically',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const statApi: ApiProperty[] = [
  {
    property: 'title',
    description: 'Stat title',
    type: 'React.ReactNode',
  },
  {
    property: 'value',
    description: 'Stat value',
    type: 'React.ReactNode',
  },
  {
    property: 'desc',
    description: 'Description text',
    type: 'React.ReactNode',
  },
  {
    property: 'figure',
    description: 'Icon or image figure',
    type: 'React.ReactNode',
  },
  {
    property: 'actions',
    description: 'Action buttons or elements',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function StatPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Stats</h1>
        <p className="text-base-content/70">
          Display statistics and data in organized blocks for dashboards and analytics.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Stat"
          description="Simple stat with title and value."
          code={`import React from 'react'
import { Stats } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats className="shadow">
    <Stats.Stat title="Total Page Views" value="89,400" />
  </Stats>
)

export default App`}
        >
          <Stats className="shadow">
            <Stats.Stat title="Total Page Views" value="89,400" />
          </Stats>
        </ExampleSection>

        <ExampleSection
          title="With Description"
          description="Add description using desc prop."
          code={`import React from 'react'
import { Stats } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats className="shadow">
    <Stats.Stat
      title="Downloads"
      value="31K"
      desc="Jan 1st - Feb 1st"
    />
  </Stats>
)

export default App`}
        >
          <Stats className="shadow">
            <Stats.Stat title="Downloads" value="31K" desc="Jan 1st - Feb 1st" />
          </Stats>
        </ExampleSection>

        <ExampleSection
          title="Multiple Stats"
          description="Display multiple stats horizontally."
          code={`import React from 'react'
import { Stats } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats className="shadow">
    <Stats.Stat
      title="Total Users"
      value="4,200"
      desc="↗︎ 400 (22%)"
    />
    <Stats.Stat
      title="New Users"
      value="1,200"
      desc="↘︎ 90 (14%)"
    />
    <Stats.Stat
      title="New Registers"
      value="4,200"
      desc="↗︎ 400 (22%)"
    />
  </Stats>
)

export default App`}
        >
          <Stats className="shadow">
            <Stats.Stat title="Total Users" value="4,200" desc="↗︎ 400 (22%)" />
            <Stats.Stat title="New Users" value="1,200" desc="↘︎ 90 (14%)" />
            <Stats.Stat title="New Registers" value="4,200" desc="↗︎ 400 (22%)" />
          </Stats>
        </ExampleSection>

        <ExampleSection
          title="With Icons"
          description="Adding icons using figure prop."
          code={`import React from 'react'
import { Stats } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats className="shadow">
    <Stats.Stat
      figure={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      title="Downloads"
      value="31K"
      desc="Jan 1st - Feb 1st"
    />
    <Stats.Stat
      figure={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      }
      title="New Users"
      value="4,200"
      desc="↗︎ 400 (22%)"
    />
  </Stats>
)

export default App`}
        >
          <Stats className="shadow">
            <Stats.Stat
              figure={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              }
              title="Downloads"
              value="31K"
              desc="Jan 1st - Feb 1st"
            />
            <Stats.Stat
              figure={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              }
              title="New Users"
              value="4,200"
              desc="↗︎ 400 (22%)"
            />
          </Stats>
        </ExampleSection>

        <ExampleSection
          title="Colored Values"
          description="Using className for colored values."
          code={`import React from 'react'
import { Stats } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats className="shadow">
    <Stats.Stat
      title="Account balance"
      value={<span className="text-primary">$89,400</span>}
      desc="21% more than last month"
    />
    <Stats.Stat
      title="Current balance"
      value={<span className="text-secondary">$12,721</span>}
      desc="12% less than last month"
    />
  </Stats>
)

export default App`}
        >
          <Stats className="shadow">
            <Stats.Stat
              title="Account balance"
              value={<span className="text-primary">$89,400</span>}
              desc="21% more than last month"
            />
            <Stats.Stat
              title="Current balance"
              value={<span className="text-secondary">$12,721</span>}
              desc="12% less than last month"
            />
          </Stats>
        </ExampleSection>

        <ExampleSection
          title="Vertical Layout"
          description="Stack stats vertically."
          code={`import React from 'react'
import { Stats } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats vertical className="shadow">
    <Stats.Stat
      title="Downloads"
      value="31K"
      desc="Jan 1st - Feb 1st"
    />
    <Stats.Stat
      title="New Users"
      value="4,200"
      desc="↗︎ 400 (22%)"
    />
    <Stats.Stat
      title="New Registers"
      value="1,200"
      desc="↘︎ 90 (14%)"
    />
  </Stats>
)

export default App`}
        >
          <Stats vertical className="shadow">
            <Stats.Stat title="Downloads" value="31K" desc="Jan 1st - Feb 1st" />
            <Stats.Stat title="New Users" value="4,200" desc="↗︎ 400 (22%)" />
            <Stats.Stat title="New Registers" value="1,200" desc="↘︎ 90 (14%)" />
          </Stats>
        </ExampleSection>

        <ExampleSection
          title="With Actions"
          description="Adding buttons using actions prop."
          code={`import React from 'react'
import { Stats, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Stats className="shadow">
    <Stats.Stat
      title="Account balance"
      value="$89,400"
      actions={
        <Button size="sm" type="primary">
          Add funds
        </Button>
      }
    />
  </Stats>
)

export default App`}
        >
          <Stats className="shadow">
            <Stats.Stat
              title="Account balance"
              value="$89,400"
              actions={
                <Button size="sm" type="primary">
                  Add funds
                </Button>
              }
            />
          </Stats>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Stats API</h2>
        <ApiTable data={statsApi} />

        <h2 className="text-2xl font-bold mb-4 mt-8">Stats.Stat API</h2>
        <ApiTable data={statApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use title and value props for simple stats</li>
              <li>Add desc for supporting information like changes or date ranges</li>
              <li>Use figure prop to display icons or images</li>
              <li>Add actions prop for buttons or interactive elements</li>
              <li>Values can be ReactNode for custom styling (wrap in elements with classes)</li>
              <li>Use vertical prop on Stats for vertical stacking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
