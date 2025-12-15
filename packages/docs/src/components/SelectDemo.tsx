import React from 'react';
import { Select, Space, Form, Button } from 'asterui';
import { Demo } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <Select>
        <option disabled selected>
          Pick your favorite
        </option>
        <option>Apple</option>
        <option>Orange</option>
        <option>Banana</option>
        <option>Grape</option>
      </Select>
    </Demo>
  );
}

export function DefaultValueDemo() {
  return (
    <Demo>
      <Select defaultValue="orange">
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
        <option value="grape">Grape</option>
      </Select>
    </Demo>
  );
}

export function SizesDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}

export function ColorsDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}

export function GhostDemo() {
  return (
    <Demo>
      <Select ghost>
        <option disabled selected>
          Pick one
        </option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    </Demo>
  );
}

export function DisabledDemo() {
  return (
    <Demo>
      <Select disabled>
        <option>Disabled select</option>
      </Select>
    </Demo>
  );
}

export function FormDemo() {
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log('Form values:', values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Demo>
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
    </Demo>
  );
}
