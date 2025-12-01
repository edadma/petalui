import { Timeline, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const timelineApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Timeline items',
    type: 'React.ReactNode',
  },
  {
    property: 'vertical',
    description: 'Vertical layout orientation',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'horizontal',
    description: 'Horizontal layout (default)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'compact',
    description: 'All items on one side',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'snapIcon',
    description: 'Snap icon to start instead of center',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const timelineItemApi: ApiProperty[] = [
  {
    property: 'start',
    description: 'Content at start position (left/top)',
    type: 'React.ReactNode',
  },
  {
    property: 'end',
    description: 'Content at end position (right/bottom)',
    type: 'React.ReactNode',
  },
  {
    property: 'icon',
    description: 'Central icon or marker',
    type: 'React.ReactNode',
  },
  {
    property: 'startBox',
    description: 'Wrap start content in timeline-box',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'endBox',
    description: 'Wrap end content in timeline-box',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
)

export function TimelinePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Timeline</h1>
        <p className="text-base-content/70">
          Display events in chronological order with alternating or vertical layouts.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Timeline"
          description="Simple timeline with alternating content."
          code={`import React from 'react'
import { Timeline, Masonry } from '@edadma/bloomui'

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
)

const App: React.FC = () => (
  <Timeline>
    <Timeline.Item
      start="1984"
      icon={<CheckIcon />}
      end="First Macintosh computer"
      endBox
    />
    <Timeline.Item
      start="iMac"
      icon={<CheckIcon />}
      end="1998"
      startBox
    />
  </Timeline>
)

export default App`}
        >
          <Timeline>
            <Timeline.Item start="1984" icon={<CheckIcon />} end="First Macintosh computer" endBox />
            <Timeline.Item start="iMac" icon={<CheckIcon />} end="1998" startBox />
          </Timeline>
        </ExampleSection>

        <ExampleSection
          title="Vertical Timeline"
          description="Stack items vertically."
          code={`import React from 'react'
import { Timeline, Masonry } from '@edadma/bloomui'

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="text-primary w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
)

const App: React.FC = () => (
  <Timeline vertical>
    <Timeline.Item
      start="2015"
      icon={<CheckIcon />}
      end="Apple Watch"
      endBox
    />
    <Timeline.Item
      start="2017"
      icon={<CheckIcon />}
      end="iPhone X"
      endBox
    />
    <Timeline.Item
      start="2020"
      icon={<CheckIcon />}
      end="Apple Silicon M1"
      endBox
    />
  </Timeline>
)

export default App`}
        >
          <Timeline vertical>
            <Timeline.Item
              start="2015"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              end="Apple Watch"
              endBox
            />
            <Timeline.Item
              start="2017"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              end="iPhone X"
              endBox
            />
            <Timeline.Item
              start="2020"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              end="Apple Silicon M1"
              endBox
            />
          </Timeline>
        </ExampleSection>

        <ExampleSection
          title="Compact Timeline"
          description="All content on one side."
          code={`import React from 'react'
import { Timeline, Masonry } from '@edadma/bloomui'

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
)

const App: React.FC = () => (
  <Timeline vertical compact>
    <Timeline.Item
      icon={<CheckIcon />}
      end={
        <div>
          <time>1984</time>
          <div className="text-lg font-black">First Macintosh computer</div>
        </div>
      }
      endBox
    />
    <Timeline.Item
      icon={<CheckIcon />}
      end={
        <div>
          <time>1998</time>
          <div className="text-lg font-black">iMac</div>
        </div>
      }
      endBox
    />
    <Timeline.Item
      icon={<CheckIcon />}
      end={
        <div>
          <time>2001</time>
          <div className="text-lg font-black">iPod</div>
        </div>
      }
      endBox
    />
  </Timeline>
)

export default App`}
        >
          <Timeline vertical compact>
            <Timeline.Item
              icon={<CheckIcon />}
              end={
                <div>
                  <time>1984</time>
                  <div className="text-lg font-black">First Macintosh computer</div>
                </div>
              }
              endBox
            />
            <Timeline.Item
              icon={<CheckIcon />}
              end={
                <div>
                  <time>1998</time>
                  <div className="text-lg font-black">iMac</div>
                </div>
              }
              endBox
            />
            <Timeline.Item
              icon={<CheckIcon />}
              end={
                <div>
                  <time>2001</time>
                  <div className="text-lg font-black">iPod</div>
                </div>
              }
              endBox
            />
          </Timeline>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Timeline" data={timelineApi} />

        <ApiTable title="Timeline.Item" data={timelineItemApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use start and end props for content positioning</li>
              <li>Icon prop displays the central marker</li>
              <li>Set startBox or endBox to wrap content in timeline-box styling</li>
              <li>Connectors are automatically inserted between items</li>
              <li>Horizontal layout alternates content automatically</li>
              <li>Use vertical for top-to-bottom timelines</li>
              <li>Use compact to display all content on one side</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
