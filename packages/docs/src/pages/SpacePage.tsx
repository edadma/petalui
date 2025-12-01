import { Space, Button, Card, Badge, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const spaceApi: ApiProperty[] = [
  {
    property: 'direction',
    description: 'Layout direction',
    type: "'horizontal' | 'vertical'",
    default: "'vertical'",
  },
  {
    property: 'size',
    description: 'Spacing size between children',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    default: "'md'",
  },
  {
    property: 'align',
    description: 'Alignment of items',
    type: "'start' | 'end' | 'center' | 'baseline' | 'stretch'",
  },
  {
    property: 'wrap',
    description: 'Whether to wrap items (horizontal only)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function SpacePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Space</h1>
        <p className="text-base-content/70">
          Set consistent spacing between components.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Vertical Space"
          description="Default vertical spacing between elements."
          code={`import React from 'react'
import { Space, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space>
    <Button type="primary">Button 1</Button>
    <Button type="secondary">Button 2</Button>
    <Button type="accent">Button 3</Button>
  </Space>
)

export default App`}
        >
          <Space>
            <Button type="primary">Button 1</Button>
            <Button type="secondary">Button 2</Button>
            <Button type="accent">Button 3</Button>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Horizontal Space"
          description="Horizontal spacing between elements."
          code={`import React from 'react'
import { Space, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space direction="horizontal">
    <Button type="primary">Button 1</Button>
    <Button type="secondary">Button 2</Button>
    <Button type="accent">Button 3</Button>
  </Space>
)

export default App`}
        >
          <Space direction="horizontal">
            <Button type="primary">Button 1</Button>
            <Button type="secondary">Button 2</Button>
            <Button type="accent">Button 3</Button>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Control spacing size with the size prop."
          code={`import React from 'react'
import { Space, Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Space size="xs">
      <Badge>Extra Small</Badge>
      <Badge>Spacing</Badge>
    </Space>

    <Space size="sm">
      <Badge>Small</Badge>
      <Badge>Spacing</Badge>
    </Space>

    <Space size="md">
      <Badge>Medium</Badge>
      <Badge>Spacing</Badge>
    </Space>

    <Space size="lg">
      <Badge>Large</Badge>
      <Badge>Spacing</Badge>
    </Space>

    <Space size="xl">
      <Badge>Extra Large</Badge>
      <Badge>Spacing</Badge>
    </Space>
  </>
)

export default App`}
        >
          <Space>
            <Space size="xs" direction="horizontal">
              <Badge>Extra Small</Badge>
              <Badge>Spacing</Badge>
            </Space>

            <Space size="sm" direction="horizontal">
              <Badge>Small</Badge>
              <Badge>Spacing</Badge>
            </Space>

            <Space size="md" direction="horizontal">
              <Badge>Medium</Badge>
              <Badge>Spacing</Badge>
            </Space>

            <Space size="lg" direction="horizontal">
              <Badge>Large</Badge>
              <Badge>Spacing</Badge>
            </Space>

            <Space size="xl" direction="horizontal">
              <Badge>Extra Large</Badge>
              <Badge>Spacing</Badge>
            </Space>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="With Alignment"
          description="Align items within the space."
          code={`import React from 'react'
import { Space, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space direction="horizontal" align="center">
    <Button type="primary" size="xs">Small</Button>
    <Button type="secondary" size="md">Medium</Button>
    <Button type="accent" size="lg">Large</Button>
  </Space>
)

export default App`}
        >
          <Space direction="horizontal" align="center">
            <Button type="primary" size="xs">Small</Button>
            <Button type="secondary" size="md">Medium</Button>
            <Button type="accent" size="lg">Large</Button>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Wrap Items"
          description="Allow items to wrap to the next line."
          code={`import React from 'react'
import { Space, Badge } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space direction="horizontal" wrap>
    <Badge>Tag 1</Badge>
    <Badge>Tag 2</Badge>
    <Badge>Tag 3</Badge>
    <Badge>Tag 4</Badge>
    <Badge>Tag 5</Badge>
    <Badge>Tag 6</Badge>
    <Badge>Tag 7</Badge>
    <Badge>Tag 8</Badge>
  </Space>
)

export default App`}
        >
          <Space direction="horizontal" wrap>
            <Badge>Tag 1</Badge>
            <Badge>Tag 2</Badge>
            <Badge>Tag 3</Badge>
            <Badge>Tag 4</Badge>
            <Badge>Tag 5</Badge>
            <Badge>Tag 6</Badge>
            <Badge>Tag 7</Badge>
            <Badge>Tag 8</Badge>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Nested Spaces"
          description="Combine vertical and horizontal spacing."
          code={`import React from 'react'
import { Space, Card, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space>
    <Card title="Card 1">
      <Space direction="horizontal">
        <Button type="primary" size="sm">Action 1</Button>
        <Button type="secondary" size="sm">Action 2</Button>
      </Space>
    </Card>

    <Card title="Card 2">
      <Space direction="horizontal">
        <Button type="primary" size="sm">Action 1</Button>
        <Button type="secondary" size="sm">Action 2</Button>
      </Space>
    </Card>
  </Space>
)

export default App`}
        >
          <Space>
            <Card title="Card 1">
              <Space direction="horizontal">
                <Button type="primary" size="sm">Action 1</Button>
                <Button type="secondary" size="sm">Action 2</Button>
              </Space>
            </Card>

            <Card title="Card 2">
              <Space direction="horizontal">
                <Button type="primary" size="sm">Action 1</Button>
                <Button type="secondary" size="sm">Action 2</Button>
              </Space>
            </Card>
          </Space>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Space" data={spaceApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use Space to maintain consistent spacing between components</li>
              <li>Vertical spacing is the default direction</li>
              <li>Size maps to Tailwind spacing: xs=1, sm=2, md=4, lg=6, xl=8</li>
              <li>Use align prop with horizontal direction for vertical alignment</li>
              <li>wrap prop only applies to horizontal direction</li>
              <li>Cleaner alternative to manual className="space-y-4" divs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
