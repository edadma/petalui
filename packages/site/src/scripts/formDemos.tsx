import { createRoot } from 'react-dom/client'
import React, { useState } from 'react'
import { Form, Input, Button, Radio, Space, Textarea, Modal } from 'asterui'
import { CheckIconSvg } from './icons'

const showFormValues = (values: any) => {
  Modal.success({
    title: 'Form Submitted',
    content: (
      <pre className="bg-base-200 p-3 rounded-lg text-sm overflow-auto max-h-60">
        {JSON.stringify(values, null, 2)}
      </pre>
    ),
  })
}

// Stateful demo components
const BasicDemo: React.FC = () => {
  return (
    <Form onFinish={showFormValues}>
      <Form.Item name="username" label="Username">
        <Input placeholder="Enter username" />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

const ValidationDemo: React.FC = () => {
  return (
    <Form onFinish={showFormValues}>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { min: 6, message: 'Password must be at least 6 characters' },
        ]}
      >
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const LayoutsDemo: React.FC = () => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'inline'>('vertical')

  return (
    <Space direction="vertical" size="lg" className="w-full">
      <Radio.Group value={layout} onChange={(e) => setLayout(e.target.value as typeof layout)}>
        <Radio value="vertical">Vertical</Radio>
        <Radio value="horizontal">Horizontal</Radio>
        <Radio value="inline">Inline</Radio>
      </Radio.Group>

      <Form layout={layout} onFinish={showFormValues}>
        <Form.Item name="name" label="Name" required>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="email" label="Email" required>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item>
          <Button color="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}

const InitialValuesDemo: React.FC = () => {
  const initialValues = {
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Software developer',
  }

  return (
    <Form initialValues={initialValues} onFinish={showFormValues}>
      <Form.Item name="username" label="Username">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="bio" label="Bio">
        <Textarea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  )
}

const TooltipExtraDemo: React.FC = () => {
  return (
    <Form onFinish={showFormValues}>
      <Form.Item
        name="username"
        label="Username"
        tooltip="Your unique identifier on the platform"
        extra="Username must be 3-20 characters"
        rules={[{ required: true }, { min: 3 }, { max: 20 }]}
      >
        <Input placeholder="Choose a username" />
      </Form.Item>
      <Form.Item
        name="website"
        label="Website"
        tooltip="Your personal or company website"
        extra={<span>Include <code className="bg-base-200 px-1 rounded">https://</code></span>}
        rules={[{ type: 'url' }]}
      >
        <Input placeholder="https://example.com" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  )
}

const FeedbackDemo: React.FC = () => {
  return (
    <Form onFinish={showFormValues}>
      <Form.Item
        name="email"
        label="Email"
        hasFeedback
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input placeholder="you@example.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        hasFeedback
        rules={[
          { required: true },
          { min: 8, message: 'At least 8 characters' },
        ]}
      >
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">Register</Button>
      </Form.Item>
    </Form>
  )
}

const DependenciesDemo: React.FC = () => {
  const form = Form.useForm()

  return (
    <Form form={form} onFinish={showFormValues}>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true }, { min: 8 }]}
      >
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password' },
          {
            validate: (value: string) => {
              const password = form.getValues('password')
              return value === password || 'Passwords do not match'
            },
          },
        ]}
      >
        <Input type="password" placeholder="Confirm password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}

const ValidateTriggerDemo: React.FC = () => {
  return (
    <Form onFinish={showFormValues}>
      <Form.Item
        name="onChange"
        label="Validate on Change (default)"
        rules={[{ required: true }]}
      >
        <Input placeholder="Validates as you type" />
      </Form.Item>
      <Form.Item
        name="onBlur"
        label="Validate on Blur"
        validateTrigger="onBlur"
        rules={[{ required: true }]}
      >
        <Input placeholder="Validates when you leave the field" />
      </Form.Item>
      <Form.Item
        name="onSubmit"
        label="Validate on Submit"
        validateTrigger="onSubmit"
        rules={[{ required: true }]}
      >
        <Input placeholder="Only validates on submit" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}

const ErrorListDemo: React.FC = () => {
  return (
    <Form onFinish={showFormValues}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }, { pattern: /^\d{10}$/, message: 'Must be 10 digits' }]}>
        <Input placeholder="Enter phone" />
      </Form.Item>
      <div className="mb-4">
        <Form.ErrorList className="bg-error/10 p-3 rounded-lg" />
      </div>
      <Form.Item>
        <Button color="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}

const FloatingLabelDemo: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="fullName" floatingLabel="Full Name" required>
        <Input />
      </Form.Item>
      <Form.Item name="email" floatingLabel="Email Address" required>
        <Input type="email" />
      </Form.Item>
      <Form.Item name="password" floatingLabel="Password" required>
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

const AddonsDemo: React.FC = () => {
  const handleFinish = (values: any) => {
    Modal.success({
      title: 'Form Submitted',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="website" label="Website" addonBefore="https://">
        <Input placeholder="your-site.com" />
      </Form.Item>
      <Form.Item name="price" label="Price" addonBefore="$" addonAfter=".00">
        <Input type="number" placeholder="0" />
      </Form.Item>
      <Form.Item name="email" label="Email" addonAfter="@company.com">
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item>
        <Button color="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const statefulDemos: Record<string, React.FC> = {
  basic: BasicDemo,
  validation: ValidationDemo,
  layouts: LayoutsDemo,
  'initial-values': InitialValuesDemo,
  'tooltip-extra': TooltipExtraDemo,
  'feedback': FeedbackDemo,
  'dependencies': DependenciesDemo,
  'validate-trigger': ValidateTriggerDemo,
  'error-list': ErrorListDemo,
  'floating-label': FloatingLabelDemo,
  'addons': AddonsDemo,
}

// Mount React demos
document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && statefulDemos[exampleId]) {
    const root = createRoot(container as HTMLElement)
    const Component = statefulDemos[exampleId]
    root.render(<Component />)
  }
})

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML =
        CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
