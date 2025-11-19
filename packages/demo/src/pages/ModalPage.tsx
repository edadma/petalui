import { Modal, Button, Input } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'
import { useState } from 'react'

const modalApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Modal content',
    type: 'React.ReactNode',
  },
  {
    property: 'title',
    description: 'Modal title (renders automatically)',
    type: 'React.ReactNode',
  },
  {
    property: 'footer',
    description: 'Custom footer content (or null to hide footer)',
    type: 'React.ReactNode',
  },
  {
    property: 'open',
    description: 'Control modal visibility',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onOk',
    description: 'OK button click handler (can be async)',
    type: '() => void | Promise<void>',
  },
  {
    property: 'onCancel',
    description: 'Cancel button click handler and close callback',
    type: '() => void',
  },
  {
    property: 'okText',
    description: 'Text for OK button',
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
    property: 'maskClosable',
    description: 'Close modal when clicking outside',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'closable',
    description: 'Show close button',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'position',
    description: 'Vertical position of modal',
    type: "'top' | 'middle' | 'bottom'",
  },
  {
    property: 'align',
    description: 'Horizontal alignment',
    type: "'start' | 'end'",
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
]

const modalFuncApi: ApiProperty[] = [
  {
    property: 'title',
    description: 'Modal title',
    type: 'React.ReactNode',
  },
  {
    property: 'content',
    description: 'Modal content',
    type: 'React.ReactNode',
  },
  {
    property: 'onOk',
    description: 'Callback when OK button is clicked (can be async)',
    type: '() => void | Promise<void>',
  },
  {
    property: 'onCancel',
    description: 'Callback when cancel button is clicked',
    type: '() => void',
  },
  {
    property: 'okText',
    description: 'Text for OK button',
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
    property: 'type',
    description: 'Modal type (sets alert styling)',
    type: "'info' | 'success' | 'warning' | 'error'",
  },
]

