import {
  Form,
  Input,
  Checkbox,
  Button,
  Modal,
  Divider,
  Card,
  Space,
  Flex,
  Typography,
} from '@edadma/bloomui'

const { Link, Paragraph } = Typography

export default function App() {
  const handleSubmit = (values: { email: string; password: string; remember: boolean }) => {
    Modal.success({
      title: 'Login Successful',
      content: <pre className="text-left">{JSON.stringify(values, null, 2)}</pre>,
    })
  }

  return (
    <Flex justify="center" align="center" minHeight="screen" className="bg-base-200 p-4">
      <Card title="Sign In" className="w-full max-w-md">
        <Form onFinish={handleSubmit} initialValues={{ remember: false }}>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true },
              { min: 8, message: 'Password must be at least 8 characters' },
              { pattern: /[A-Z]/, message: 'Must contain an uppercase letter' },
              { pattern: /[a-z]/, message: 'Must contain a lowercase letter' },
              { pattern: /[0-9]/, message: 'Must contain a number' },
              { pattern: /[!@#$%^&*.?]/, message: 'Must contain a special character' },
            ]}
          >
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>
          <Space justify="between" align="center" className="mb-4">
            <Form.Item name="remember" valuePropName="checked" inline>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link size="sm">Forgot password?</Link>
          </Space>
          <Button type="primary" htmlType="submit" shape="block">
            Sign In
          </Button>
          <Divider>or</Divider>
          <Paragraph align="center" size="sm">
            Don't have an account? <Link>Sign up</Link>
          </Paragraph>
        </Form>
      </Card>
    </Flex>
  )
}
