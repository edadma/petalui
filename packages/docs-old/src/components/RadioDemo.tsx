import { useState } from 'react';
import { Radio, Space, Form, Modal } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Radio, Space } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Radio.Group defaultValue="1">
        <Space size="sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <Radio value="1" />
            <span>Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Radio value="2" />
            <span>Option 2</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Radio value="3" />
            <span>Option 3</span>
          </label>
        </Space>
      </Radio.Group>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Radio } from 'asterui'
export function HorizontalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Radio.Group defaultValue="apple">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Radio value="apple" />
            <span>Apple</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Radio value="orange" />
            <span>Orange</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Radio value="banana" />
            <span>Banana</span>
          </label>
        </div>
      </Radio.Group>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Radio, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm">
        <label className="flex items-center gap-2">
          <Radio size="xs" defaultChecked />
          <span className="text-xs">Extra Small</span>
        </label>
        <label className="flex items-center gap-2">
          <Radio size="sm" />
          <span className="text-sm">Small</span>
        </label>
        <label className="flex items-center gap-2">
          <Radio size="md" />
          <span>Medium</span>
        </label>
        <label className="flex items-center gap-2">
          <Radio size="lg" />
          <span className="text-lg">Large</span>
        </label>
        <label className="flex items-center gap-2">
          <Radio size="xl" />
          <span className="text-xl">Extra Large</span>
        </label>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Radio } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-wrap gap-4">
        <Radio color="primary" defaultChecked />
        <Radio color="secondary" />
        <Radio color="accent" />
        <Radio color="info" />
        <Radio color="success" />
        <Radio color="warning" />
        <Radio color="error" />
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Radio, Space } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="sm">
        <label className="flex items-center gap-2">
          <Radio disabled />
          <span className="opacity-50">Disabled unchecked</span>
        </label>
        <label className="flex items-center gap-2">
          <Radio disabled defaultChecked />
          <span className="opacity-50">Disabled checked</span>
        </label>
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Radio, Space, Form, Modal } from 'asterui'
// @example-imports: { useState } from 'react'
export function FormDemo() {
  // @example-include
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values: { plan?: string }) => {
    setSubmittedData(values);
    setIsModalOpen(true);
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleSubmit} initialValues={{ plan: 'basic' }}>
        <Form.Item name="plan" label="Choose a plan" rules={{ required: 'Please select a plan' }}>
          <Radio.Group>
            <Space size="sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="basic" />
                <div>
                  <div className="font-semibold">Basic</div>
                  <div className="text-sm opacity-70">$10/month</div>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="pro" />
                <div>
                  <div className="font-semibold">Pro</div>
                  <div className="text-sm opacity-70">$20/month</div>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Radio value="enterprise" />
                <div>
                  <div className="font-semibold">Enterprise</div>
                  <div className="text-sm opacity-70">Contact us</div>
                </div>
              </label>
            </Space>
          </Radio.Group>
        </Form.Item>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
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
