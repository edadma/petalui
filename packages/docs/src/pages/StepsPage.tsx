import { Steps, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const stepsApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Steps.Step components',
    type: 'React.ReactNode',
  },
  {
    property: 'vertical',
    description: 'Vertical layout orientation',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const stepApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Step content',
    type: 'React.ReactNode',
  },
  {
    property: 'color',
    description: 'Step color (marks as completed)',
    type: "'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'dataContent',
    description: 'Custom content for step indicator',
    type: 'string',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function StepsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Steps</h1>
        <p className="text-base-content/70">Visual progress indicator showing sequential steps.</p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Steps"
          description="Horizontal step progression."
          code={`import React from 'react'
import { Steps, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Steps>
    <Steps.Step color="primary">Register</Steps.Step>
    <Steps.Step color="primary">Choose plan</Steps.Step>
    <Steps.Step>Purchase</Steps.Step>
    <Steps.Step>Receive Product</Steps.Step>
  </Steps>
)

export default App`}
        >
          <Steps>
            <Steps.Step color="primary">Register</Steps.Step>
            <Steps.Step color="primary">Choose plan</Steps.Step>
            <Steps.Step>Purchase</Steps.Step>
            <Steps.Step>Receive Product</Steps.Step>
          </Steps>
        </ExampleSection>

        <ExampleSection
          title="Vertical Steps"
          description="Steps in vertical orientation."
          code={`import React from 'react'
import { Steps, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Steps vertical>
    <Steps.Step color="primary">Register</Steps.Step>
    <Steps.Step color="primary">Choose plan</Steps.Step>
    <Steps.Step>Purchase</Steps.Step>
    <Steps.Step>Receive Product</Steps.Step>
  </Steps>
)

export default App`}
        >
          <Steps vertical>
            <Steps.Step color="primary">Register</Steps.Step>
            <Steps.Step color="primary">Choose plan</Steps.Step>
            <Steps.Step>Purchase</Steps.Step>
            <Steps.Step>Receive Product</Steps.Step>
          </Steps>
        </ExampleSection>

        <ExampleSection
          title="Different Colors"
          description="Steps with various semantic colors."
          code={`import React from 'react'
import { Steps, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Steps>
    <Steps.Step color="info">Fly to moon</Steps.Step>
    <Steps.Step color="info">Shrink the moon</Steps.Step>
    <Steps.Step color="info">Grab the moon</Steps.Step>
    <Steps.Step color="success">Sit on toilet</Steps.Step>
  </Steps>
)

export default App`}
        >
          <Steps>
            <Steps.Step color="info">Fly to moon</Steps.Step>
            <Steps.Step color="info">Shrink the moon</Steps.Step>
            <Steps.Step color="info">Grab the moon</Steps.Step>
            <Steps.Step color="success">Sit on toilet</Steps.Step>
          </Steps>
        </ExampleSection>

        <ExampleSection
          title="Custom Content"
          description="Custom indicators using dataContent."
          code={`import React from 'react'
import { Steps, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Steps>
    <Steps.Step color="primary" dataContent="?">Step 1</Steps.Step>
    <Steps.Step color="primary" dataContent="!">Step 2</Steps.Step>
    <Steps.Step dataContent="✓">Step 3</Steps.Step>
    <Steps.Step dataContent="✕">Step 4</Steps.Step>
  </Steps>
)

export default App`}
        >
          <Steps>
            <Steps.Step color="primary" dataContent="?">
              Step 1
            </Steps.Step>
            <Steps.Step color="primary" dataContent="!">
              Step 2
            </Steps.Step>
            <Steps.Step dataContent="✓">Step 3</Steps.Step>
            <Steps.Step dataContent="✕">Step 4</Steps.Step>
          </Steps>
        </ExampleSection>

        <ExampleSection
          title="Responsive Layout"
          description="Vertical on mobile, horizontal on desktop."
          code={`import React from 'react'
import { Steps, Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Steps className="steps-vertical lg:steps-horizontal">
    <Steps.Step color="primary">Register</Steps.Step>
    <Steps.Step color="primary">Choose plan</Steps.Step>
    <Steps.Step>Purchase</Steps.Step>
    <Steps.Step>Receive Product</Steps.Step>
  </Steps>
)

export default App`}
        >
          <Steps className="steps-vertical lg:steps-horizontal">
            <Steps.Step color="primary">Register</Steps.Step>
            <Steps.Step color="primary">Choose plan</Steps.Step>
            <Steps.Step>Purchase</Steps.Step>
            <Steps.Step>Receive Product</Steps.Step>
          </Steps>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Steps" data={stepsApi} />

        <ApiTable title="Steps.Step" data={stepApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Apply color prop to Steps.Step to mark them as completed</li>
              <li>Use dataContent for custom icons or symbols</li>
              <li>Combine vertical prop with responsive classes for adaptive layouts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
