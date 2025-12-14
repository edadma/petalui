import { useState } from 'react'
import { Autocomplete, Space, Form, Button, Modal } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
  ]

  return (
    <Demo>
      <Autocomplete
        options={countries}
        placeholder="Select a country"
      />
    </Demo>
  )
}

export function ObjectsDemo() {
  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'orange', label: 'Orange' },
  ]

  return (
    <Demo>
      <Autocomplete
        options={fruits}
        placeholder="Select a fruit"
      />
    </Demo>
  )
}

export function ControlledDemo() {
  const [country, setCountry] = useState('')
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
  ]

  return (
    <Demo>
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
    </Demo>
  )
}

export function AllowClearDemo() {
  const [value, setValue] = useState('Apple')
  const fruits = ['Apple', 'Banana', 'Cherry', 'Orange']

  return (
    <Demo>
      <Autocomplete
        value={value}
        onChange={setValue}
        options={fruits}
        allowClear
        placeholder="Select a fruit"
      />
    </Demo>
  )
}

export function NoCustomDemo() {
  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
  ]

  return (
    <Demo>
      <Autocomplete
        options={languages}
        allowCustomValue={false}
        placeholder="Select a language"
      />
    </Demo>
  )
}

export function FilterDemo() {
  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
  ]

  return (
    <Demo>
      <Autocomplete
        options={countries}
        filterOption={(option, input) =>
          option.label.toLowerCase().startsWith(input.toLowerCase())
        }
        placeholder="Type to filter (starts with)"
      />
    </Demo>
  )
}

export function SizesDemo() {
  const options = ['Option 1', 'Option 2', 'Option 3']

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <Autocomplete size="xs" options={options} placeholder="Extra small" />
        <Autocomplete size="sm" options={options} placeholder="Small" />
        <Autocomplete size="md" options={options} placeholder="Medium" />
        <Autocomplete size="lg" options={options} placeholder="Large" />
        <Autocomplete size="xl" options={options} placeholder="Extra large" />
      </Space>
    </Demo>
  )
}

export function ColorsDemo() {
  const options = ['Option 1', 'Option 2', 'Option 3']

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <Autocomplete color="primary" options={options} placeholder="Primary" />
        <Autocomplete color="secondary" options={options} placeholder="Secondary" />
        <Autocomplete color="accent" options={options} placeholder="Accent" />
        <Autocomplete color="success" options={options} placeholder="Success" />
        <Autocomplete color="warning" options={options} placeholder="Warning" />
        <Autocomplete color="error" options={options} placeholder="Error" />
      </Space>
    </Demo>
  )
}

export function StatusDemo() {
  const options = ['Option 1', 'Option 2', 'Option 3']

  return (
    <Demo>
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
    </Demo>
  )
}

export function DisabledDemo() {
  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]

  return (
    <Demo>
      <Autocomplete
        options={fruits}
        disabled
        defaultValue="apple"
      />
    </Demo>
  )
}

export function DisabledOptionsDemo() {
  const options = [
    { value: 'opt1', label: 'Available option' },
    { value: 'opt2', label: 'Disabled option', disabled: true },
    { value: 'opt3', label: 'Another available' },
  ]

  return (
    <Demo>
      <Autocomplete
        options={options}
        placeholder="Some options are disabled"
      />
    </Demo>
  )
}

export function NotFoundDemo() {
  return (
    <Demo>
      <Autocomplete
        options={['Apple', 'Banana', 'Cherry']}
        notFoundContent="Sorry, no matches found!"
        placeholder="Search fruits"
      />
    </Demo>
  )
}

export function EmailDemo() {
  const [email, setEmail] = useState('')

  const domains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com']

  const emailOptions = email.includes('@')
    ? domains.map(domain => email.split('@')[0] + domain)
    : domains.map(domain => email + domain)

  return (
    <Demo>
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
    </Demo>
  )
}

export function FormDemo() {
  const handleSubmit = (values: { country: string }) => {
    Modal.success({
      title: 'Form Submitted',
      content: `Country: ${values.country}`,
    })
  }

  return (
    <Demo>
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
    </Demo>
  )
}
