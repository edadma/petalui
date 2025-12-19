import React, { useState } from 'react';
import { InputNumber, Space } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { InputNumber } from 'asterui'
// @example-imports: { useState } from 'react'
export const BasicDemo: React.FC = () => {
  // @example-include
  const [value, setValue] = useState(0);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <InputNumber value={value} onChange={setValue} />
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { InputNumber, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export const MinMaxDemo: React.FC = () => {
  // @example-include
  const [value, setValue] = useState(5);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { InputNumber, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export const StepDemo: React.FC = () => {
  // @example-include
  const [value, setValue] = useState(0);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { InputNumber, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export const PrecisionDemo: React.FC = () => {
  // @example-include
  const [value, setValue] = useState(0);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { InputNumber, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export const SizesDemo: React.FC = () => {
  // @example-include
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <InputNumber size="xs" value={value1} onChange={setValue1} />
        <InputNumber size="sm" value={value2} onChange={setValue2} />
        <InputNumber size="md" value={value3} onChange={setValue3} />
        <InputNumber size="lg" value={value4} onChange={setValue4} />
        <InputNumber size="xl" value={value5} onChange={setValue5} />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { InputNumber } from 'asterui'
// @example-imports: { useState } from 'react'
export const NoControlsDemo: React.FC = () => {
  // @example-include
  const [value, setValue] = useState(0);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <InputNumber
        value={value}
        onChange={setValue}
        controls={false}
      />
      {/* @example-return-end */}
    </Demo>
  );
};

// @example-imports: { InputNumber, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export const DisabledDemo: React.FC = () => {
  // @example-include
  const [value, setValue] = useState(42);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="sm">
        <InputNumber value={value} onChange={setValue} />
        <InputNumber value={42} onChange={() => {}} disabled />
      </Space>
      {/* @example-return-end */}
    </Demo>
  );
};
