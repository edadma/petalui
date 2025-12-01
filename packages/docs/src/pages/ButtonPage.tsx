import { Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const buttonApi: ApiProperty[] = [
  {
    property: 'type',
    description: 'Button color type',
    type: "'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'ghost' | 'link'",
    default: 'undefined',
  },
  {
    property: 'size',
    description: 'Button size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'outline',
    description: 'Outline style variant',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'dash',
    description: 'Dashed border variant',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'soft',
    description: 'Muted color background variant',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'active',
    description: 'Active state',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'loading',
    description: 'Show loading spinner',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'shape',
    description: 'Button shape',
    type: "'square' | 'circle' | 'wide' | 'block'",
  },
  {
    property: 'noAnimation',
    description: 'Disable click animation',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'disabled',
    description: 'Disabled state',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Button content',
    type: 'ReactNode',
  },
  {
    property: 'href',
    description: 'URL to navigate to (renders as anchor element)',
    type: 'string',
  },
  {
    property: 'target',
    description: 'Where to open the linked URL (when href is set)',
    type: 'string',
  },
  {
    property: 'htmlType',
    description: 'HTML button type (only when href is not set)',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
  },
]

export function ButtonPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Button</h1>
        <p className="text-base-content/70">
          Versatile button component with DaisyUI styling and many variants.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
        title="Brand Colors"
        description="Primary brand colors for common actions."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary">Primary</Button>
    <Button type="secondary">Secondary</Button>
    <Button type="accent">Accent</Button>
    <Button type="neutral">Neutral</Button>
  </div>
)

export default App`}
      >
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="accent">Accent</Button>
        <Button type="neutral">Neutral</Button>
      </ExampleSection>

      <ExampleSection
        title="State Colors"
        description="Semantic colors for different states and feedback."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>
)

export default App`}
      >
        <Button type="info">Info</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="error">Error</Button>
      </ExampleSection>

      <ExampleSection
        title="Minimal Styles"
        description="Ghost and link variants for subtle actions."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="ghost">Ghost</Button>
    <Button type="link">Link</Button>
    <Button>No Type</Button>
  </div>
)

export default App`}
      >
        <Button type="ghost">Ghost</Button>
        <Button type="link">Link</Button>
        <Button>No Type</Button>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Five sizes: xs, sm, md (default), lg, and xl."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 items-center flex-wrap">
    <Button size="xs">XS</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">XL</Button>
  </div>
)

export default App`}
      >
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
      </ExampleSection>

      <ExampleSection
        title="Outline"
        description="Outline variant with transparent background."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary" outline>Primary</Button>
    <Button type="secondary" outline>Secondary</Button>
    <Button type="accent" outline>Accent</Button>
  </div>
)

export default App`}
      >
        <Button type="primary" outline>Primary</Button>
        <Button type="secondary" outline>Secondary</Button>
        <Button type="accent" outline>Accent</Button>
      </ExampleSection>

      <ExampleSection
        title="Dashed Border"
        description="Buttons with dashed border styling."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary" dash>Primary</Button>
    <Button type="secondary" dash>Secondary</Button>
    <Button type="accent" dash>Accent</Button>
  </div>
)

export default App`}
      >
        <Button type="primary" dash>Primary</Button>
        <Button type="secondary" dash>Secondary</Button>
        <Button type="accent" dash>Accent</Button>
      </ExampleSection>

      <ExampleSection
        title="Soft Colors"
        description="Muted color backgrounds for subtle emphasis."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary" soft>Primary</Button>
    <Button type="secondary" soft>Secondary</Button>
    <Button type="accent" soft>Accent</Button>
    <Button type="success" soft>Success</Button>
    <Button type="warning" soft>Warning</Button>
  </div>
)

export default App`}
      >
        <Button type="primary" soft>Primary</Button>
        <Button type="secondary" soft>Secondary</Button>
        <Button type="accent" soft>Accent</Button>
        <Button type="success" soft>Success</Button>
        <Button type="warning" soft>Warning</Button>
      </ExampleSection>

      <ExampleSection
        title="States"
        description="Active, loading, and disabled states."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary">Normal</Button>
    <Button type="primary" active>Active</Button>
    <Button type="primary" loading>Loading</Button>
    <Button type="primary" disabled>Disabled</Button>
  </div>
)

export default App`}
      >
        <Button type="primary">Normal</Button>
        <Button type="primary" active>Active</Button>
        <Button type="primary" loading>Loading</Button>
        <Button type="primary" disabled>Disabled</Button>
      </ExampleSection>

      <ExampleSection
        title="Shapes"
        description="Square and circle shapes for icon buttons."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 items-center flex-wrap">
    <Button type="primary" shape="square">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </Button>
    <Button type="primary" shape="circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </Button>
  </div>
)

export default App`}
      >
        <Button type="primary" shape="square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </Button>
        <Button type="primary" shape="circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </Button>
      </ExampleSection>

      <ExampleSection
        title="Wide"
        description="Extra wide buttons for emphasis."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Button type="primary" shape="wide">Wide Button</Button>
    <Button type="secondary" shape="wide">Another Wide</Button>
  </div>
)

export default App`}
      >
        <Button type="primary" shape="wide">Wide Button</Button>
        <Button type="secondary" shape="wide">Another Wide</Button>
      </ExampleSection>

      <ExampleSection
        title="Block"
        description="Full width buttons."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Button type="primary" shape="block">Block Button</Button>
    <Button type="secondary" shape="block">Another Block</Button>
  </div>
)

export default App`}
      >
        <Button type="primary" shape="block">Block Button</Button>
        <Button type="secondary" shape="block">Another Block</Button>
      </ExampleSection>

      <ExampleSection
        title="Loading States"
        description="Loading spinner with different colors."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary" loading>Loading</Button>
    <Button type="success" loading>Processing</Button>
    <Button type="error" loading>Deleting</Button>
  </div>
)

export default App`}
      >
        <Button type="primary" loading>Loading</Button>
        <Button type="success" loading>Processing</Button>
        <Button type="error" loading>Deleting</Button>
      </ExampleSection>

      <ExampleSection
        title="Link Buttons"
        description="Buttons that navigate to URLs. Renders as anchor element when href is provided."
        code={`import React from 'react'
import { Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    <Button type="primary" href="https://github.com/edadma/bloomui" target="_blank">
      GitHub
    </Button>
    <Button type="ghost" href="https://www.npmjs.com/package/@edadma/bloomui" target="_blank">
      npm
    </Button>
    <Button href="/components" type="link">
      Internal Link
    </Button>
  </div>
)

export default App`}
      >
        <Button type="primary" href="https://github.com/edadma/bloomui" target="_blank">GitHub</Button>
        <Button type="ghost" href="https://www.npmjs.com/package/@edadma/bloomui" target="_blank">npm</Button>
        <Button href="#" type="link">Internal Link</Button>
      </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Button" data={buttonApi} />
      </div>
    </div>
  )
}
