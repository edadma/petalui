import { Link } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const linkApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Link text content',
    type: 'React.ReactNode',
  },
  {
    property: 'href',
    description: 'Link URL',
    type: 'string',
  },
  {
    property: 'color',
    description: 'Link color variant',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'hover',
    description: 'Only show underline on hover',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function LinkPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Link</h1>
        <p className="text-base-content/70">Styled anchor links with underline and color variants.</p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Link"
          description="Simple link with underline."
          code={`import React from 'react'
import { Link } from '@edadma/petalui'

const App: React.FC = () => (
  <Link href="#">I'm a simple link</Link>
)

export default App`}
        >
          <Link href="#">I'm a simple link</Link>
        </ExampleSection>

        <ExampleSection
          title="Hover Effect"
          description="Link with underline only on hover."
          code={`import React from 'react'
import { Link } from '@edadma/petalui'

const App: React.FC = () => (
  <Link href="#" hover>
    Hover to see underline
  </Link>
)

export default App`}
        >
          <Link href="#" hover>
            Hover to see underline
          </Link>
        </ExampleSection>

        <ExampleSection
          title="Color Variants"
          description="Links in different semantic colors."
          code={`import React from 'react'
import { Link } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Link href="#" color="neutral">Neutral link</Link>
    <Link href="#" color="primary">Primary link</Link>
    <Link href="#" color="secondary">Secondary link</Link>
    <Link href="#" color="accent">Accent link</Link>
    <Link href="#" color="success">Success link</Link>
    <Link href="#" color="info">Info link</Link>
    <Link href="#" color="warning">Warning link</Link>
    <Link href="#" color="error">Error link</Link>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-2">
            <Link href="#" color="neutral">
              Neutral link
            </Link>
            <Link href="#" color="primary">
              Primary link
            </Link>
            <Link href="#" color="secondary">
              Secondary link
            </Link>
            <Link href="#" color="accent">
              Accent link
            </Link>
            <Link href="#" color="success">
              Success link
            </Link>
            <Link href="#" color="info">
              Info link
            </Link>
            <Link href="#" color="warning">
              Warning link
            </Link>
            <Link href="#" color="error">
              Error link
            </Link>
          </div>
        </ExampleSection>

        <ExampleSection
          title="In Text"
          description="Links within paragraph text."
          code={`import React from 'react'
import { Link } from '@edadma/petalui'

const App: React.FC = () => (
  <p>
    Visit our{' '}
    <Link href="#" color="primary">
      documentation
    </Link>{' '}
    to learn more about all the features.
  </p>
)

export default App`}
        >
          <p>
            Visit our{' '}
            <Link href="#" color="primary">
              documentation
            </Link>{' '}
            to learn more about all the features.
          </p>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Link" data={linkApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use hover prop for cleaner text appearance with underline on interaction</li>
              <li>Choose colors that match your semantic intent (error for dangerous actions, etc.)</li>
              <li>Works with all standard anchor attributes (target, rel, etc.)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
