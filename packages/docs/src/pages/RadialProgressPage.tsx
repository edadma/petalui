import { RadialProgress } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const radialProgressApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Progress value (0-100)',
    type: 'number',
  },
  {
    property: 'size',
    description: 'Size in rem units or CSS string',
    type: 'string | number',
    default: '5rem',
  },
  {
    property: 'thickness',
    description: 'Ring thickness in pixels or CSS string',
    type: 'string | number',
    default: '10% of size',
  },
  {
    property: 'color',
    description: 'Progress color',
    type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'",
  },
  {
    property: 'showValue',
    description: 'Show percentage text',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'children',
    description: 'Custom content to display',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function RadialProgressPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Radial Progress</h1>
        <p className="text-base-content/70">
          Circular progress indicator with customizable appearance.
        </p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Basic"
          description="Simple radial progress with value."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <RadialProgress value={70} />
)

export default App`}
          noColumnBreak
        >
          <RadialProgress value={70} />
        </ExampleSection>

        <ExampleSection
          title="Different Values"
          description="Radial progress with various completion percentages."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <RadialProgress value={0} />
    <RadialProgress value={25} />
    <RadialProgress value={50} />
    <RadialProgress value={75} />
    <RadialProgress value={100} />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <RadialProgress value={0} />
            <RadialProgress value={25} />
            <RadialProgress value={50} />
            <RadialProgress value={75} />
            <RadialProgress value={100} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Colors"
          description="Radial progress with different colors."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <RadialProgress value={70} color="primary" />
    <RadialProgress value={70} color="secondary" />
    <RadialProgress value={70} color="accent" />
    <RadialProgress value={70} color="success" />
    <RadialProgress value={70} color="warning" />
    <RadialProgress value={70} color="error" />
    <RadialProgress value={70} color="info" />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <RadialProgress value={70} color="primary" />
            <RadialProgress value={70} color="secondary" />
            <RadialProgress value={70} color="accent" />
            <RadialProgress value={70} color="success" />
            <RadialProgress value={70} color="warning" />
            <RadialProgress value={70} color="error" />
            <RadialProgress value={70} color="info" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Size"
          description="Adjust size using the size prop."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4 items-center">
    <RadialProgress value={70} size={3} />
    <RadialProgress value={70} size={5} />
    <RadialProgress value={70} size={8} />
    <RadialProgress value={70} size={12} />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 items-center flex-wrap">
            <RadialProgress value={70} size={3} />
            <RadialProgress value={70} size={5} />
            <RadialProgress value={70} size={8} />
            <RadialProgress value={70} size={12} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Thickness"
          description="Adjust ring thickness."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <RadialProgress value={70} thickness={2} />
    <RadialProgress value={70} thickness={5} />
    <RadialProgress value={70} thickness={10} />
    <RadialProgress value={70} thickness={20} />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <RadialProgress value={70} thickness={2} />
            <RadialProgress value={70} thickness={5} />
            <RadialProgress value={70} thickness={10} />
            <RadialProgress value={70} thickness={20} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Content"
          description="Display custom content instead of percentage."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <RadialProgress value={85}>
      <div className="text-xs">85/100</div>
    </RadialProgress>
    <RadialProgress value={60}>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">60</div>
        <div className="text-xs">days</div>
      </div>
    </RadialProgress>
    <RadialProgress value={100} color="success">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </RadialProgress>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <RadialProgress value={85}>
              <div className="text-xs">85/100</div>
            </RadialProgress>
            <RadialProgress value={60}>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">60</div>
                <div className="text-xs">days</div>
              </div>
            </RadialProgress>
            <RadialProgress value={100} color="success">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </RadialProgress>
          </div>
        </ExampleSection>

        <ExampleSection
          title="No Value Display"
          description="Hide the percentage text."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <RadialProgress value={30} showValue={false} />
    <RadialProgress value={60} showValue={false} color="primary" />
    <RadialProgress value={90} showValue={false} color="success" />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <RadialProgress value={30} showValue={false} />
            <RadialProgress value={60} showValue={false} color="primary" />
            <RadialProgress value={90} showValue={false} color="success" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Background"
          description="Add background and border styling."
          code={`import React from 'react'
import { RadialProgress } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <RadialProgress
      value={70}
      color="primary"
      className="bg-primary text-primary-content border-4 border-primary"
    />
    <RadialProgress
      value={50}
      color="secondary"
      className="bg-secondary text-secondary-content border-4 border-secondary"
    />
    <RadialProgress
      value={90}
      color="accent"
      className="bg-accent text-accent-content border-4 border-accent"
    />
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <RadialProgress
              value={70}
              color="primary"
              className="bg-primary text-primary-content border-4 border-primary"
            />
            <RadialProgress
              value={50}
              color="secondary"
              className="bg-secondary text-secondary-content border-4 border-secondary"
            />
            <RadialProgress
              value={90}
              color="accent"
              className="bg-accent text-accent-content border-4 border-accent"
            />
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="RadialProgress" data={radialProgressApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use RadialProgress to show completion percentage in a circular format</li>
              <li>Adjust size prop (in rem) for different display contexts</li>
              <li>Customize thickness for thin or thick progress rings</li>
              <li>Use color prop to match your design system colors</li>
              <li>Provide custom children to display icons, multi-line text, or other content</li>
              <li>Set showValue=false for a minimal appearance</li>
              <li>Combine with bg-* and border-* classes for enhanced styling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