export function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Modal</h1>
        <p className="text-base-content/70">
          Dialog boxes triggered by user interaction using native HTML dialog element.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Modal"
          description="Simple modal with title and cancel button."
          code={`import React, { useState } from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        title="Hello!"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Close"
      >
        <p>Press ESC key or click the button below to close</p>
      </Modal>
    </>
  )
}

export default App`}
        >
          <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
          <Modal title="Hello!" open={basicOpen} onCancel={() => setBasicOpen(false)} okText="Close">
            <p>Press ESC key or click the button below to close</p>
          </Modal>
        </ExampleSection>

        <ExampleSection
          title="Modal with OK and Cancel"
          description="Modal with both OK and Cancel buttons."
          code={`import React, { useState } from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleOk = () => {
    console.log('OK clicked')
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        title="Confirm Action"
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <p>Do you want to proceed with this action?</p>
      </Modal>
    </>
  )
}

export default App`}
        >
          <Button onClick={() => setBackdropOpen(true)}>Open Modal</Button>
          <Modal
            title="Confirm Action"
            open={backdropOpen}
            onOk={() => {
              console.log('OK clicked')
              setBackdropOpen(false)
            }}
            onCancel={() => setBackdropOpen(false)}
          >
            <p>Do you want to proceed with this action?</p>
          </Modal>
        </ExampleSection>

        <ExampleSection
          title="Modal Positions"
          description="Position modal at top or bottom."
          code={`import React, { useState } from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const [topOpen, setTopOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => setTopOpen(true)}>Top</Button>
        <Button onClick={() => setBottomOpen(true)}>Bottom</Button>
      </div>

      <Modal
        title="Top Modal"
        open={topOpen}
        onCancel={() => setTopOpen(false)}
        position="top"
      >
        <p>This modal is positioned at the top</p>
      </Modal>

      <Modal
        title="Bottom Modal"
        open={bottomOpen}
        onCancel={() => setBottomOpen(false)}
        position="bottom"
      >
        <p>This modal is positioned at the bottom</p>
      </Modal>
    </>
  )
}

export default App`}
        >
          <div className="flex gap-2">
            <Button onClick={() => setTopOpen(true)}>Top</Button>
            <Button onClick={() => setBottomOpen(true)}>Bottom</Button>
          </div>

          <Modal title="Top Modal" open={topOpen} onCancel={() => setTopOpen(false)} position="top">
            <p>This modal is positioned at the top</p>
          </Modal>

          <Modal title="Bottom Modal" open={bottomOpen} onCancel={() => setBottomOpen(false)} position="bottom">
            <p>This modal is positioned at the bottom</p>
          </Modal>
        </ExampleSection>

        <ExampleSection
          title="Responsive Position"
          description="Bottom on mobile, middle on desktop."
          code={`import React, { useState } from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        title="Responsive!"
        open={open}
        onCancel={() => setOpen(false)}
        className="modal-bottom sm:modal-middle"
      >
        <p>Bottom on mobile, middle on larger screens</p>
      </Modal>
    </>
  )
}

export default App`}
        >
          <Button onClick={() => setCustomOpen(true)}>Open Modal</Button>
          <Modal
            title="Responsive!"
            open={customOpen}
            onCancel={() => setCustomOpen(false)}
            className="modal-bottom sm:modal-middle"
          >
            <p>Bottom on mobile, middle on larger screens</p>
          </Modal>
        </ExampleSection>

        <ExampleSection
          title="Modal with Form"
          description="Modal containing form inputs with custom footer."
          code={`import React, { useState } from 'react'
import { Modal, Button, Input } from '@edadma/petalui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleLogin = () => {
    console.log('Login clicked')
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Login</Button>
      <Modal
        title="Login"
        open={open}
        onOk={handleLogin}
        onCancel={() => setOpen(false)}
        okText="Login"
        cancelText="Cancel"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <Input type="email" placeholder="email@example.com" />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <Input type="password" placeholder="password" />
        </div>
      </Modal>
    </>
  )
}

export default App`}
        >
          <Button onClick={() => setFormOpen(true)}>Login</Button>
          <Modal
            title="Login"
            open={formOpen}
            onOk={() => {
              console.log('Login clicked')
              setFormOpen(false)
            }}
            onCancel={() => setFormOpen(false)}
            okText="Login"
            cancelText="Cancel"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <Input type="password" placeholder="password" />
            </div>
          </Modal>
        </ExampleSection>

        <ExampleSection
          title="Custom Footer"
          description="Modal with custom footer buttons."
          code={`import React, { useState } from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        title="Custom Footer"
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <>
            <Button size="sm">Action 1</Button>
            <Button size="sm">Action 2</Button>
            <Button size="sm" type="primary">
              Primary Action
            </Button>
          </>
        }
      >
        <p>This modal has a custom footer with multiple action buttons.</p>
      </Modal>
    </>
  )
}

export default App`}
        >
          <Button onClick={() => setCustomOpen(true)}>Open Modal</Button>
          <Modal
            title="Custom Footer"
            open={customOpen}
            onCancel={() => setCustomOpen(false)}
            footer={
              <>
                <Button size="sm">Action 1</Button>
                <Button size="sm">Action 2</Button>
                <Button size="sm" type="primary">
                  Primary Action
                </Button>
              </>
            }
          >
            <p>This modal has a custom footer with multiple action buttons.</p>
          </Modal>
        </ExampleSection>

        <ExampleSection
          title="Modal.confirm()"
          description="Confirmation dialog with OK and Cancel buttons."
          code={`import React from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This action cannot be undone.',
      onOk: () => {
        console.log('Deleted')
      },
      onCancel: () => {
        console.log('Cancelled')
      },
    })
  }

  return <Button onClick={handleDelete}>Delete</Button>
}

export default App`}
        >
          <Button
            onClick={() => {
              Modal.confirm({
                title: 'Are you sure?',
                content: 'This action cannot be undone.',
                onOk: () => {
                  console.log('Deleted')
                },
                onCancel: () => {
                  console.log('Cancelled')
                },
              })
            }}
          >
            Delete Item
          </Button>
        </ExampleSection>

        <ExampleSection
          title="Modal.info()"
          description="Informational modal with info styling."
          code={`import React from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const showInfo = () => {
    Modal.info({
      title: 'Information',
      content: 'This is an informational message.',
      okText: 'Got it',
    })
  }

  return <Button onClick={showInfo}>Show Info</Button>
}

export default App`}
        >
          <Button
            onClick={() => {
              Modal.info({
                title: 'Information',
                content: 'This is an informational message.',
                okText: 'Got it',
              })
            }}
          >
            Show Info
          </Button>
        </ExampleSection>

        <ExampleSection
          title="Modal.success()"
          description="Success modal with success styling."
          code={`import React from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const showSuccess = () => {
    Modal.success({
      title: 'Success!',
      content: 'Your changes have been saved.',
    })
  }

  return <Button onClick={showSuccess}>Save</Button>
}

export default App`}
        >
          <Button
            onClick={() => {
              Modal.success({
                title: 'Success!',
                content: 'Your changes have been saved.',
              })
            }}
          >
            Save Changes
          </Button>
        </ExampleSection>

        <ExampleSection
          title="Modal.warning()"
          description="Warning modal with warning styling."
          code={`import React from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const showWarning = () => {
    Modal.warning({
      title: 'Warning',
      content: 'Your session is about to expire.',
    })
  }

  return <Button onClick={showWarning}>Show Warning</Button>
}

export default App`}
        >
          <Button
            onClick={() => {
              Modal.warning({
                title: 'Warning',
                content: 'Your session is about to expire.',
              })
            }}
          >
            Show Warning
          </Button>
        </ExampleSection>

        <ExampleSection
          title="Modal.error()"
          description="Error modal with error styling."
          code={`import React from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const showError = () => {
    Modal.error({
      title: 'Error',
      content: 'Failed to process your request.',
    })
  }

  return <Button onClick={showError}>Trigger Error</Button>
}

export default App`}
        >
          <Button
            onClick={() => {
              Modal.error({
                title: 'Error',
                content: 'Failed to process your request.',
              })
            }}
          >
            Trigger Error
          </Button>
        </ExampleSection>

        <ExampleSection
          title="Async Operations"
          description="Handle async operations with loading state."
          code={`import React from 'react'
import { Modal, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = () => {
    Modal.confirm({
      title: 'Submit Form',
      content: 'Are you ready to submit?',
      onOk: async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Submitted')
      },
    })
  }

  return <Button onClick={handleSubmit}>Submit</Button>
}

export default App`}
        >
          <Button
            onClick={() => {
              Modal.confirm({
                title: 'Submit Form',
                content: 'Are you ready to submit?',
                onOk: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 2000))
                  console.log('Submitted')
                },
              })
            }}
          >
            Submit with Loading
          </Button>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Modal API</h2>
        <ApiTable data={modalApi} />

        <h2 className="text-2xl font-bold mb-4 mt-8">Static Methods API</h2>
        <p className="mb-4 text-base-content/70">
          All static methods (Modal.confirm, Modal.info, Modal.success, Modal.warning, Modal.error) accept the
          following configuration:
        </p>
        <ApiTable data={modalFuncApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Pass content directly as children - no need for Modal.Box wrapper</li>
              <li>Use title prop instead of manual heading elements</li>
              <li>Provide onOk and/or onCancel for automatic button rendering</li>
              <li>Use footer prop for custom footer buttons (or pass null to hide footer)</li>
              <li>Press ESC key to close modal</li>
              <li>Set maskClosable to false to prevent click-outside-to-close</li>
              <li>Use responsive classes like "modal-bottom sm:modal-middle"</li>
              <li>
                Static methods return an object with <code>destroy()</code> for manual cleanup
              </li>
              <li>
                Use <code>async</code> functions in <code>onOk</code> for loading state during operations
              </li>
              <li>Combine with Tailwind utility classes via className for custom styling</li>
              <li>Use style prop for inline styles when needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
