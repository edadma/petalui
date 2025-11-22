import { Skeleton } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const skeletonApi: ApiProperty[] = [
  {
    property: 'width',
    description: 'Width in pixels or CSS string',
    type: 'string | number',
  },
  {
    property: 'height',
    description: 'Height in pixels or CSS string',
    type: 'string | number',
  },
  {
    property: 'circle',
    description: 'Make skeleton circular',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'variant',
    description: 'Skeleton variant',
    type: "'default' | 'text'",
    default: "'default'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Content (for text variant)',
    type: 'React.ReactNode',
  },
]

export function SkeletonPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Skeleton</h1>
        <p className="text-base-content/70">
          Animated loading placeholders for content.
        </p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Basic"
          description="Simple skeleton shapes with different dimensions."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex flex-col gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Circle"
          description="Circular skeleton for avatars."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Skeleton circle className="h-12 w-12" />
    <Skeleton circle className="h-16 w-16" />
    <Skeleton circle className="h-20 w-20" />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4">
            <Skeleton circle className="h-12 w-12" />
            <Skeleton circle className="h-16 w-16" />
            <Skeleton circle className="h-20 w-20" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Text Variant"
          description="Skeleton that animates text color instead of background."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Skeleton variant="text" className="text-2xl">
      Loading heading...
    </Skeleton>
    <Skeleton variant="text">
      Loading paragraph text that will be replaced with actual content...
    </Skeleton>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className="text-2xl">
              Loading heading...
            </Skeleton>
            <Skeleton variant="text">
              Loading paragraph text that will be replaced with actual content...
            </Skeleton>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Width and Height Props"
          description="Use width and height props for precise sizing."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Skeleton width={100} height={100} />
    <Skeleton width="200px" height="100px" />
    <Skeleton width="50%" height={100} />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4">
            <Skeleton width={100} height={100} />
            <Skeleton width="200px" height="100px" />
            <Skeleton width="50%" height={100} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Avatar with Text"
          description="Common pattern for user profiles."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Skeleton circle className="h-12 w-12 shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4">
            <Skeleton circle className="h-12 w-12 shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Card Skeleton"
          description="Loading placeholder for card content."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="card bg-base-100 border border-base-300">
    <div className="card-body">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="List Skeleton"
          description="Loading placeholder for list items."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4">
        <Skeleton circle className="h-12 w-12 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    ))}
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton circle className="h-12 w-12 shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </ExampleSection>

        <ExampleSection
          title="Complex Layout"
          description="Skeleton for more complex content layouts."
          code={`import React from 'react'
import { Skeleton } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="space-y-6">
    <div className="flex gap-4">
      <Skeleton circle className="h-16 w-16 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="space-y-6">
            <div className="flex gap-4">
              <Skeleton circle className="h-16 w-16 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Skeleton" data={skeletonApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use Skeleton to improve perceived performance during data loading</li>
              <li>Match skeleton shapes to your actual content layout</li>
              <li>Combine multiple skeletons to create realistic loading states</li>
              <li>Use the circle prop for avatar placeholders</li>
              <li>Use variant="text" to animate text content placeholders</li>
              <li>Prefer className with Tailwind utilities for responsive sizing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
