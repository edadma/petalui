import { Pagination } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'
import { useState } from 'react'

const paginationApi: ApiProperty[] = [
  {
    property: 'current',
    description: 'Current page number (controlled)',
    type: 'number',
  },
  {
    property: 'defaultCurrent',
    description: 'Default initial page number',
    type: 'number',
    default: '1',
  },
  {
    property: 'total',
    description: 'Total number of items',
    type: 'number',
  },
  {
    property: 'pageSize',
    description: 'Number of items per page (controlled)',
    type: 'number',
  },
  {
    property: 'defaultPageSize',
    description: 'Default number of items per page',
    type: 'number',
    default: '10',
  },
  {
    property: 'pageSizeOptions',
    description: 'Options for page size selector',
    type: 'number[]',
    default: '[10, 20, 50, 100]',
  },
  {
    property: 'onChange',
    description: 'Callback when page or pageSize changes',
    type: '(page: number, pageSize: number) => void',
  },
  {
    property: 'onShowSizeChange',
    description: 'Callback when pageSize changes',
    type: '(current: number, size: number) => void',
  },
  {
    property: 'showSizeChanger',
    description: 'Show page size selector',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showQuickJumper',
    description: 'Show quick jump to page input',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'showTotal',
    description: 'Show total count or custom render function',
    type: 'boolean | ((total: number, range: [number, number]) => ReactNode)',
    default: 'false',
  },
  {
    property: 'simple',
    description: 'Simple mode with minimal controls',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'size',
    description: 'Size of pagination buttons',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'disabled',
    description: 'Disable all pagination controls',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function PaginationPage() {
  const [current1, setCurrent1] = useState(1)
  const [current2, setCurrent2] = useState(1)
  const [pageSize2, setPageSize2] = useState(10)
  const [current3, setCurrent3] = useState(1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Pagination</h1>
        <p className="text-base-content/70">Navigate through pages of data.</p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Basic Pagination"
          description="Simple pagination with page numbers."
          code={`import React, { useState } from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      current={current}
      total={85}
      onChange={setCurrent}
    />
  )
}

export default App`}
          noColumnBreak
        >
          <Pagination
            current={current1}
            total={85}
            onChange={(page) => setCurrent1(page)}
          />
        </ExampleSection>

        <ExampleSection
          title="With Size Changer"
          description="Allow users to change page size."
          code={`import React, { useState } from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Pagination
      current={current}
      total={500}
      pageSize={pageSize}
      showSizeChanger
      onChange={(page, size) => {
        setCurrent(page)
        setPageSize(size)
      }}
    />
  )
}

export default App`}
          noColumnBreak
        >
          <Pagination
            current={current2}
            total={500}
            pageSize={pageSize2}
            showSizeChanger
            onChange={(page, size) => {
              setCurrent2(page)
              setPageSize2(size)
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Show Total"
          description="Display total count of items."
          code={`import React from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => (
  <Pagination
    total={250}
    showTotal
  />
)

export default App`}
          noColumnBreak
        >
          <Pagination total={250} showTotal />
        </ExampleSection>

        <ExampleSection
          title="Custom Total"
          description="Custom rendering of total count."
          code={`import React from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => (
  <Pagination
    total={250}
    showTotal={(total, range) =>
      \`Showing \${range[0]}-\${range[1]} of \${total} items\`
    }
  />
)

export default App`}
          noColumnBreak
        >
          <Pagination
            total={250}
            showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`}
          />
        </ExampleSection>

        <ExampleSection
          title="Quick Jumper"
          description="Allow users to jump to a specific page."
          code={`import React from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => (
  <Pagination
    total={500}
    showQuickJumper
  />
)

export default App`}
          noColumnBreak
        >
          <Pagination total={500} showQuickJumper />
        </ExampleSection>

        <ExampleSection
          title="All Features"
          description="Pagination with all features enabled."
          code={`import React, { useState } from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      current={current}
      total={500}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) =>
        \`\${range[0]}-\${range[1]} of \${total}\`
      }
      onChange={setCurrent}
    />
  )
}

export default App`}
          noColumnBreak
        >
          <Pagination
            current={current3}
            total={500}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
            onChange={(page) => setCurrent3(page)}
          />
        </ExampleSection>

        <ExampleSection
          title="Simple Mode"
          description="Minimal pagination with only prev/next controls."
          code={`import React from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => (
  <Pagination
    total={100}
    simple
  />
)

export default App`}
          noColumnBreak
        >
          <Pagination total={100} simple />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Different sizes for pagination controls."
          code={`import React from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="space-y-4">
    <Pagination total={100} size="xs" />
    <Pagination total={100} size="sm" />
    <Pagination total={100} size="md" />
    <Pagination total={100} size="lg" />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="space-y-4">
            <div>
              <div className="text-sm text-base-content/60 mb-2">Extra Small</div>
              <Pagination total={100} size="xs" />
            </div>
            <div>
              <div className="text-sm text-base-content/60 mb-2">Small</div>
              <Pagination total={100} size="sm" />
            </div>
            <div>
              <div className="text-sm text-base-content/60 mb-2">Medium (default)</div>
              <Pagination total={100} size="md" />
            </div>
            <div>
              <div className="text-sm text-base-content/60 mb-2">Large</div>
              <Pagination total={100} size="lg" />
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled state for pagination."
          code={`import React from 'react'
import { Pagination } from '@edadma/petalui'

const App: React.FC = () => (
  <Pagination
    total={100}
    disabled
  />
)

export default App`}
          noColumnBreak
        >
          <Pagination total={100} disabled />
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Pagination" data={paginationApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use <code>showSizeChanger</code> to allow users to change page size</li>
              <li>Use <code>showQuickJumper</code> for quick navigation in large datasets</li>
              <li>Use <code>showTotal</code> to display item count information</li>
              <li>Use <code>simple</code> mode for mobile or compact layouts</li>
              <li>Pagination works great with the Table component</li>
              <li>Consider using controlled mode (<code>current</code> + <code>onChange</code>) for most cases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
