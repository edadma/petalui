import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { InputNumber, Space } from 'asterui';
import { CheckIconSvg } from './icons'

// Stateful demo components
const BasicDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <InputNumber value={value} onChange={setValue} />
  );
};

const MinMaxDemo: React.FC = () => {
  const [value, setValue] = useState(5);

  return (
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
  );
};

const StepDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
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
  );
};

const PrecisionDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
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
  );
};

const SizesDemo: React.FC = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);

  return (
    <Space direction="vertical" size="sm">
      <InputNumber size="xs" value={value1} onChange={setValue1} />
      <InputNumber size="sm" value={value2} onChange={setValue2} />
      <InputNumber size="md" value={value3} onChange={setValue3} />
      <InputNumber size="lg" value={value4} onChange={setValue4} />
      <InputNumber size="xl" value={value5} onChange={setValue5} />
    </Space>
  );
};

const NoControlsDemo: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <InputNumber
      value={value}
      onChange={setValue}
      controls={false}
    />
  );
};

const DisabledDemo: React.FC = () => {
  const [value, setValue] = useState(42);

  return (
    <Space direction="vertical" size="sm">
      <InputNumber value={value} onChange={setValue} />
      <InputNumber value={42} onChange={() => {}} disabled />
    </Space>
  );
};

const statefulDemos: Record<string, React.FC> = {
  'basic': BasicDemo,
  'min-max': MinMaxDemo,
  'step': StepDemo,
  'precision': PrecisionDemo,
  'sizes': SizesDemo,
  'no-controls': NoControlsDemo,
  'disabled': DisabledDemo,
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId && statefulDemos[exampleId]) {
    const root = createRoot(container as HTMLElement);
    const Component = statefulDemos[exampleId];
    root.render(<Component />);
  }
});

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code');
    if (code) {
      await navigator.clipboard.writeText(code);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = CheckIconSvg;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }
  });
});
