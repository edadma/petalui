import { useState } from 'react'
import { Form, Input, Checkbox, Button, Modal } from '@edadma/petalui'
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
    description: 'Field name for form state binding (string or array for nested fields)',
    type: 'string | string[]',
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
    description: 'Validation rules (required, type, min, max, pattern, validate)',
    type: 'ValidationRules',
  },
  {
    property: 'rules.type',
    description: 'Built-in type validator',
    type: "'email' | 'url' | 'number'",
  },
  {
    property: 'valuePropName',
    description: 'Prop name for the value (e.g., "checked" for checkboxes)',
    type: 'string',
    default: "'value'",
  },
]

const formListApi: ApiProperty[] = [
  {
    property: 'name',
    description: 'Field name for the array of items',
    type: 'string',
  },
  {
    property: 'children',
    description: 'Render function with fields and operations (add, remove, move)',
    type: '(fields, { add, remove, move }) => ReactNode',
  },
]

const formMethodsApi: ApiProperty[] = [
  {
    property: 'setFieldValue',
    description: 'Set a single field value',
    type: '(name: string, value: any) => void',
  },
  {
    property: 'setFieldsValue',
    description: 'Set multiple field values',
    type: '(values: object) => void',
  },
  {
    property: 'getFieldValue',
    description: 'Get a single field value',
    type: '(name: string) => any',
  },
  {
    property: 'getFieldsValue',
    description: 'Get all field values',
    type: '() => object',
  },
  {
    property: 'validateFields',
    description: 'Trigger validation for all or specific fields',
    type: '(names?: string[]) => Promise<boolean>',
  },
  {
    property: 'resetFields',
    description: 'Reset all or specific fields',
    type: '(names?: string[]) => void',
  },
  {
    property: 'isFieldTouched',
    description: 'Check if field has been touched',
    type: '(name: string) => boolean',
  },
  {
    property: 'getFieldError',
    description: 'Get field error message',
    type: '(name: string) => string | undefined',
  },
]

export function FormPage() {
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    setSubmittedData(values)
    setIsModalOpen(true)
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

        <ExampleSection
          title="Type Validators"
          description="Built-in validators for email, URL, and number types."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Form onFinish={(values) => console.log(values)}>
    <Form.Item
      name="email"
      label="Email"
      rules={{ required: true, type: 'email' }}
    >
      <Input placeholder="you@example.com" />
    </Form.Item>

    <Form.Item
      name="website"
      label="Website"
      rules={{ type: 'url' }}
    >
      <Input placeholder="https://example.com" />
    </Form.Item>

    <Form.Item
      name="age"
      label="Age"
      rules={{ type: 'number', min: 0, max: 120 }}
    >
      <Input placeholder="25" />
    </Form.Item>

    <Form.Item>
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form.Item>
  </Form>
)

export default App`}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="email"
              label="Email"
              rules={{ required: true, type: 'email' }}
            >
              <Input placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              name="website"
              label="Website"
              rules={{ type: 'url' }}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              rules={{ type: 'number', min: 0, max: 120 }}
            >
              <Input placeholder="25" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Form Methods API"
          description="Programmatic control with form instance methods."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const form = Form.useForm()

  const fillForm = () => {
    form.setFieldsValue({
      username: 'johndoe',
      email: 'john@example.com',
    })
  }

  const resetForm = () => {
    form.resetFields()
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button onClick={fillForm} size="sm">Fill Form</Button>
        <Button onClick={resetForm} size="sm">Reset</Button>
      </div>

      <Form form={form} onFinish={(values) => console.log(values)}>
        <Form.Item name="username" label="Username" required>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" required>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default App`}
        >
          {(() => {
            const form = Form.useForm()

            const fillForm = () => {
              form.setFieldsValue({
                username: 'johndoe',
                email: 'john@example.com',
              })
            }

            const resetForm = () => {
              form.resetFields()
            }

            return (
              <>
                <div className="flex gap-2 mb-4">
                  <Button onClick={fillForm} size="sm">
                    Fill Form
                  </Button>
                  <Button onClick={resetForm} size="sm">
                    Reset
                  </Button>
                </div>

                <Form form={form} onFinish={handleSubmit}>
                  <Form.Item name="username" label="Username" required>
                    <Input />
                  </Form.Item>

                  <Form.Item name="email" label="Email" required>
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )
          })()}
        </ExampleSection>

        <ExampleSection
          title="Dynamic Fields (Form.List)"
          description="Add and remove fields dynamically with Form.List."
          code={`import React from 'react'
import { Form, Input, Button } from '@edadma/petalui'

const App: React.FC = () => (
  <Form
    onFinish={(values) => console.log(values)}
    initialValues={{ users: [{ name: '', email: '' }] }}
  >
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <div key={field.id} className="border border-base-300 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">User {index + 1}</h3>
                {fields.length > 1 && (
                  <Button
                    size="sm"
                    onClick={() => remove(index)}
                    type="error"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <Form.Item
                name={[field.name, 'name']}
                label="Name"
                rules={{ required: 'Name is required' }}
              >
                <Input placeholder="Full name" />
              </Form.Item>

              <Form.Item
                name={[field.name, 'email']}
                label="Email"
                rules={{ required: true, type: 'email' }}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
            </div>
          ))}

          <Button onClick={() => add()} className="mb-4">
            Add User
          </Button>
        </>
      )}
    </Form.List>

    <Form.Item>
      <Button htmlType="submit" type="primary" shape="block">
        Submit All Users
      </Button>
    </Form.Item>
  </Form>
)

export default App`}
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ users: [{ name: '', email: '' }] }}
          >
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field: any, index) => (
                    <div key={field.id} className="border border-base-300 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">User {index + 1}</h3>
                        {fields.length > 1 && (
                          <Button
                            size="sm"
                            onClick={() => remove(index)}
                            type="error"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <Form.Item
                        name={[field.name, 'name']}
                        label="Name"
                        rules={{ required: 'Name is required' }}
                      >
                        <Input placeholder="Full name" />
                      </Form.Item>

                      <Form.Item
                        name={[field.name, 'email']}
                        label="Email"
                        rules={{ required: true, type: 'email' }}
                      >
                        <Input placeholder="email@example.com" />
                      </Form.Item>
                    </div>
                  ))}

                  <Button onClick={() => add()} className="mb-4">
                    Add User
                  </Button>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button htmlType="submit" type="primary" shape="block">
                Submit All Users
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Form" data={formApi} />

        <ApiTable title="Form.Item" data={formItemApi} className="mt-8" />

        <ApiTable title="Form.List" data={formListApi} className="mt-8" />

        <ApiTable title="Form Methods (from Form.useForm())" data={formMethodsApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use type validators ('email', 'url', 'number') for common validation patterns</li>
              <li>Form.useForm() provides programmatic control over form state</li>
              <li>Form.List enables dynamic add/remove functionality for array fields</li>
              <li>Nested field names in Form.List use array syntax: name=[field.name, 'property']</li>
              <li>All validation is powered by React Hook Form</li>
              <li>Forms support TypeScript generics for type-safe values</li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Form Submitted"
        footer={null}
      >
        <div className="py-4">
          <p className="mb-4">Form data:</p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      </Modal>
    </div>
  )
}
