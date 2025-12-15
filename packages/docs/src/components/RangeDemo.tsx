import React, { useState } from 'react';
import { Range, Space, Form, Button } from 'asterui';
import { Demo } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <Range />
    </Demo>
  );
}

export function ShowValueDemo() {
  return (
    <Demo>
      <Range showValue />
    </Demo>
  );
}

export function ShowStepsDemo() {
  return (
    <Demo>
      <Range showSteps step={10} />
    </Demo>
  );
}

export function ControlledDemo() {
  const [value, setValue] = useState(50);
  return (
    <Demo>
      <div>
        <Range value={value} onChange={setValue} showValue />
        <p className="mt-2 text-sm text-base-content/70">Value: {value}</p>
      </div>
    </Demo>
  );
}

export function CustomRangeDemo() {
  return (
    <Demo>
      <Range min={0} max={10} step={0.5} defaultValue={5} showValue />
    </Demo>
  );
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space>
        <Range color="primary" defaultValue={25} />
        <Range color="secondary" defaultValue={35} />
        <Range color="accent" defaultValue={45} />
        <Range color="success" defaultValue={55} />
        <Range color="warning" defaultValue={65} />
        <Range color="info" defaultValue={75} />
        <Range color="error" defaultValue={85} />
      </Space>
    </Demo>
  );
}

export function SizesDemo() {
  return (
    <Demo>
      <Space size="lg">
        <Range size="xs" defaultValue={25} />
        <Range size="sm" defaultValue={50} />
        <Range size="md" defaultValue={75} />
        <Range size="lg" defaultValue={90} />
      </Space>
    </Demo>
  );
}

export function DisabledDemo() {
  return (
    <Demo>
      <Range disabled defaultValue={60} />
    </Demo>
  );
}

export function VolumeDemo() {
  const [volume, setVolume] = useState(50);
  return (
    <Demo>
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
    </Demo>
  );
}
