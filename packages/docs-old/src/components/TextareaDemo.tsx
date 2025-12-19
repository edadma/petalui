import React, { useState } from 'react';
import { Textarea, Form, Button, Modal, Space } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Textarea } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Textarea placeholder="Type your message here" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Textarea } from 'asterui'
export function RowsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Textarea rows={6} placeholder="Tall textarea" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Textarea, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="xs">
        <Textarea size="xs" placeholder="Extra small" />
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium (default)" />
        <Textarea size="lg" placeholder="Large" />
        <Textarea size="xl" placeholder="Extra large" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Textarea, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="xs">
        <Textarea color="primary" placeholder="Primary" />
        <Textarea color="secondary" placeholder="Secondary" />
        <Textarea color="accent" placeholder="Accent" />
        <Textarea color="info" placeholder="Info" />
        <Textarea color="success" placeholder="Success" />
        <Textarea color="warning" placeholder="Warning" />
        <Textarea color="error" placeholder="Error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Textarea } from 'asterui'
export function GhostDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Textarea ghost placeholder="Ghost textarea" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Textarea } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Textarea disabled placeholder="Disabled textarea" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Textarea, Form, Button, Modal } from 'asterui'
// @example-imports: { useState } from 'react'
export function FormDemo() {
  // @example-include
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values: Record<string, unknown>) => {
    setSubmittedData(values);
    setIsModalOpen(true);
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="message"
          label="Message"
          required
          rules={{
            required: 'Please enter a message',
            min: { value: 10, message: 'Message must be at least 10 characters' },
          }}
        >
          <Textarea rows={4} placeholder="Enter your message here" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Send Message
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Form Submitted"
        footer={null}
      >
        <div className="py-4">
          <p className="mb-4">Form data:</p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      </Modal>
      {/* @example-return-end */}
    </Demo>
  );
}
