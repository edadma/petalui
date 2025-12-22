import { useState, useMemo } from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
  Modal,
  Card,
  Flex,
  Divider,
  Progress,
  Typography,
} from '@aster-ui/prefixed'
import { Demo } from '../components/Demo'

const { Link, Paragraph, Text } = Typography

// @example-imports: { useState, useMemo } from 'react'
// @example-imports: { Form, Input, Checkbox, Button, Modal, Card, Flex, Divider, Progress, Typography } from 'asterui'
export function SignupFormDemo() {
  // @example-include
  const { Link, Paragraph, Text } = Typography

  function getPasswordStrength(password: string): { score: number; label: string; type: 'error' | 'warning' | 'info' | 'success' } {
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*.?]/.test(password)

    // Count basic rules met
    const basicRules = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial]
    const basicRulesMet = basicRules.filter(Boolean).length

    // If not all basic rules are met, it's weak
    if (basicRulesMet < 5) {
      const score = Math.round((basicRulesMet / 5) * 50)
      return { score, label: 'Weak', type: 'error' }
    }

    // All basic rules met - check for extra strength
    if (password.length >= 16) return { score: 100, label: 'Strong', type: 'success' }
    if (password.length >= 12) return { score: 83, label: 'Good', type: 'info' }
    return { score: 67, label: 'Fair', type: 'warning' }
  }

  const [password, setPassword] = useState('')
  const strength = useMemo(() => getPasswordStrength(password), [password])

  const handleSubmit = (values: any) => {
    Modal.success({
      title: 'Account Created',
      content: <pre className="text-left">{JSON.stringify(values, null, 2)}</pre>,
    })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-show
      <Flex justify="center" align="center" minHeight="screen" className="bg-base-200 p-4">
      @example-show-end */}
      <Flex justify="center" align="center" className="min-h-[500px]">
        {/* @example-return */}
        <Card title="Create Account" className="w-full max-w-[390px]">
          <Form onFinish={handleSubmit} initialValues={{ terms: false }}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
              <Input className="w-full" placeholder="John Doe" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
              <Input className="w-full" placeholder="you@example.com" />
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
              <Input
                className="w-full"
                type="password"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            {password && (
              <div className="mb-4">
                <Progress value={strength.score} type={strength.type} className="h-1" />
                <Text className={`text-xs text-${strength.type}`}>
                  Password strength: {strength.label}
                </Text>
              </div>
            )}
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject('Passwords do not match')
                  },
                }),
              ]}
            >
              <Input className="w-full" type="password" placeholder="Confirm your password" />
            </Form.Item>
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator(_, value) {
                    if (value) return Promise.resolve()
                    return Promise.reject('You must accept the terms')
                  },
                },
              ]}
            >
              <Checkbox>
                I agree to the <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>
              </Checkbox>
            </Form.Item>
            <Button color="primary" htmlType="submit" shape="block">
              Create Account
            </Button>
            <Divider>or</Divider>
            <Paragraph align="center" size="sm">
              Already have an account? <Link>Sign in</Link>
            </Paragraph>
          </Form>
        </Card>
        {/* @example-return-end */}
      </Flex>
      {/* @example-show
      </Flex>
      @example-show-end */}
    </Demo>
  )
}
