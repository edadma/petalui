import React, { useState } from 'react';
import { Range, Space, Form, Button } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Range } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Range />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range } from 'asterui'
export function ShowValueDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Range showValue />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range } from 'asterui'
export function ShowStepsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Range showSteps step={10} />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [value, setValue] = useState(50);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Range value={value} onChange={setValue} showValue />
        <p className="mt-2 text-sm text-base-content/70">Value: {value}</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range } from 'asterui'
export function CustomRangeDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Range min={0} max={10} step={0.5} defaultValue={5} showValue />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        <Range color="primary" defaultValue={25} />
        <Range color="secondary" defaultValue={35} />
        <Range color="accent" defaultValue={45} />
        <Range color="success" defaultValue={55} />
        <Range color="warning" defaultValue={65} />
        <Range color="info" defaultValue={75} />
        <Range color="error" defaultValue={85} />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="lg">
        <Range size="xs" defaultValue={25} />
        <Range size="sm" defaultValue={50} />
        <Range size="md" defaultValue={75} />
        <Range size="lg" defaultValue={90} />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Range disabled defaultValue={60} />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range } from 'asterui'
// @example-imports: { useState } from 'react'
export function VolumeDemo() {
  // @example-include
  const [volume, setVolume] = useState(50);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="p-4 border border-base-300 rounded-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
          </span>
          <Range
            value={volume}
            onChange={setVolume}
            color="primary"
            className="flex-1"
          />
          <span className="text-sm font-medium w-12 text-right">{volume}%</span>
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Range, Form, Button } from 'asterui'
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
      <Form onFinish={handleSubmit} initialValues={{ volume: 50, brightness: 75 }}>
        <Form.Item name="volume" label="Volume">
          <Range showValue color="primary" />
        </Form.Item>

        <Form.Item name="brightness" label="Brightness">
          <Range showValue color="warning" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  );
}
