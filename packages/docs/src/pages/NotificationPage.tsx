import { Button, notification } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const notificationApi: ApiProperty[] = [
  {
    property: 'message',
    description: 'Notification title',
    type: 'React.ReactNode',
  },
  {
    property: 'description',
    description: 'Notification description text',
    type: 'React.ReactNode',
  },
  {
    property: 'type',
    description: 'Notification type',
    type: "'success' | 'info' | 'warning' | 'error'",
  },
  {
    property: 'duration',
    description: 'Auto-close duration in seconds (0 = no auto close)',
    type: 'number',
    default: '4.5',
  },
  {
    property: 'placement',
    description: 'Position of notification',
    type: "'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'",
    default: "'topRight'",
  },
  {
    property: 'closable',
    description: 'Show close button',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'onClick',
    description: 'Callback when notification is clicked',
    type: '() => void',
  },
  {
    property: 'onClose',
    description: 'Callback when notification is closed',
    type: '() => void',
  },
]

const methodsApi: ApiProperty[] = [
  {
    property: 'notification.success(config)',
    description: 'Show success notification',
    type: 'string (notification id)',
  },
  {
    property: 'notification.error(config)',
    description: 'Show error notification',
    type: 'string (notification id)',
  },
  {
    property: 'notification.info(config)',
    description: 'Show info notification',
    type: 'string (notification id)',
  },
  {
    property: 'notification.warning(config)',
    description: 'Show warning notification',
    type: 'string (notification id)',
  },
  {
    property: 'notification.open(config)',
    description: 'Show notification with custom type',
    type: 'string (notification id)',
  },
  {
    property: 'notification.close(id)',
    description: 'Close specific notification',
    type: 'void',
  },
  {
    property: 'notification.destroy()',
    description: 'Close all notifications',
    type: 'void',
  },
]

