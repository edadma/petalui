import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navbar, ThemeController, Form, Input, Button, Card, Space } from '@edadma/bloomui'

interface FormValues {
  username: string
  email: string
  age: number
  website: string
  password: string
  confirmPassword: string
}

function App() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<FormValues>()

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    setSubmittedData(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmittedData(values)
    setIsSubmitting(false)
  }

  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">Form Validation Test</a>}
        end={<ThemeController.Swap />}
      />

      <div className="p-6">
        <Space size="lg" className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Form Validation</h1>
            <p className="text-lg mt-4">
              Test comprehensive form validation with various input types, rules, and error states.
            </p>
          </div>

          <Card className="shadow-xl text-left">
          <Form<FormValues> form={form} onFinish={handleSubmit}>
            <Form.Item
              name="username"
              label="Username"
              required
              rules={{
                required: 'Username is required',
                min: { value: 3, message: 'Username must be at least 3 characters' },
                max: { value: 20, message: 'Username must not exceed 20 characters' },
              }}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              required
              rules={{
                required: 'Email is required',
                type: 'email',
              }}
            >
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              required
              rules={{
                required: 'Age is required',
                type: 'number',
                min: { value: 18, message: 'You must be at least 18 years old' },
                max: { value: 120, message: 'Age must be realistic' },
              }}
            >
              <Input type="number" placeholder="Enter your age" />
            </Form.Item>

            <Form.Item
              name="website"
              label="Website"
              rules={{
                type: 'url',
              }}
              help="Optional: Your personal or company website"
            >
              <Input placeholder="https://example.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              required
              rules={{
                required: 'Password is required',
                min: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain uppercase, lowercase, and number',
                },
              }}
            >
              <Input type="password" placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              required
              rules={{
                required: 'Please confirm your password',
                validate: (value) => {
                  const password = form.getValues('password')
                  return value === password || 'Passwords do not match'
                },
              }}
            >
              <Input type="password" placeholder="Confirm password" />
            </Form.Item>

            <div className="form-control mt-6">
              <Button type="primary" htmlType="submit" loading={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </Card>

          {submittedData && (
            <Card className="shadow-xl" title="Submitted Data">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </Card>
          )}
        </Space>
      </div>
    </>
  )
}

export default App
