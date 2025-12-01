import { Result, Button, Space, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const resultApi: ApiProperty[] = [
  {
    property: 'status',
    description: 'Status type of the result',
    type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'",
    default: "'info'",
  },
  {
    property: 'title',
    description: 'Title of the result',
    type: 'React.ReactNode',
  },
  {
    property: 'subTitle',
    description: 'Subtitle of the result',
    type: 'React.ReactNode',
  },
  {
    property: 'icon',
    description: 'Custom icon (overrides default status icon)',
    type: 'React.ReactNode',
  },
  {
    property: 'extra',
    description: 'Additional action elements (typically buttons)',
    type: 'React.ReactNode',
  },
  {
    property: 'children',
    description: 'Additional content between subtitle and actions',
    type: 'React.ReactNode',
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

export default function ResultPage() {
  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-4xl font-bold mb-2">Result</h1>
        <p className="text-lg opacity-70">
          Used to display result pages for success, error, or informational states.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Success Result"
          code={`import React from 'react'
import { Result, Button, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="success"
    title="Payment Successful"
    subTitle="Your order has been confirmed and will be shipped within 2 business days."
    extra={
      <Space>
        <Button color="primary">View Order</Button>
        <Button>Continue Shopping</Button>
      </Space>
    }
  />
)

export default App`}
        >
          <Result
            status="success"
            title="Payment Successful"
            subTitle="Your order has been confirmed and will be shipped within 2 business days."
            extra={
              <Space>
                <Button color="primary">View Order</Button>
                <Button>Continue Shopping</Button>
              </Space>
            }
          />
        </ExampleSection>

        <ExampleSection
          title="Error Result"
          code={`import React from 'react'
import { Result, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check your information and try again."
    extra={<Button color="error">Try Again</Button>}
  />
)

export default App`}
        >
          <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check your information and try again."
            extra={<Button color="error">Try Again</Button>}
          />
        </ExampleSection>

        <ExampleSection
          title="Info Result"
          code={`import React from 'react'
import { Result } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="info"
    title="Verification Required"
    subTitle="Please check your email to verify your account."
  />
)

export default App`}
        >
          <Result
            status="info"
            title="Verification Required"
            subTitle="Please check your email to verify your account."
          />
        </ExampleSection>

        <ExampleSection
          title="Warning Result"
          code={`import React from 'react'
import { Result, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="warning"
    title="Account Suspended"
    subTitle="Your account has been suspended due to unusual activity."
    extra={<Button color="warning">Contact Support</Button>}
  />
)

export default App`}
        >
          <Result
            status="warning"
            title="Account Suspended"
            subTitle="Your account has been suspended due to unusual activity."
            extra={<Button color="warning">Contact Support</Button>}
          />
        </ExampleSection>

        <ExampleSection
          title="404 Page Not Found"
          code={`import React from 'react'
import { Result, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="404"
    title="Page Not Found"
    subTitle="The page you are looking for does not exist."
    extra={<Button color="primary">Back Home</Button>}
  />
)

export default App`}
        >
          <Result
            status="404"
            title="Page Not Found"
            subTitle="The page you are looking for does not exist."
            extra={<Button color="primary">Back Home</Button>}
          />
        </ExampleSection>

        <ExampleSection
          title="403 Forbidden"
          code={`import React from 'react'
import { Result, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="403"
    title="Access Denied"
    subTitle="You don't have permission to access this resource."
    extra={<Button>Request Access</Button>}
  />
)

export default App`}
        >
          <Result
            status="403"
            title="Access Denied"
            subTitle="You don't have permission to access this resource."
            extra={<Button>Request Access</Button>}
          />
        </ExampleSection>

        <ExampleSection
          title="500 Server Error"
          code={`import React from 'react'
import { Result, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Result
    status="500"
    title="Server Error"
    subTitle="Something went wrong on our end. Please try again later."
    extra={<Button color="primary">Refresh Page</Button>}
  />
)

export default App`}
        >
          <Result
            status="500"
            title="Server Error"
            subTitle="Something went wrong on our end. Please try again later."
            extra={<Button color="primary">Refresh Page</Button>}
          />
        </ExampleSection>
      </Masonry>

      <div>
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable data={resultApi} title="Result" />
      </div>
    </div>
  )
}
