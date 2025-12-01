import { Empty, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const emptyApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Custom content (usually action buttons)',
    type: 'React.ReactNode',
  },
  {
    property: 'description',
    description: 'Description text for empty state',
    type: 'React.ReactNode',
    default: '"No Data"',
  },
  {
    property: 'image',
    description: 'Custom empty image or icon',
    type: 'React.ReactNode',
  },
  {
    property: 'imageStyle',
    description: 'Style for the image container',
    type: 'React.CSSProperties',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function EmptyPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Empty</h1>
        <p className="text-base-content/70">
          Display empty states when there is no data to show.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Empty"
          description="Simple empty state with default styling."
          code={`import React from 'react'
import { Empty } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty />
)

export default App`}
        >
          <Empty />
        </ExampleSection>

        <ExampleSection
          title="Custom Description"
          description="Empty state with custom description text."
          code={`import React from 'react'
import { Empty } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty description="No items found" />
)

export default App`}
        >
          <Empty description="No items found" />
        </ExampleSection>

        <ExampleSection
          title="With Action Button"
          description="Empty state with action button."
          code={`import React from 'react'
import { Empty, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty description="No data available">
    <Button type="primary">Add Data</Button>
  </Empty>
)

export default App`}
        >
          <Empty description="No data available">
            <Button type="primary">Add Data</Button>
          </Empty>
        </ExampleSection>

        <ExampleSection
          title="Custom Image"
          description="Empty state with custom image."
          code={`import React from 'react'
import { Empty } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty
    image={
      <svg
        className="w-16 h-16 mx-auto text-base-content/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    }
    description="No files uploaded"
  />
)

export default App`}
        >
          <Empty
            image={
              <svg
                className="w-16 h-16 mx-auto text-base-content/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            }
            description="No files uploaded"
          />
        </ExampleSection>

        <ExampleSection
          title="In a Card"
          description="Empty state displayed in a card component."
          code={`import React from 'react'
import { Empty, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Recent Activity</h2>
      <Empty description="No recent activity">
        <Button size="sm">View All</Button>
      </Empty>
    </div>
  </div>
)

export default App`}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Recent Activity</h2>
              <Empty description="No recent activity">
                <Button size="sm">View All</Button>
              </Empty>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Search Results"
          description="Empty state for search with no results."
          code={`import React from 'react'
import { Empty, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty
    image={
      <svg
        className="w-16 h-16 mx-auto text-base-content/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    }
    description={
      <span>
        No results found for <strong>"widget"</strong>
      </span>
    }
  >
    <Button>Clear Search</Button>
  </Empty>
)

export default App`}
        >
          <Empty
            image={
              <svg
                className="w-16 h-16 mx-auto text-base-content/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            description={
              <span>
                No results found for <strong>"widget"</strong>
              </span>
            }
          >
            <Button>Clear Search</Button>
          </Empty>
        </ExampleSection>

        <ExampleSection
          title="No Image"
          description="Empty state without any image."
          code={`import React from 'react'
import { Empty, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty image={null} description="Your cart is empty">
    <Button type="primary">Start Shopping</Button>
  </Empty>
)

export default App`}
        >
          <Empty image={null} description="Your cart is empty">
            <Button type="primary">Start Shopping</Button>
          </Empty>
        </ExampleSection>

        <ExampleSection
          title="Multiple Actions"
          description="Empty state with multiple action buttons."
          code={`import React from 'react'
import { Empty, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Empty description="No projects created yet">
    <div className="flex gap-2">
      <Button type="primary">Create Project</Button>
      <Button>Import Project</Button>
    </div>
  </Empty>
)

export default App`}
        >
          <Empty description="No projects created yet">
            <div className="flex gap-2">
              <Button type="primary">Create Project</Button>
              <Button>Import Project</Button>
            </div>
          </Empty>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Empty" data={emptyApi} />
      </div>
    </div>
  )
}