export function NotificationPage() {
  const openSuccessNotification = () => {
    notification.success({
      message: 'Success!',
      description: 'Your operation completed successfully.',
    })
  }

  const openErrorNotification = () => {
    notification.error({
      message: 'Error',
      description: 'Something went wrong. Please try again.',
    })
  }

  const openInfoNotification = () => {
    notification.info({
      message: 'Information',
      description: 'This is an informational message.',
    })
  }

  const openWarningNotification = () => {
    notification.warning({
      message: 'Warning',
      description: 'Please review this important information.',
    })
  }

  const openWithPlacement = (placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    notification.info({
      message: 'Notification',
      description: `This notification appears at ${placement}`,
      placement,
    })
  }

  const openCustomDuration = () => {
    notification.info({
      message: 'Quick Message',
      description: 'This will close in 2 seconds',
      duration: 2,
    })
  }

  const openNoDuration = () => {
    notification.warning({
      message: 'Important',
      description: 'This notification will not auto-close',
      duration: 0,
    })
  }

  const openMultiple = () => {
    notification.success({ message: 'First', description: 'This is the first notification' })
    setTimeout(() => {
      notification.info({ message: 'Second', description: 'This is the second notification' })
    }, 500)
    setTimeout(() => {
      notification.warning({ message: 'Third', description: 'This is the third notification' })
    }, 1000)
  }

  const openWithCallback = () => {
    notification.info({
      message: 'Click Me!',
      description: 'Click this notification to trigger an action',
      onClick: () => {
        notification.success({
          message: 'Notification Clicked!',
          description: 'The onClick callback was triggered',
        })
      },
      onClose: () => {
        console.log('Notification closed')
      },
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Notification</h1>
        <p className="text-base-content/70">
          Display global notification messages at screen corners with auto-dismiss.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Types"
          description="Different notification types for various scenarios."
          code={`import React from 'react'
import { Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="space-x-2">
    <Button
      type="success"
      onClick={() =>
        notification.success({
          message: 'Success!',
          description: 'Your operation completed successfully.',
        })
      }
    >
      Success
    </Button>
    <Button
      type="error"
      onClick={() =>
        notification.error({
          message: 'Error',
          description: 'Something went wrong.',
        })
      }
    >
      Error
    </Button>
    <Button
      onClick={() =>
        notification.info({
          message: 'Information',
          description: 'This is an informational message.',
        })
      }
    >
      Info
    </Button>
    <Button
      type="warning"
      onClick={() =>
        notification.warning({
          message: 'Warning',
          description: 'Please review this information.',
        })
      }
    >
      Warning
    </Button>
  </div>
)

export default App`}
        >
          <div className="flex flex-wrap gap-2">
            <Button type="success" onClick={openSuccessNotification}>
              Success
            </Button>
            <Button type="error" onClick={openErrorNotification}>
              Error
            </Button>
            <Button onClick={openInfoNotification}>Info</Button>
            <Button type="warning" onClick={openWarningNotification}>
              Warning
            </Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Placement"
          description="Position notifications at different screen corners."
          code={`import React from 'react'
import { Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="grid grid-cols-2 gap-2">
    <Button
      onClick={() =>
        notification.info({
          message: 'Top Left',
          description: 'Notification at top left',
          placement: 'topLeft',
        })
      }
    >
      Top Left
    </Button>
    <Button
      onClick={() =>
        notification.info({
          message: 'Top Right',
          description: 'Notification at top right',
          placement: 'topRight',
        })
      }
    >
      Top Right
    </Button>
    <Button
      onClick={() =>
        notification.info({
          message: 'Bottom Left',
          description: 'Notification at bottom left',
          placement: 'bottomLeft',
        })
      }
    >
      Bottom Left
    </Button>
    <Button
      onClick={() =>
        notification.info({
          message: 'Bottom Right',
          description: 'Notification at bottom right',
          placement: 'bottomRight',
        })
      }
    >
      Bottom Right
    </Button>
  </div>
)

export default App`}
        >
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => openWithPlacement('topLeft')}>Top Left</Button>
            <Button onClick={() => openWithPlacement('topRight')}>Top Right</Button>
            <Button onClick={() => openWithPlacement('bottomLeft')}>Bottom Left</Button>
            <Button onClick={() => openWithPlacement('bottomRight')}>Bottom Right</Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Duration"
          description="Control auto-dismiss timing or disable it."
          code={`import React from 'react'
import { Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="space-x-2">
    <Button
      onClick={() =>
        notification.info({
          message: 'Quick Message',
          description: 'Closes in 2 seconds',
          duration: 2,
        })
      }
    >
      2 Seconds
    </Button>
    <Button
      type="warning"
      onClick={() =>
        notification.warning({
          message: 'Important',
          description: 'Will not auto-close',
          duration: 0,
        })
      }
    >
      No Auto-Close
    </Button>
  </div>
)

export default App`}
        >
          <div className="flex flex-wrap gap-2">
            <Button onClick={openCustomDuration}>2 Seconds</Button>
            <Button type="warning" onClick={openNoDuration}>
              No Auto-Close
            </Button>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Multiple Notifications"
          description="Stack multiple notifications with FIFO auto-dismiss."
          code={`import React from 'react'
import { Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <Button
    onClick={() => {
      notification.success({
        message: 'First',
        description: 'This is the first notification',
      })
      setTimeout(() => {
        notification.info({
          message: 'Second',
          description: 'This is the second notification',
        })
      }, 500)
      setTimeout(() => {
        notification.warning({
          message: 'Third',
          description: 'This is the third notification',
        })
      }, 1000)
    }}
  >
    Show Multiple
  </Button>
)

export default App`}
        >
          <Button onClick={openMultiple}>Show Multiple</Button>
        </ExampleSection>

        <ExampleSection
          title="With Callbacks"
          description="Handle click and close events."
          code={`import React from 'react'
import { Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <Button
    onClick={() =>
      notification.info({
        message: 'Click Me!',
        description: 'Click to trigger an action',
        onClick: () => {
          notification.success({
            message: 'Notification Clicked!',
            description: 'The onClick callback was triggered',
          })
        },
        onClose: () => {
          console.log('Notification closed')
        },
      })
    }
  >
    With Callbacks
  </Button>
)

export default App`}
        >
          <Button onClick={openWithCallback}>With Callbacks</Button>
        </ExampleSection>

        <ExampleSection
          title="Destroy All"
          description="Close all notifications at once."
          code={`import React from 'react'
import { Button, notification } from '@edadma/petalui'

const App: React.FC = () => (
  <div className="space-x-2">
    <Button
      onClick={() => {
        notification.info({ message: 'Notification 1' })
        notification.info({ message: 'Notification 2' })
        notification.info({ message: 'Notification 3' })
      }}
    >
      Show 3 Notifications
    </Button>
    <Button type="error" onClick={() => notification.destroy()}>
      Close All
    </Button>
  </div>
)

export default App`}
        >
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                notification.info({ message: 'Notification 1', duration: 0 })
                notification.info({ message: 'Notification 2', duration: 0 })
                notification.info({ message: 'Notification 3', duration: 0 })
              }}
            >
              Show 3 Notifications
            </Button>
            <Button type="error" onClick={() => notification.destroy()}>
              Close All
            </Button>
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <h3 className="text-xl font-bold mb-4">Configuration</h3>
        <ApiTable data={notificationApi} />

        <h3 className="text-xl font-bold mb-4 mt-8">Methods</h3>
        <ApiTable data={methodsApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>No provider needed - import and use directly anywhere in your app</li>
              <li>Notifications auto-dismiss in FIFO order (first shown, first dismissed)</li>
              <li>Default duration is 4.5 seconds, set to 0 to disable auto-close</li>
              <li>Click anywhere on notification to trigger onClick callback</li>
              <li>Multiple notifications stack at the same placement position</li>
              <li>Use notification.destroy() to close all notifications at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
