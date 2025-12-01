import { Progress, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const progressApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Current progress value (0-100). Omit for indeterminate state',
    type: 'number',
  },
  {
    property: 'max',
    description: 'Maximum value',
    type: 'number',
    default: '100',
  },
  {
    property: 'type',
    description: 'Color variant',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function ProgressPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Progress</h1>
        <p className="text-base-content/70">
          Display task completion or time passage with progress bars.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Progress"
          description="Simple progress bar with value."
          code={`import React from 'react'
import { Progress } from '@edadma/bloomui'

const App: React.FC = () => (
  <Progress value={70} className="w-56" />
)

export default App`}
        >
          <Progress value={70} className="w-56" />
        </ExampleSection>

        <ExampleSection
          title="Color Variants"
          description="Different color schemes for progress bars."
          code={`import React from 'react'
import { Progress } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-4">
    <Progress value={20} className="w-56" />
    <Progress type="primary" value={40} className="w-56" />
    <Progress type="secondary" value={60} className="w-56" />
    <Progress type="accent" value={80} className="w-56" />
  </div>
)

export default App`}
        >
          <div className="space-y-4">
            <Progress value={20} className="w-56" />
            <Progress type="primary" value={40} className="w-56" />
            <Progress type="secondary" value={60} className="w-56" />
            <Progress type="accent" value={80} className="w-56" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Status Colors"
          description="Semantic colors for different states."
          code={`import React from 'react'
import { Progress } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-4">
    <Progress type="info" value={40} className="w-56" />
    <Progress type="success" value={60} className="w-56" />
    <Progress type="warning" value={80} className="w-56" />
    <Progress type="error" value={100} className="w-56" />
  </div>
)

export default App`}
        >
          <div className="space-y-4">
            <Progress type="info" value={40} className="w-56" />
            <Progress type="success" value={60} className="w-56" />
            <Progress type="warning" value={80} className="w-56" />
            <Progress type="error" value={100} className="w-56" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Indeterminate"
          description="Progress bar without specific value (animated)."
          code={`import React from 'react'
import { Progress } from '@edadma/bloomui'

const App: React.FC = () => (
  <Progress className="w-56" />
)

export default App`}
        >
          <Progress className="w-56" />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Control width with Tailwind classes."
          code={`import React from 'react'
import { Progress } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-4">
    <Progress type="primary" value={70} className="w-32" />
    <Progress type="primary" value={70} className="w-56" />
    <Progress type="primary" value={70} className="w-full" />
  </div>
)

export default App`}
        >
          <div className="space-y-4">
            <Progress type="primary" value={70} className="w-32" />
            <Progress type="primary" value={70} className="w-56" />
            <Progress type="primary" value={70} className="w-full" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Label"
          description="Progress with text label."
          code={`import React from 'react'
import { Progress } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Uploading...</span>
      <span>75%</span>
    </div>
    <Progress type="primary" value={75} className="w-full" />
  </div>
)

export default App`}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>75%</span>
            </div>
            <Progress type="primary" value={75} className="w-full" />
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Progress" data={progressApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Omit the value prop to create an indeterminate (animated) progress bar</li>
              <li>Use Tailwind width utilities (w-32, w-56, w-full) to control size</li>
              <li>Combine with labels for better user experience</li>
              <li>Use semantic colors (info, success, warning, error) to convey status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
