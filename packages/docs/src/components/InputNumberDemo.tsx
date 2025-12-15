import React, { useState } from 'react';
import { InputNumber, Space } from 'asterui';
import { Demo } from './Demo';

export const BasicDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <Demo>
      <InputNumber value={value} onChange={setValue} />
    </Demo>
  );
};

export const MinMaxDemo: React.FC = () => {
  const [value, setValue] = useState(5);

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <InputNumber
          value={value}
          onChange={setValue}
          min={0}
          max={10}
        />
        <div className="text-sm text-base-content/70">
          Value: {value} (min: 0, max: 10)
        </div>
      </Space>
    </Demo>
  );
};

export const StepDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <InputNumber
          value={value}
          onChange={setValue}
          step={5}
        />
        <div className="text-sm text-base-content/70">
          Step: 5
        </div>
      </Space>
    </Demo>
  );
};

export const PrecisionDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <InputNumber
          value={value}
          onChange={setValue}
          step={0.1}
          precision={2}
        />
        <div className="text-sm text-base-content/70">
          Precision: 2 decimal places
        </div>
      </Space>
    </Demo>
  );
};

export const SizesDemo: React.FC = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <InputNumber size="xs" value={value1} onChange={setValue1} />
        <InputNumber size="sm" value={value2} onChange={setValue2} />
        <InputNumber size="md" value={value3} onChange={setValue3} />
        <InputNumber size="lg" value={value4} onChange={setValue4} />
        <InputNumber size="xl" value={value5} onChange={setValue5} />
      </Space>
    </Demo>
  );
};

export const NoControlsDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <Demo>
      <InputNumber
        value={value}
        onChange={setValue}
        controls={false}
      />
    </Demo>
  );
};

export const DisabledDemo: React.FC = () => {
  const [value, setValue] = useState(42);

  return (
    <Demo>
      <Space direction="vertical" size="sm">
        <InputNumber value={value} onChange={setValue} />
        <InputNumber value={42} onChange={() => {}} disabled />
      </Space>
    </Demo>
  );
};
