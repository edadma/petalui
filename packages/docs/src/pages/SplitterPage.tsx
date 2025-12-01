import { useState } from 'react'
import { Splitter, Menu, Button, Space, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const splitterApi: ApiProperty[] = [
  {
    property: 'direction',
    description: 'Direction of the splitter',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
  },
  {
    property: 'sizes',
    description: 'Controlled panel sizes as percentages',
    type: 'number[]',
  },
  {
    property: 'defaultSizes',
    description: 'Default panel sizes as percentages (uncontrolled)',
    type: 'number[]',
  },
  {
    property: 'onSizesChange',
    description: 'Callback when sizes change',
    type: '(sizes: number[]) => void',
  },
  {
    property: 'gutterSize',
    description: 'Size of the draggable gutter in pixels',
    type: 'number',
    default: '8',
  },
  {
    property: 'minSize',
    description: 'Default minimum panel size in pixels',
    type: 'number',
    default: '50',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const panelApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Panel content',
    type: 'React.ReactNode',
  },
  {
    property: 'defaultSize',
    description: 'Default size percentage',
    type: 'number',
  },
  {
    property: 'size',
    description: 'Controlled size percentage',
    type: 'number',
  },
  {
    property: 'minSize',
    description: 'Minimum size in pixels',
    type: 'number',
  },
  {
    property: 'maxSize',
    description: 'Maximum size in pixels',
    type: 'number',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function SplitterPage() {
  const [sizes, setSizes] = useState([30, 70])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Splitter</h1>
        <p className="text-base-content/70">
          Create resizable split panes with draggable dividers. Supports horizontal and vertical layouts.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Horizontal Splitter"
          description="Drag the divider to resize the panels."
          code={`import React from 'react'
import { Splitter } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
    <Splitter>
      <Splitter.Panel>
        <div className="p-4 bg-base-200 h-full">
          <h3 className="font-semibold">Left Panel</h3>
          <p className="text-sm text-base-content/70 mt-2">
            Drag the divider to resize.
          </p>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="p-4 h-full">
          <h3 className="font-semibold">Right Panel</h3>
          <p className="text-sm text-base-content/70 mt-2">
            Content on the right side.
          </p>
        </div>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
            <Splitter>
              <Splitter.Panel>
                <div className="p-4 bg-base-200 h-full">
                  <h3 className="font-semibold">Left Panel</h3>
                  <p className="text-sm text-base-content/70 mt-2">
                    Drag the divider to resize.
                  </p>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="p-4 h-full">
                  <h3 className="font-semibold">Right Panel</h3>
                  <p className="text-sm text-base-content/70 mt-2">
                    Content on the right side.
                  </p>
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Vertical Splitter"
          description="Split panels vertically."
          code={`import React from 'react'
import { Splitter } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
    <Splitter direction="vertical">
      <Splitter.Panel>
        <div className="p-4 bg-base-200 h-full">
          <h3 className="font-semibold">Top Panel</h3>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="p-4 h-full">
          <h3 className="font-semibold">Bottom Panel</h3>
        </div>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
            <Splitter direction="vertical">
              <Splitter.Panel>
                <div className="p-4 bg-base-200 h-full">
                  <h3 className="font-semibold">Top Panel</h3>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="p-4 h-full">
                  <h3 className="font-semibold">Bottom Panel</h3>
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Controlled Sizes"
          description="Control panel sizes programmatically."
          code={`import React, { useState } from 'react'
import { Splitter, Button, Space } from '@edadma/bloomui'

const App: React.FC = () => {
  const [sizes, setSizes] = useState([30, 70])

  return (
    <div>
      <Space className="mb-4">
        <Button size="sm" onClick={() => setSizes([20, 80])}>20/80</Button>
        <Button size="sm" onClick={() => setSizes([50, 50])}>50/50</Button>
        <Button size="sm" onClick={() => setSizes([80, 20])}>80/20</Button>
      </Space>
      <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
        <Splitter sizes={sizes} onSizesChange={setSizes}>
          <Splitter.Panel>
            <div className="p-4 bg-primary/10 h-full">
              {sizes[0].toFixed(0)}%
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 bg-secondary/10 h-full">
              {sizes[1].toFixed(0)}%
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
    </div>
  )
}

export default App`}
        >
          <div>
            <Space className="mb-4">
              <Button size="sm" onClick={() => setSizes([20, 80])}>20/80</Button>
              <Button size="sm" onClick={() => setSizes([50, 50])}>50/50</Button>
              <Button size="sm" onClick={() => setSizes([80, 20])}>80/20</Button>
            </Space>
            <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
              <Splitter sizes={sizes} onSizesChange={setSizes}>
                <Splitter.Panel>
                  <div className="p-4 bg-primary/10 h-full">
                    {sizes[0].toFixed(0)}%
                  </div>
                </Splitter.Panel>
                <Splitter.Panel>
                  <div className="p-4 bg-secondary/10 h-full">
                    {sizes[1].toFixed(0)}%
                  </div>
                </Splitter.Panel>
              </Splitter>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multiple Panels"
          description="Split into more than two panels."
          code={`import React from 'react'
import { Splitter } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
    <Splitter defaultSizes={[25, 50, 25]}>
      <Splitter.Panel>
        <div className="p-4 bg-primary/10 h-full">Panel 1</div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="p-4 bg-secondary/10 h-full">Panel 2</div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="p-4 bg-accent/10 h-full">Panel 3</div>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
            <Splitter defaultSizes={[25, 50, 25]}>
              <Splitter.Panel>
                <div className="p-4 bg-primary/10 h-full">Panel 1</div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="p-4 bg-secondary/10 h-full">Panel 2</div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="p-4 bg-accent/10 h-full">Panel 3</div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Min/Max Sizes"
          description="Constrain panel sizes with min and max values."
          code={`import React from 'react'
import { Splitter } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
    <Splitter>
      <Splitter.Panel minSize={100} maxSize={300}>
        <div className="p-4 bg-warning/10 h-full">
          <p className="text-sm">Min: 100px, Max: 300px</p>
        </div>
      </Splitter.Panel>
      <Splitter.Panel minSize={150}>
        <div className="p-4 bg-info/10 h-full">
          <p className="text-sm">Min: 150px</p>
        </div>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
            <Splitter>
              <Splitter.Panel minSize={100} maxSize={300}>
                <div className="p-4 bg-warning/10 h-full">
                  <p className="text-sm">Min: 100px, Max: 300px</p>
                </div>
              </Splitter.Panel>
              <Splitter.Panel minSize={150}>
                <div className="p-4 bg-info/10 h-full">
                  <p className="text-sm">Min: 150px</p>
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Nested Splitters"
          description="Combine horizontal and vertical splitters."
          code={`import React from 'react'
import { Splitter } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-72 border border-base-300 rounded-lg overflow-hidden">
    <Splitter defaultSizes={[30, 70]}>
      <Splitter.Panel>
        <div className="p-4 bg-base-200 h-full">
          <h3 className="font-semibold">Sidebar</h3>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <Splitter direction="vertical" defaultSizes={[60, 40]}>
          <Splitter.Panel>
            <div className="p-4 h-full">
              <h3 className="font-semibold">Main Content</h3>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 bg-base-200 h-full">
              <h3 className="font-semibold">Terminal</h3>
            </div>
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-72 border border-base-300 rounded-lg overflow-hidden">
            <Splitter defaultSizes={[30, 70]}>
              <Splitter.Panel>
                <div className="p-4 bg-base-200 h-full">
                  <h3 className="font-semibold">Sidebar</h3>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <Splitter direction="vertical" defaultSizes={[60, 40]}>
                  <Splitter.Panel>
                    <div className="p-4 h-full">
                      <h3 className="font-semibold">Main Content</h3>
                    </div>
                  </Splitter.Panel>
                  <Splitter.Panel>
                    <div className="p-4 bg-base-200 h-full">
                      <h3 className="font-semibold">Terminal</h3>
                    </div>
                  </Splitter.Panel>
                </Splitter>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Gutter Size"
          description="Adjust the gutter (divider) size."
          code={`import React from 'react'
import { Splitter } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
    <Splitter gutterSize={12}>
      <Splitter.Panel>
        <div className="p-4 bg-success/10 h-full">
          Wide gutter (12px)
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="p-4 bg-error/10 h-full">
          Easier to grab
        </div>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
            <Splitter gutterSize={12}>
              <Splitter.Panel>
                <div className="p-4 bg-success/10 h-full">
                  Wide gutter (12px)
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="p-4 bg-error/10 h-full">
                  Easier to grab
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>

        <ExampleSection
          title="IDE-Style Layout"
          description="Complex layout similar to an IDE."
          code={`import React from 'react'
import { Splitter, Menu, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="h-80 border border-base-300 rounded-lg overflow-hidden">
    <Splitter defaultSizes={[20, 80]}>
      <Splitter.Panel minSize={150}>
        <div className="h-full bg-base-200">
          <div className="p-2 border-b border-base-300 font-semibold text-sm">
            Explorer
          </div>
          <Menu>
            <Menu.Item>src/</Menu.Item>
            <Menu.Item>components/</Menu.Item>
            <Menu.Item>App.tsx</Menu.Item>
            <Menu.Item>index.ts</Menu.Item>
          </Menu>
        </div>
      </Splitter.Panel>
      <Splitter.Panel>
        <Splitter direction="vertical" defaultSizes={[70, 30]}>
          <Splitter.Panel>
            <div className="h-full p-4">
              <div className="font-mono text-sm">
                <span className="text-purple-500">import</span> React{' '}
                <span className="text-purple-500">from</span>{' '}
                <span className="text-green-500">'react'</span>
              </div>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="h-full bg-base-300 p-2">
              <div className="text-xs font-mono text-base-content/70">
                $ npm run build
              </div>
            </div>
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  </div>
)

export default App`}
        >
          <div className="h-80 border border-base-300 rounded-lg overflow-hidden">
            <Splitter defaultSizes={[20, 80]}>
              <Splitter.Panel minSize={150}>
                <div className="h-full bg-base-200">
                  <div className="p-2 border-b border-base-300 font-semibold text-sm">
                    Explorer
                  </div>
                  <Menu>
                    <Menu.Item>src/</Menu.Item>
                    <Menu.Item>components/</Menu.Item>
                    <Menu.Item>App.tsx</Menu.Item>
                    <Menu.Item>index.ts</Menu.Item>
                  </Menu>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <Splitter direction="vertical" defaultSizes={[70, 30]}>
                  <Splitter.Panel>
                    <div className="h-full p-4">
                      <div className="font-mono text-sm">
                        <span className="text-purple-500">import</span> React{' '}
                        <span className="text-purple-500">from</span>{' '}
                        <span className="text-green-500">'react'</span>
                      </div>
                    </div>
                  </Splitter.Panel>
                  <Splitter.Panel>
                    <div className="h-full bg-base-300 p-2">
                      <div className="text-xs font-mono text-base-content/70">
                        $ npm run build
                      </div>
                    </div>
                  </Splitter.Panel>
                </Splitter>
              </Splitter.Panel>
            </Splitter>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Splitter" data={splitterApi} />
        <ApiTable title="Splitter.Panel" data={panelApi} />
      </div>
    </div>
  )
}
