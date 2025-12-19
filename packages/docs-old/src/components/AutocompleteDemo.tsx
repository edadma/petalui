import { useState } from 'react'
import { Autocomplete, Space, Form, Button, Modal } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Autocomplete } from 'asterui'
export function BasicDemo() {
  // @example-include
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={countries}
        placeholder="Select a country"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
export function ObjectsDemo() {
  // @example-include
  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'orange', label: 'Orange' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={fruits}
        placeholder="Select a fruit"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [country, setCountry] = useState('')
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Autocomplete
          value={country}
          onChange={setCountry}
          options={countries}
          placeholder="Select a country"
        />
        <p className="mt-2 text-sm text-base-content/70">
          Selected: {country || 'None'}
        </p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
// @example-imports: { useState } from 'react'
export function AllowClearDemo() {
  // @example-include
  const [value, setValue] = useState('Apple')
  const fruits = ['Apple', 'Banana', 'Cherry', 'Orange']
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        value={value}
        onChange={setValue}
        options={fruits}
        allowClear
        placeholder="Select a fruit"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
export function NoCustomDemo() {
  // @example-include
  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={languages}
        allowCustomValue={false}
        placeholder="Select a language"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
export function FilterDemo() {
  // @example-include
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={countries}
        filterOption={(option, input) =>
          option.label.toLowerCase().startsWith(input.toLowerCase())
        }
        placeholder="Type to filter (starts with)"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete, Space } from 'asterui'
export function SizesDemo() {
  // @example-include
  const options = ['Option 1', 'Option 2', 'Option 3']
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Autocomplete size="xs" options={options} placeholder="Extra small" />
        <Autocomplete size="sm" options={options} placeholder="Small" />
        <Autocomplete size="md" options={options} placeholder="Medium" />
        <Autocomplete size="lg" options={options} placeholder="Large" />
        <Autocomplete size="xl" options={options} placeholder="Extra large" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete, Space } from 'asterui'
export function ColorsDemo() {
  // @example-include
  const options = ['Option 1', 'Option 2', 'Option 3']
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <Autocomplete color="primary" options={options} placeholder="Primary" />
        <Autocomplete color="secondary" options={options} placeholder="Secondary" />
        <Autocomplete color="accent" options={options} placeholder="Accent" />
        <Autocomplete color="success" options={options} placeholder="Success" />
        <Autocomplete color="warning" options={options} placeholder="Warning" />
        <Autocomplete color="error" options={options} placeholder="Error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete, Space } from 'asterui'
export function StatusDemo() {
  // @example-include
  const options = ['Option 1', 'Option 2', 'Option 3']
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <div>
          <Autocomplete status="error" options={options} placeholder="Error status" />
          <p className="text-error text-sm mt-1">This field is required</p>
        </div>
        <div>
          <Autocomplete status="warning" options={options} placeholder="Warning status" />
          <p className="text-warning text-sm mt-1">Please verify this value</p>
        </div>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
export function DisabledDemo() {
  // @example-include
  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={fruits}
        disabled
        defaultValue="apple"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
export function DisabledOptionsDemo() {
  // @example-include
  const options = [
    { value: 'opt1', label: 'Available option' },
    { value: 'opt2', label: 'Disabled option', disabled: true },
    { value: 'opt3', label: 'Another available' },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={options}
        placeholder="Some options are disabled"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
export function NotFoundDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Autocomplete
        options={['Apple', 'Banana', 'Cherry']}
        notFoundContent="Sorry, no matches found!"
        placeholder="Search fruits"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete } from 'asterui'
// @example-imports: { useState } from 'react'
export function EmailDemo() {
  // @example-include
  const [email, setEmail] = useState('')

  const domains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com']

  const emailOptions = email.includes('@')
    ? domains.map(domain => email.split('@')[0] + domain)
    : domains.map(domain => email + domain)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Autocomplete
          value={email}
          onChange={setEmail}
          options={emailOptions}
          placeholder="Enter email address"
        />
        <p className="mt-2 text-sm text-base-content/70">
          Email: {email || 'None'}
        </p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Autocomplete, Form, Button, Modal } from 'asterui'
export function FormDemo() {
  // @example-include
  const handleSubmit = (values: { country: string }) => {
    Modal.success({
      title: 'Form Submitted',
      content: `Country: ${values.country}`,
    })
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleSubmit} initialValues={{ country: 'Canada' }}>
        <Form.Item
          name="country"
          label="Country"
          required
          rules={{ required: 'Please select a country' }}
        >
          <Autocomplete
            options={['United States', 'Canada', 'United Kingdom']}
            placeholder="Select a country"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  )
}
