import React from 'react';
import { Select, Space, Form, Button } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Select } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Select>
        <option disabled selected>
          Pick your favorite
        </option>
        <option>Apple</option>
        <option>Orange</option>
        <option>Banana</option>
        <option>Grape</option>
      </Select>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Select } from 'asterui'
export function DefaultValueDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Select defaultValue="orange">
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
        <option value="grape">Grape</option>
      </Select>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Select, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="xs">
        <Select size="xs">
          <option>Extra small</option>
        </Select>
        <Select size="sm">
          <option>Small</option>
        </Select>
        <Select size="md">
          <option>Medium (default)</option>
        </Select>
        <Select size="lg">
          <option>Large</option>
        </Select>
        <Select size="xl">
          <option>Extra large</option>
        </Select>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Select, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="xs">
        <Select color="primary">
          <option>Primary</option>
        </Select>
        <Select color="secondary">
          <option>Secondary</option>
        </Select>
        <Select color="accent">
          <option>Accent</option>
        </Select>
        <Select color="info">
          <option>Info</option>
        </Select>
        <Select color="success">
          <option>Success</option>
        </Select>
        <Select color="warning">
          <option>Warning</option>
        </Select>
        <Select color="error">
          <option>Error</option>
        </Select>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Select } from 'asterui'
export function GhostDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Select ghost>
        <option disabled selected>
          Pick one
        </option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Select } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Select disabled>
        <option>Disabled select</option>
      </Select>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Select, Form, Button } from 'asterui'
export function FormDemo() {
  // @example-include
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log('Form values:', values);
    alert(JSON.stringify(values, null, 2));
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleSubmit} initialValues={{ country: 'canada' }}>
        <Form.Item
          name="country"
          label="Country"
          required
          rules={{ required: 'Please select a country' }}
        >
          <Select>
            <option value="">Select a country</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="mexico">Mexico</option>
            <option value="uk">United Kingdom</option>
          </Select>
        </Form.Item>

        <Form.Item
          name="language"
          label="Language"
          required
          rules={{ required: 'Please select a language' }}
        >
          <Select>
            <option value="">Select a language</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  );
}
