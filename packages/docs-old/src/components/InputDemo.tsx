import { useState } from 'react'
import { Input, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Input } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Input placeholder="Enter text..." />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input size="xs" placeholder="Extra small" />
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium (default)" />
        <Input size="lg" placeholder="Large" />
        <Input size="xl" placeholder="Extra large" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input color="primary" placeholder="Primary" />
        <Input color="secondary" placeholder="Secondary" />
        <Input color="accent" placeholder="Accent" />
        <Input color="info" placeholder="Info" />
        <Input color="success" placeholder="Success" />
        <Input color="warning" placeholder="Warning" />
        <Input color="error" placeholder="Error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function TypesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password input" />
        <Input type="number" placeholder="Number input" />
        <Input type="tel" placeholder="Telephone input" />
        <Input type="url" placeholder="URL input" />
        <Input type="search" placeholder="Search input" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function VariantsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input placeholder="Default bordered" />
        <Input bordered={false} placeholder="Without border" />
        <Input ghost placeholder="Ghost variant" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function MaskDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input mask="(###) ###-####" placeholder="Phone number" />
        <Input mask="####-####-####-####" placeholder="Credit card" />
        <Input mask="##/##/####" placeholder="Date (MM/DD/YYYY)" />
        <Input mask="AA-####" placeholder="License plate" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [value, setValue] = useState('')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <div className="text-sm text-base-content/70">
          Value: {value || '(empty)'}
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input placeholder="Normal input" />
        <Input placeholder="Disabled input" disabled />
        <Input value="Disabled with value" disabled />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input } from 'asterui'
// @example-imports: { useState } from 'react'
export function AllowClearDemo() {
  // @example-include
  const [value, setValue] = useState('Clear me!')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        allowClear
        placeholder="Type then clear..."
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function PrefixSuffixDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Input prefix={<span>🔍</span>} placeholder="Search..." />
        <Input prefix={<span>👤</span>} placeholder="Username" />
        <Input suffix="@gmail.com" placeholder="Email" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function StatusDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <div>
          <Input status="error" placeholder="Error status" errorId="error-msg" />
          <p id="error-msg" className="text-error text-sm mt-1">This field is required</p>
        </div>
        <div>
          <Input status="warning" placeholder="Warning status" />
          <p className="text-warning text-sm mt-1">Please verify this value</p>
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function FloatingLabelDemo() {
  // @example-include
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Input
          floatingLabel="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          floatingLabel="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Input, Space } from 'asterui'
export function AddonsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <Input addonBefore="https://" placeholder="your-site.com" />
        <Input addonAfter=".com" placeholder="username" />
        <Input addonBefore="$" addonAfter=".00" placeholder="0" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
