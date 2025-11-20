import { Breadcrumbs } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const breadcrumbsApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Breadcrumbs.Item components',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const breadcrumbsItemApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Item content (text or elements)',
    type: 'React.ReactNode',
  },
  {
    property: 'href',
    description: 'Link URL (makes item clickable)',
    type: 'string',
  },
  {
    property: 'onClick',
    description: 'Click handler (makes item clickable)',
    type: '() => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function BreadcrumbsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Breadcrumbs</h1>
        <p className="text-base-content/70">Navigation breadcrumb trail showing hierarchical location.</p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Breadcrumbs"
          description="Simple breadcrumb navigation."
          code={`import React from 'react'
import { Breadcrumbs } from '@edadma/petalui'

const App: React.FC = () => (
  <Breadcrumbs>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/documents">Documents</Breadcrumbs.Item>
    <Breadcrumbs.Item>Add Document</Breadcrumbs.Item>
  </Breadcrumbs>
)

export default App`}
        >
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/documents">Documents</Breadcrumbs.Item>
            <Breadcrumbs.Item>Add Document</Breadcrumbs.Item>
          </Breadcrumbs>
        </ExampleSection>

        <ExampleSection
          title="With Icons"
          description="Breadcrumbs with SVG icons."
          code={`import React from 'react'
import { Breadcrumbs } from '@edadma/petalui'

const App: React.FC = () => (
  <Breadcrumbs>
    <Breadcrumbs.Item href="/">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      Home
    </Breadcrumbs.Item>
    <Breadcrumbs.Item href="/documents">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      Documents
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Add Document
    </Breadcrumbs.Item>
  </Breadcrumbs>
)

export default App`}
        >
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Home
            </Breadcrumbs.Item>
            <Breadcrumbs.Item href="/documents">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Documents
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Add Document
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </ExampleSection>

        <ExampleSection
          title="Max Width with Scroll"
          description="Breadcrumbs with overflow scrolling."
          code={`import React from 'react'
import { Breadcrumbs } from '@edadma/petalui'

const App: React.FC = () => (
  <Breadcrumbs className="max-w-xs">
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/documents">Documents</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/team">Team</Breadcrumbs.Item>
    <Breadcrumbs.Item>Add New Member</Breadcrumbs.Item>
  </Breadcrumbs>
)

export default App`}
        >
          <Breadcrumbs className="max-w-xs">
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/documents">Documents</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/team">Team</Breadcrumbs.Item>
            <Breadcrumbs.Item>Add New Member</Breadcrumbs.Item>
          </Breadcrumbs>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Breadcrumbs" data={breadcrumbsApi} />

        <ApiTable title="Breadcrumbs.Item" data={breadcrumbsItemApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Omit href/onClick on the last item to show current location</li>
              <li>Use max-width classes to enable horizontal scrolling</li>
              <li>Add icons by including SVG elements alongside text</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
