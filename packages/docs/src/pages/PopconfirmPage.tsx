import { Popconfirm, Button, notification } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const popconfirmApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Trigger element',
    type: 'React.ReactElement',
  },
  {
    property: 'title',
    description: 'Title of the confirmation',
    type: 'React.ReactNode',
  },
  {
    property: 'description',
    description: 'Description text',
    type: 'React.ReactNode',
  },
  {
    property: 'onConfirm',
    description: 'Callback when confirmed (supports async)',
    type: '() => void | Promise<void>',
  },
  {
    property: 'onCancel',
    description: 'Callback when cancelled',
    type: '() => void',
  },
  {
    property: 'okText',
    description: 'Text for confirm button',
    type: 'string',
    default: "'OK'",
  },
  {
    property: 'cancelText',
    description: 'Text for cancel button',
    type: 'string',
    default: "'Cancel'",
  },
  {
    property: 'okType',
    description: 'Button type for confirm button',
    type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'",
    default: "'primary'",
  },
  {
    property: 'cancelType',
    description: 'Button type for cancel button',
    type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'ghost'",
    default: "'ghost'",
  },
  {
    property: 'placement',
    description: 'Placement of the confirmation popup',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  {
    property: 'disabled',
    description: 'Whether the popconfirm is disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'icon',
    description: 'Custom icon (null to hide default)',
    type: 'React.ReactNode',
  },
  {
    property: 'showCancel',
    description: 'Show cancel button',
    type: 'boolean',
    default: 'true',
  },
]

export function PopconfirmPage() {
  const handleDelete = () => {
    notification.success({
      message: 'Deleted',
      description: 'The item has been deleted successfully.',
    })
  }

  const handleAsyncDelete = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        notification.success({
          message: 'Deleted',
          description: 'The item has been deleted after async operation.',
        })
        resolve()
      }, 2000)
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Popconfirm</h1>
        <p className="text-base-content/70">
          A simple confirmation dialog triggered by a click action.
        </p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Basic"
          description="Simple popconfirm with title."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Popconfirm
    title="Are you sure?"
    onConfirm={() => console.log('Confirmed')}
  >
    <Button type="error">Delete</Button>
  </Popconfirm>
)

export default App`}
          noColumnBreak
        >
          <Popconfirm title="Are you sure?" onConfirm={handleDelete}>
            <Button type="error">Delete</Button>
          </Popconfirm>
        </ExampleSection>

        <ExampleSection
          title="With Description"
          description="Add a description for more context."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Popconfirm
    title="Delete this task?"
    description="This action cannot be undone. Are you sure you want to continue?"
    onConfirm={() => console.log('Deleted')}
  >
    <Button type="error">Delete</Button>
  </Popconfirm>
)

export default App`}
          noColumnBreak
        >
          <Popconfirm
            title="Delete this task?"
            description="This action cannot be undone. Are you sure you want to continue?"
            onConfirm={handleDelete}
          >
            <Button type="error">Delete</Button>
          </Popconfirm>
        </ExampleSection>

        <ExampleSection
          title="Placements"
          description="Popconfirm can be placed in different positions."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Popconfirm title="Delete?" placement="top">
      <Button>Top</Button>
    </Popconfirm>
    <Popconfirm title="Delete?" placement="right">
      <Button>Right</Button>
    </Popconfirm>
    <Popconfirm title="Delete?" placement="bottom">
      <Button>Bottom</Button>
    </Popconfirm>
    <Popconfirm title="Delete?" placement="left">
      <Button>Left</Button>
    </Popconfirm>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4 flex-wrap">
            <Popconfirm title="Delete?" placement="top">
              <Button>Top</Button>
            </Popconfirm>
            <Popconfirm title="Delete?" placement="right">
              <Button>Right</Button>
            </Popconfirm>
            <Popconfirm title="Delete?" placement="bottom">
              <Button>Bottom</Button>
            </Popconfirm>
            <Popconfirm title="Delete?" placement="left">
              <Button>Left</Button>
            </Popconfirm>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Text"
          description="Customize button text and types."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Popconfirm
    title="Confirm submission?"
    okText="Yes, submit"
    cancelText="No, cancel"
    okType="success"
    cancelType="error"
  >
    <Button type="primary">Submit</Button>
  </Popconfirm>
)

export default App`}
          noColumnBreak
        >
          <Popconfirm
            title="Confirm submission?"
            okText="Yes, submit"
            cancelText="No, cancel"
            okType="success"
            cancelType="error"
            onConfirm={() => {
              notification.success({ message: 'Submitted!', description: 'Form submitted successfully.' })
            }}
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
        </ExampleSection>

        <ExampleSection
          title="Async Confirm"
          description="Handle async operations with loading state."
          code={`import React from 'react'
import { Popconfirm, Button, notification } from '@edadma/petalui'

const App: React.FC = () => {
  const handleAsyncDelete = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        notification.success({ message: 'Deleted!' })
        resolve()
      }, 2000)
    })
  }

  return (
    <Popconfirm
      title="Delete this item?"
      description="This will take a moment..."
      onConfirm={handleAsyncDelete}
    >
      <Button type="error">Delete (Async)</Button>
    </Popconfirm>
  )
}

export default App`}
          noColumnBreak
        >
          <Popconfirm
            title="Delete this item?"
            description="This will take a moment..."
            onConfirm={handleAsyncDelete}
          >
            <Button type="error">Delete (Async)</Button>
          </Popconfirm>
        </ExampleSection>

        <ExampleSection
          title="Custom Icon"
          description="Customize or hide the icon."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="flex gap-4">
    <Popconfirm
      title="Custom icon"
      icon={<span className="text-2xl">🗑️</span>}
    >
      <Button>Custom Icon</Button>
    </Popconfirm>
    <Popconfirm
      title="No icon"
      icon={null}
    >
      <Button>No Icon</Button>
    </Popconfirm>
  </div>
)

export default App`}
          noColumnBreak
        >
          <div className="flex gap-4">
            <Popconfirm title="Delete this?" icon={<span className="text-2xl">🗑️</span>}>
              <Button>Custom Icon</Button>
            </Popconfirm>
            <Popconfirm title="Proceed?" icon={null}>
              <Button>No Icon</Button>
            </Popconfirm>
          </div>
        </ExampleSection>

        <ExampleSection
          title="No Cancel Button"
          description="Hide the cancel button."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Popconfirm
    title="Acknowledge this message"
    showCancel={false}
    okText="Got it"
  >
    <Button type="info">Show Info</Button>
  </Popconfirm>
)

export default App`}
          noColumnBreak
        >
          <Popconfirm
            title="Acknowledge this message"
            description="Click OK to dismiss."
            showCancel={false}
            okText="Got it"
          >
            <Button type="info">Show Info</Button>
          </Popconfirm>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled popconfirm."
          code={`import React from 'react'
import { Popconfirm, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Popconfirm
    title="Are you sure?"
    disabled
  >
    <Button disabled>Disabled</Button>
  </Popconfirm>
)

export default App`}
          noColumnBreak
        >
          <Popconfirm title="Are you sure?" disabled>
            <Button disabled>Disabled</Button>
          </Popconfirm>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Popconfirm" data={popconfirmApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use Popconfirm for destructive actions like delete operations</li>
              <li>Add a <code>description</code> for critical operations to provide more context</li>
              <li>Use async <code>onConfirm</code> for operations that take time (loading state is automatic)</li>
              <li>Customize button text and types to match the action severity</li>
              <li>Use different placements based on trigger element position</li>
              <li>Set <code>showCancel=false</code> for acknowledgment-only confirmations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
