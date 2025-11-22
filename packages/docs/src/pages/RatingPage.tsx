import { Rating } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'
import { useState } from 'react'

const ratingApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Rating.Item components',
    type: 'React.ReactNode',
  },
  {
    property: 'value',
    description: 'Controlled rating value',
    type: 'number',
  },
  {
    property: 'defaultValue',
    description: 'Default rating value (uncontrolled)',
    type: 'number',
    default: '0',
  },
  {
    property: 'onChange',
    description: 'Callback when rating changes',
    type: '(value: number) => void',
  },
  {
    property: 'size',
    description: 'Rating size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
  },
  {
    property: 'readOnly',
    description: 'Display as read-only (non-interactive)',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const ratingItemApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Rating value this item represents',
    type: 'number',
  },
  {
    property: 'mask',
    description: 'Shape of the rating icon',
    type: "'star' | 'star-2' | 'heart'",
    default: "'star'",
  },
  {
    property: 'color',
    description: 'Tailwind background color class',
    type: 'string',
    default: "'bg-warning'",
  },
  {
    property: 'hidden',
    description: 'Hidden item for clearing rating',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function RatingPage() {
  const [rating, setRating] = useState(0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Rating</h1>
        <p className="text-base-content/70">Star ratings for user feedback and reviews.</p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Rating"
          description="Simple 5-star rating."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <Rating defaultValue={3}>
    <Rating.Item value={1} />
    <Rating.Item value={2} />
    <Rating.Item value={3} />
    <Rating.Item value={4} />
    <Rating.Item value={5} />
  </Rating>
)

export default App`}
        >
          <Rating defaultValue={3}>
            <Rating.Item value={1} />
            <Rating.Item value={2} />
            <Rating.Item value={3} />
            <Rating.Item value={4} />
            <Rating.Item value={5} />
          </Rating>
        </ExampleSection>

        <ExampleSection
          title="With Hidden Clear"
          description="Hidden first item allows clearing rating."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <Rating defaultValue={0}>
    <Rating.Item value={0} hidden />
    <Rating.Item value={1} />
    <Rating.Item value={2} />
    <Rating.Item value={3} />
    <Rating.Item value={4} />
    <Rating.Item value={5} />
  </Rating>
)

export default App`}
        >
          <Rating defaultValue={0}>
            <Rating.Item value={0} hidden />
            <Rating.Item value={1} />
            <Rating.Item value={2} />
            <Rating.Item value={3} />
            <Rating.Item value={4} />
            <Rating.Item value={5} />
          </Rating>
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Rating in various sizes."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Rating size="xs" defaultValue={3}>
      <Rating.Item value={1} />
      <Rating.Item value={2} />
      <Rating.Item value={3} />
      <Rating.Item value={4} />
      <Rating.Item value={5} />
    </Rating>
    <Rating size="sm" defaultValue={3}>
      <Rating.Item value={1} />
      <Rating.Item value={2} />
      <Rating.Item value={3} />
      <Rating.Item value={4} />
      <Rating.Item value={5} />
    </Rating>
    <Rating size="md" defaultValue={3}>
      <Rating.Item value={1} />
      <Rating.Item value={2} />
      <Rating.Item value={3} />
      <Rating.Item value={4} />
      <Rating.Item value={5} />
    </Rating>
    <Rating size="lg" defaultValue={3}>
      <Rating.Item value={1} />
      <Rating.Item value={2} />
      <Rating.Item value={3} />
      <Rating.Item value={4} />
      <Rating.Item value={5} />
    </Rating>
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <Rating size="xs" defaultValue={3}>
              <Rating.Item value={1} />
              <Rating.Item value={2} />
              <Rating.Item value={3} />
              <Rating.Item value={4} />
              <Rating.Item value={5} />
            </Rating>
            <Rating size="sm" defaultValue={3}>
              <Rating.Item value={1} />
              <Rating.Item value={2} />
              <Rating.Item value={3} />
              <Rating.Item value={4} />
              <Rating.Item value={5} />
            </Rating>
            <Rating size="md" defaultValue={3}>
              <Rating.Item value={1} />
              <Rating.Item value={2} />
              <Rating.Item value={3} />
              <Rating.Item value={4} />
              <Rating.Item value={5} />
            </Rating>
            <Rating size="lg" defaultValue={3}>
              <Rating.Item value={1} />
              <Rating.Item value={2} />
              <Rating.Item value={3} />
              <Rating.Item value={4} />
              <Rating.Item value={5} />
            </Rating>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Heart Shape"
          description="Rating with heart icons."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <Rating defaultValue={4}>
    <Rating.Item value={1} mask="heart" color="bg-error" />
    <Rating.Item value={2} mask="heart" color="bg-error" />
    <Rating.Item value={3} mask="heart" color="bg-error" />
    <Rating.Item value={4} mask="heart" color="bg-error" />
    <Rating.Item value={5} mask="heart" color="bg-error" />
  </Rating>
)

