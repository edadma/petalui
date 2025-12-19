import { useState } from 'react'
import { Form, Input, Button, Textarea, Radio, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Form, Input, Button } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button } from 'asterui'
export function ValidationDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' }
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button } from 'asterui'
export function TooltipExtraDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
        <Form.Item
          name="username"
          label="Username"
          tooltip="Your unique identifier on the platform"
          extra="Username must be 3-20 characters"
          rules={[{ required: true }, { min: 3 }, { max: 20 }]}
        >
          <Input placeholder="Choose a username" />
        </Form.Item>
        <Form.Item>
          <Button color="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button } from 'asterui'
export function FeedbackDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button, Radio, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function LayoutsDemo() {
  // @example-include
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'inline'>('vertical')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="lg" className="w-full">
        <Radio.Group
          value={layout}
          onChange={(e) => setLayout(e.target.value as typeof layout)}
        >
          <Radio value="vertical">Vertical</Radio>
          <Radio value="horizontal">Horizontal</Radio>
          <Radio value="inline">Inline</Radio>
        </Radio.Group>

        <Form layout={layout} onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button, Textarea } from 'asterui'
export function InitialValuesDemo() {
  // @example-include
  const initialValues = {
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Software developer'
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form initialValues={initialValues} onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button } from 'asterui'
export function FloatingLabelDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Form, Input, Button } from 'asterui'
export function AddonsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={(values) => alert(JSON.stringify(values, null, 2))}>
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
      {/* @example-return-end */}
    </Demo>
  )
}
