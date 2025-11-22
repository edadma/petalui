import { Card, Button, Badge } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const cardApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Card body content',
    type: 'React.ReactNode',
  },
  {
    property: 'title',
    description: 'Card title (renders automatically)',
    type: 'React.ReactNode',
  },
  {
    property: 'cover',
    description: 'Cover image or media element',
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
  {
    property: 'style',
    description: 'Inline styles',
    type: 'React.CSSProperties',
  },
  {
    property: 'size',
    description: 'Card size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'bordered',
    description: 'Add border to card',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'side',
    description: 'Place cover beside content (horizontal layout)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'imageFull',
    description: 'Make cover image a full background overlay',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'actionsJustify',
    description: 'Horizontal alignment of actions',
    type: "'start' | 'center' | 'end'",
    default: "'end'",
  },
]

export function CardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Card</h1>
        <p className="text-base-content/70">
          Container component for grouping related content with optional images, titles, and actions.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Card"
          description="Simple card with title and content."
          code={`import React from 'react'
import { Card } from '@edadma/petalui'

const App: React.FC = () => (
  <Card title="Card Title" className="w-96">
    <p>This is a basic card with some content inside it.</p>
  </Card>
)

export default App`}
        >
          <Card title="Card Title" className="w-96">
            <p>This is a basic card with some content inside it.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Card with Image"
          description="Card with a cover image at the top."
          code={`import React from 'react'
import { Card } from '@edadma/petalui'

const App: React.FC = () => (
  <Card
    title="Image Card"
    cover={<img src="https://picsum.photos/400/200" alt="Placeholder" />}
    className="w-96"
  >
    <p>A card with an image positioned at the top.</p>
  </Card>
)

export default App`}
        >
          <Card
            title="Image Card"
            cover={<img src="https://picsum.photos/400/200" alt="Placeholder" />}
            className="w-96"
          >
            <p>A card with an image positioned at the top.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Card with Actions"
          description="Card with action buttons."
          code={`import React from 'react'
import { Card, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Card
    title="Action Card"
    actions={
      <>
        <Button type="primary">Accept</Button>
        <Button type="ghost">Decline</Button>
      </>
    }
    className="w-96"
  >
    <p>Card with buttons in the actions area.</p>
  </Card>
)

export default App`}
        >
          <Card
            title="Action Card"
            actions={
              <>
                <Button type="primary">Accept</Button>
                <Button type="ghost">Decline</Button>
              </>
            }
            className="w-96"
          >
            <p>Card with buttons in the actions area.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Bordered Card"
          description="Card with a border."
          code={`import React from 'react'
import { Card } from '@edadma/petalui'

const App: React.FC = () => (
  <Card title="Bordered Card" className="w-96" bordered>
    <p>This card has a border around it.</p>
  </Card>
)

export default App`}
        >
          <Card title="Bordered Card" className="w-96" bordered>
            <p>This card has a border around it.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Card Sizes"
          description="Cards in different sizes."
          code={`import React from 'react'
import { Card } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Card title="Extra Small" size="xs" bordered className="w-96">
      <p>Compact card with minimal padding.</p>
    </Card>
    <Card title="Small" size="sm" bordered className="w-96">
      <p>Small card with reduced padding.</p>
    </Card>
    <Card title="Large" size="lg" bordered className="w-96">
      <p>Large card with increased padding.</p>
    </Card>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4 w-96">
            <Card title="Extra Small" size="xs" bordered>
              <p>Compact card with minimal padding.</p>
            </Card>
            <Card title="Small" size="sm" bordered>
              <p>Small card with reduced padding.</p>
            </Card>
            <Card title="Large" size="lg" bordered>
              <p>Large card with increased padding.</p>
            </Card>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Side Layout"
          description="Horizontal card with image on the side."
          code={`import React from 'react'
import { Card, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Card
    title="Side Card"
    cover={
      <img
        src="https://picsum.photos/200/300"
        alt="Placeholder"
        className="w-32 h-full object-cover"
      />
    }
    actions={<Button type="primary">Buy Now</Button>}
    side
    className="w-96"
  >
    <p>Image positioned beside the content.</p>
  </Card>
)

export default App`}
        >
          <Card
            title="Side Card"
            cover={
              <img
                src="https://picsum.photos/200/300"
                alt="Placeholder"
                className="w-32 h-full object-cover"
              />
            }
            actions={<Button type="primary">Buy Now</Button>}
            side
            className="w-96"
          >
            <p>Image positioned beside the content.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Full Background Image"
          description="Card with image as full background overlay."
          code={`import React from 'react'
import { Card, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Card
    title="Overlay Card"
    cover={<img src="https://picsum.photos/400/300" alt="Placeholder" />}
    actions={<Button type="primary">View Details</Button>}
    imageFull
    className="w-96 h-64 text-neutral-content"
  >
    <p>Text appears over the background image.</p>
  </Card>
)

export default App`}
        >
          <Card
            title="Overlay Card"
            cover={<img src="https://picsum.photos/400/300" alt="Placeholder" />}
            actions={<Button type="primary">View Details</Button>}
            imageFull
            className="w-96 h-64 text-neutral-content"
          >
            <p>Text appears over the background image.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Card with Badge in Title"
          description="Card with badge in title using ReactNode."
          code={`import React from 'react'
import { Card, Badge, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Card
    title={
      <>
        New Product
        <Badge type="primary" content="NEW" size="sm" />
      </>
    }
    actions={<Button type="primary">Learn More</Button>}
    bordered
    className="w-96"
  >
    <p>Check out our latest offering with special features.</p>
  </Card>
)

export default App`}
        >
          <Card
            title={
              <>
                New Product
                <Badge type="primary" content="NEW" size="sm" />
              </>
            }
            actions={<Button type="primary">Learn More</Button>}
            bordered
            className="w-96"
          >
            <p>Check out our latest offering with special features.</p>
          </Card>
        </ExampleSection>

        <ExampleSection
          title="Custom Colors"
          description="Card with custom background colors using className."
          code={`import React from 'react'
import { Card } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Card
      title="Primary Card"
      className="w-96 bg-primary text-primary-content"
    >
      <p>Card with primary background color.</p>
    </Card>
    <Card
      title="Neutral Card"
      className="w-96 bg-neutral text-neutral-content"
    >
      <p>Card with neutral background color.</p>
    </Card>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4 w-96">
            <Card title="Primary Card" className="bg-primary text-primary-content">
              <p>Card with primary background color.</p>
            </Card>
            <Card title="Neutral Card" className="bg-neutral text-neutral-content">
              <p>Card with neutral background color.</p>
            </Card>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Action Alignment"
          description="Different action button alignments."
          code={`import React from 'react'
import { Card, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Card
      title="Left Actions"
      actions={<Button type="primary" size="sm">Left</Button>}
      actionsJustify="start"
      bordered
      className="w-96"
    >
      <p>Actions aligned to the left.</p>
    </Card>
    <Card
      title="Center Actions"
      actions={<Button type="primary" size="sm">Center</Button>}
      actionsJustify="center"
      bordered
      className="w-96"
    >
      <p>Actions aligned to the center.</p>
    </Card>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4 w-96">
            <Card
              title="Left Actions"
              actions={<Button type="primary" size="sm">Left</Button>}
              actionsJustify="start"
              bordered
            >
              <p>Actions aligned to the left.</p>
            </Card>
            <Card
              title="Center Actions"
              actions={<Button type="primary" size="sm">Center</Button>}
              actionsJustify="center"
              bordered
            >
              <p>Actions aligned to the center.</p>
            </Card>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Inline Styles"
          description="Card with inline styles using style prop."
          code={`import React from 'react'
import { Card } from '@edadma/petalui'

const App: React.FC = () => (
  <Card
    title="Custom Styled Card"
    style={{ border: '2px dashed currentColor' }}
    className="w-96"
  >
    <p>This card uses inline styles for custom borders.</p>
  </Card>
)

export default App`}
        >
          <Card
            title="Custom Styled Card"
            style={{ border: '2px dashed currentColor' }}
            className="w-96"
          >
            <p>This card uses inline styles for custom borders.</p>
          </Card>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Card" data={cardApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>
                Pass content directly as children - no need for Card.Body wrapper
              </li>
              <li>
                Use <code>title</code> prop instead of Card.Title component
              </li>
              <li>
                Use <code>cover</code> prop for images instead of Card.Figure
              </li>
              <li>
                Use <code>actions</code> prop for buttons instead of Card.Actions
              </li>
              <li>
                Combine with Tailwind utility classes via <code>className</code> for custom styling
              </li>
              <li>
                Use <code>style</code> prop for inline styles when needed
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