export default App`}
        >
          <Rating defaultValue={4}>
            <Rating.Item value={1} mask="heart" color="bg-error" />
            <Rating.Item value={2} mask="heart" color="bg-error" />
            <Rating.Item value={3} mask="heart" color="bg-error" />
            <Rating.Item value={4} mask="heart" color="bg-error" />
            <Rating.Item value={5} mask="heart" color="bg-error" />
          </Rating>
        </ExampleSection>

        <ExampleSection
          title="Custom Colors"
          description="Different colors for each rating level."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <Rating defaultValue={3}>
    <Rating.Item value={1} color="bg-error" />
    <Rating.Item value={2} color="bg-warning" />
    <Rating.Item value={3} color="bg-warning" />
    <Rating.Item value={4} color="bg-success" />
    <Rating.Item value={5} color="bg-success" />
  </Rating>
)

export default App`}
        >
          <Rating defaultValue={3}>
            <Rating.Item value={1} color="bg-error" />
            <Rating.Item value={2} color="bg-warning" />
            <Rating.Item value={3} color="bg-warning" />
            <Rating.Item value={4} color="bg-success" />
            <Rating.Item value={5} color="bg-success" />
          </Rating>
        </ExampleSection>

        <ExampleSection
          title="Read-Only"
          description="Display rating without interaction."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <Rating value={4} readOnly>
    <Rating.Item value={1} />
    <Rating.Item value={2} />
    <Rating.Item value={3} />
    <Rating.Item value={4} />
    <Rating.Item value={5} />
  </Rating>
)

export default App`}
        >
          <Rating value={4} readOnly>
            <Rating.Item value={1} />
            <Rating.Item value={2} />
            <Rating.Item value={3} />
            <Rating.Item value={4} />
            <Rating.Item value={5} />
          </Rating>
        </ExampleSection>

        <ExampleSection
          title="Controlled Rating"
          description="Control rating value externally."
          code={`import React, { useState } from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => {
  const [rating, setRating] = useState(0)

  return (
    <div>
      <Rating value={rating} onChange={setRating}>
        <Rating.Item value={0} hidden />
        <Rating.Item value={1} />
        <Rating.Item value={2} />
        <Rating.Item value={3} />
        <Rating.Item value={4} />
        <Rating.Item value={5} />
      </Rating>
      <p className="mt-2">Current rating: {rating}</p>
    </div>
  )
}

export default App`}
        >
          <div>
            <Rating value={rating} onChange={setRating}>
              <Rating.Item value={0} hidden />
              <Rating.Item value={1} />
              <Rating.Item value={2} />
              <Rating.Item value={3} />
              <Rating.Item value={4} />
              <Rating.Item value={5} />
            </Rating>
            <p className="mt-2">Current rating: {rating}</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Alternative Star"
          description="Different star style."
          code={`import React from 'react'
import { Rating } from '@edadma/petalui'

const App: React.FC = () => (
  <Rating defaultValue={3}>
    <Rating.Item value={1} mask="star-2" color="bg-success" />
    <Rating.Item value={2} mask="star-2" color="bg-success" />
    <Rating.Item value={3} mask="star-2" color="bg-success" />
    <Rating.Item value={4} mask="star-2" color="bg-success" />
    <Rating.Item value={5} mask="star-2" color="bg-success" />
  </Rating>
)

export default App`}
        >
          <Rating defaultValue={3}>
            <Rating.Item value={1} mask="star-2" color="bg-success" />
            <Rating.Item value={2} mask="star-2" color="bg-success" />
            <Rating.Item value={3} mask="star-2" color="bg-success" />
            <Rating.Item value={4} mask="star-2" color="bg-success" />
            <Rating.Item value={5} mask="star-2" color="bg-success" />
          </Rating>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Rating" data={ratingApi} />

        <ApiTable title="Rating.Item" data={ratingItemApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>
                Use <code>hidden</code> prop on first item to allow users to clear rating
              </li>
              <li>
                Set <code>readOnly</code> for display-only ratings
              </li>
              <li>Apply different colors per item for gradient effect</li>
              <li>Choose between star, star-2, or heart masks based on context</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
