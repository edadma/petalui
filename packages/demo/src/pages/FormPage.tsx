import { Form, Input, Checkbox, Button } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const formApi: ApiProperty[] = [
  {
    property: 'onFinish',
    description: 'Callback when form is submitted successfully',
    type: '(values: TFieldValues) => void',
  },
  {
    property: 'initialValues',
    description: 'Initial values for form fields',
    type: 'object',
  },
  {
    property: 'layout',
    description: 'Form layout style',
    type: "'vertical' | 'horizontal' | 'inline'",
    default: "'vertical'",
  },
  {
    property: 'size',
    description: 'Size applied to all form fields',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
  },
  {
    property: 'form',
    description: 'Form instance from Form.useForm()',
    type: 'FormInstance',
  },
]

const formItemApi: ApiProperty[] = [
  {
    property: 'name',
    description: 'Field name for form state binding',
    type: 'string',
  },
  {
    property: 'label',
    description: 'Label text displayed above the field',
    type: 'string',
  },
  {
    property: 'help',
    description: 'Help text displayed below the field',
    type: 'string',
  },
  {
    property: 'required',
    description: 'Whether the field is required',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'rules',
    description: 'Validation rules for the field',
    type: 'ValidationRules',
  },
  {
    property: 'valuePropName',
    description: 'Prop name for the value (e.g., "checked" for checkboxes)',
    type: 'string',
    default: "'value'",
  },
]

export function FormPage() {
  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Form</h1>
        <p className="text-base-content/70">
          Form component with validation, powered by React Hook Form.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Form"
          description="Simple form with email and password fields."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </Form.Item>

      <Form.Item name="password" label="Password" required>
        <Input type="password" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item name="email" label="Email" required>
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item name="password" label="Password" required>
              <Input type="password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="With Validation"
          description="Form with custom validation rules."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="Username"
        rules={{
          required: true,
          min: { value: 3, message: 'Minimum 3 characters' },
          max: { value: 20, message: 'Maximum 20 characters' },
        }}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      >
        <Input type="email" placeholder="you@example.com" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="username"
              label="Username"
              rules={{
                required: true,
                min: { value: 3, message: 'Minimum 3 characters' },
                max: { value: 20, message: 'Maximum 20 characters' },
              }}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
            >
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="With Checkbox"
          description="Form with checkbox using valuePropName."
          code={`import React from 'react'
import { Form, Input, Checkbox, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{ remember: true }}
    >
      <Form.Item name="email" label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </Form.Item>

      <Form.Item name="password" label="Password" required>
        <Input type="password" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>Remember me</span>
        </div>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" shape="block">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ remember: true }}
          >
            <Form.Item name="email" label="Email" required>
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item name="password" label="Password" required>
              <Input type="password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span>Remember me</span>
              </div>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" shape="block">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="With Help Text"
          description="Form fields with helpful hints."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="email"
        label="Email"
        help="We'll never share your email"
        required
      >
        <Input type="email" placeholder="you@example.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        help="Must be at least 8 characters"
        rules={{
          required: true,
          min: { value: 8, message: 'Password too short' },
        }}
      >
        <Input type="password" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="email"
              label="Email"
              help="We'll never share your email"
              required
            >
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              help="Must be at least 8 characters"
              rules={{
                required: true,
                min: { value: 8, message: 'Password too short' },
              }}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Form Sizes"
          description="Apply size to all fields at once."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Form size="lg" onFinish={(values) => console.log(values)}>
    <Form.Item name="name" label="Name" required>
      <Input placeholder="Your name" />
    </Form.Item>

    <Form.Item name="email" label="Email" required>
      <Input type="email" placeholder="you@example.com" />
    </Form.Item>

    <Form.Item>
      <Button htmlType="submit" type="primary" size="lg">
        Submit
      </Button>
    </Form.Item>
  </Form>
)

export default App`}
        >
          <Form size="lg" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name" required>
              <Input placeholder="Your name" />
            </Form.Item>

            <Form.Item name="email" label="Email" required>
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" size="lg">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Form" data={formApi} />

        <ApiTable title="Form.Item" data={formItemApi} className="mt-8" />
      </div>
    </div>
  )
}
