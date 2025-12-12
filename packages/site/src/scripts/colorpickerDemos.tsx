import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { ColorPicker, Space, Typography } from 'asterui';
import { CheckIconSvg } from './icons';

const { Text } = Typography;

const presets = [
  '#f43f5e', '#ec4899', '#d946ef', '#a855f7',
  '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9',
  '#06b6d4', '#14b8a6', '#10b981', '#22c55e',
];

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  basic: <ColorPicker defaultValue="#6366f1" />,
  'show-text': <ColorPicker defaultValue="#10b981" showText />,
  presets: <ColorPicker defaultValue="#6366f1" presets={presets} />,
  sizes: (
    <Space direction="vertical" size="md">
      <ColorPicker size="xs" defaultValue="#f43f5e" mode="picker" />
      <ColorPicker size="sm" defaultValue="#6366f1" mode="picker" />
      <ColorPicker size="md" defaultValue="#10b981" mode="picker" />
      <ColorPicker size="lg" defaultValue="#a855f7" mode="picker" />
    </Space>
  ),
  modes: (
    <Space direction="vertical" size="lg">
      <Space direction="vertical" size="xs">
        <Text size="sm" muted>Picker only</Text>
        <ColorPicker mode="picker" defaultValue="#6366f1" />
      </Space>
      <Space direction="vertical" size="xs">
        <Text size="sm" muted>Swatches only</Text>
        <ColorPicker mode="swatches" defaultValue="#6366f1" />
      </Space>
    </Space>
  ),
};

// Stateful demo components
function ControlledDemo() {
  const [color, setColor] = useState('#6366f1');

  return (
    <Space direction="vertical" size="sm">
      <ColorPicker value={color} onChange={setColor} showText />
      <div
        className="w-full h-16 rounded-lg"
        style={{ backgroundColor: color }}
      />
    </Space>
  );
}

const statefulDemos: Record<string, React.FC> = {
  controlled: ControlledDemo,
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId) {
    const root = createRoot(container as HTMLElement);
    if (demos[exampleId]) {
      root.render(demos[exampleId]);
    } else if (statefulDemos[exampleId]) {
      const Component = statefulDemos[exampleId];
      root.render(<Component />);
    }
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
