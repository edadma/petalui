import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { Input, Space } from 'asterui';
import { CheckIconSvg } from './icons'
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline'

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  'basic': (
    <Input placeholder="Enter text..." />
  ),
  'sizes': (
    <Space direction="vertical" size="sm">
      <Input size="xs" placeholder="Extra small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium (default)" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra large" />
    </Space>
  ),
  'colors': (
    <Space direction="vertical" size="sm">
      <Input color="primary" placeholder="Primary" />
      <Input color="secondary" placeholder="Secondary" />
      <Input color="accent" placeholder="Accent" />
      <Input color="info" placeholder="Info" />
      <Input color="success" placeholder="Success" />
      <Input color="warning" placeholder="Warning" />
      <Input color="error" placeholder="Error" />
    </Space>
  ),
  'types': (
    <Space direction="vertical" size="sm">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Telephone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
    </Space>
  ),
  'variants': (
    <Space direction="vertical" size="sm">
      <Input placeholder="Default bordered" />
      <Input bordered={false} placeholder="Without border" />
      <Input ghost placeholder="Ghost variant" />
    </Space>
  ),
  'mask': (
    <Space direction="vertical" size="sm">
      <Input mask="(###) ###-####" placeholder="Phone number" />
      <Input mask="####-####-####-####" placeholder="Credit card" />
      <Input mask="##/##/####" placeholder="Date (MM/DD/YYYY)" />
      <Input mask="AA-####" placeholder="License plate" />
    </Space>
  ),
  'disabled': (
    <Space direction="vertical" size="sm">
      <Input placeholder="Normal input" />
      <Input placeholder="Disabled input" disabled />
      <Input value="Disabled with value" disabled />
    </Space>
  ),
  'prefix-suffix': (
    <Space direction="vertical" size="sm">
      <Input prefix={<MagnifyingGlassIcon className="w-4 h-4" />} placeholder="Search..." />
      <Input prefix={<UserIcon className="w-4 h-4" />} placeholder="Username" />
      <Input suffix="@gmail.com" placeholder="Email" />
    </Space>
  ),
  'status': (
    <Space direction="vertical" size="sm">
      <div>
        <Input status="error" placeholder="Error status" errorId="error-msg" />
        <p id="error-msg" className="text-error text-sm mt-1">This field is required</p>
      </div>
      <div>
        <Input status="warning" placeholder="Warning status" />
        <p className="text-warning text-sm mt-1">Please verify this value</p>
      </div>
    </Space>
  ),
  'addons': (
    <Space direction="vertical" size="md">
      <Input addonBefore="https://" placeholder="your-site.com" />
      <Input addonAfter=".com" placeholder="username" />
      <Input addonBefore="$" addonAfter=".00" placeholder="0" />
    </Space>
  ),
};

// Stateful demo components
const ControlledDemo: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Space direction="vertical" size="sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <div className="text-sm text-base-content/70">
        Value: {value || '(empty)'}
      </div>
    </Space>
  );
};

const AllowClearDemo: React.FC = () => {
  const [value, setValue] = useState('Clear me!');

  return (
    <Space direction="vertical" size="sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        allowClear
        placeholder="Type then clear..."
      />
    </Space>
  );
};

const FloatingLabelDemo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Space direction="vertical" size="md">
      <Input
        floatingLabel="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        floatingLabel="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Space>
  );
};

const statefulDemos: Record<string, React.FC> = {
  'controlled': ControlledDemo,
  'allowClear': AllowClearDemo,
  'floating-label': FloatingLabelDemo,
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
