import { Alert, Button, Space, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const alertApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Alert content',
    type: 'React.ReactNode',
  },
  {
    property: 'type',
    description: 'Alert color variant',
    type: "'info' | 'success' | 'warning' | 'error'",
  },
  {
    property: 'outline',
    description: 'Outline style',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'dash',
    description: 'Dash outline style',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'soft',
    description: 'Soft style',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'vertical',
    description: 'Vertical layout',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function AlertPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Alert</h1>
        <p className="text-base-content/70">
          Display important messages and notifications to users.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Alert"
          description="Simple alert with icon and text."
          code={`import React from 'react'
import { Alert } from '@edadma/bloomui'

const App: React.FC = () => (
  <Alert>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="stroke-current h-6 w-6 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span>This is a basic alert</span>
  </Alert>
)

export default App`}
        >
          <Alert>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>This is a basic alert</span>
          </Alert>
        </ExampleSection>

        <ExampleSection
          title="Alert Types"
          description="Different color variants for context."
          code={`import React from 'react'
import { Alert, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space>
    <Alert type="info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Info: New software update available</span>
    </Alert>

    <Alert type="success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Success: Your purchase has been confirmed</span>
    </Alert>

    <Alert type="warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
      <span>Warning: Invalid email address</span>
    </Alert>

    <Alert type="error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Error: Invalid credentials</span>
    </Alert>
  </Space>
)

export default App`}
        >
          <Space>
            <Alert type="info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Info: New software update available</span>
            </Alert>

            <Alert type="success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Success: Your purchase has been confirmed</span>
            </Alert>

            <Alert type="warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <span>Warning: Invalid email address</span>
            </Alert>

            <Alert type="error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Error: Invalid credentials</span>
            </Alert>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="With Action Button"
          description="Alert with dismissal or action button."
          code={`import React from 'react'
import { Alert, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Alert type="warning">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="stroke-current h-6 w-6 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      ></path>
    </svg>
    <span>We use cookies for no reason</span>
    <div>
      <Button size="sm">Accept</Button>
    </div>
  </Alert>
)

export default App`}
        >
          <Alert type="warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <span>We use cookies for no reason</span>
            <div>
              <Button size="sm">Accept</Button>
            </div>
          </Alert>
        </ExampleSection>

        <ExampleSection
          title="Outline Style"
          description="Alert with outline variant."
          code={`import React from 'react'
import { Alert, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space>
    <Alert type="info" outline>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Info outline alert</span>
    </Alert>

    <Alert type="success" outline>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Success outline alert</span>
    </Alert>
  </Space>
)

export default App`}
        >
          <Space>
            <Alert type="info" outline>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Info outline alert</span>
            </Alert>

            <Alert type="success" outline>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Success outline alert</span>
            </Alert>
          </Space>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Alert" data={alertApi} />
      </div>
    </div>
  )
}
