import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { Button, Space, Input, Form, notification } from 'asterui';
import { XMarkIcon, ArrowUpTrayIcon, CheckIcon, TrashIcon } from '@aster-ui/icons';
import { CheckIconSvg } from './icons'

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  'brand-colors': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="neutral">Neutral</Button>
    </Space>
  ),
  'state-colors': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </Space>
  ),
  'variants': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary">Solid</Button>
      <Button color="primary" variant="outline">Outline</Button>
      <Button color="primary" variant="dash">Dash</Button>
      <Button color="primary" variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </Space>
  ),
  'sizes': (
    <Space direction="horizontal" wrap size="sm" align="center">
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XL</Button>
    </Space>
  ),
  'outline': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" variant="outline">Primary</Button>
      <Button color="secondary" variant="outline">Secondary</Button>
      <Button color="accent" variant="outline">Accent</Button>
      <Button color="success" variant="outline">Success</Button>
      <Button color="error" variant="outline">Error</Button>
    </Space>
  ),
  'dash': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" variant="dash">Primary</Button>
      <Button color="secondary" variant="dash">Secondary</Button>
      <Button color="accent" variant="dash">Accent</Button>
    </Space>
  ),
  'soft': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" variant="soft">Primary</Button>
      <Button color="secondary" variant="soft">Secondary</Button>
      <Button color="accent" variant="soft">Accent</Button>
      <Button color="success" variant="soft">Success</Button>
      <Button color="warning" variant="soft">Warning</Button>
    </Space>
  ),
  'states': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary">Normal</Button>
      <Button color="primary" active>Active</Button>
      <Button color="primary" loading>Loading</Button>
      <Button color="primary" disabled>Disabled</Button>
    </Space>
  ),
  'shapes': (
    <Space direction="horizontal" wrap size="sm" align="center">
      <Button color="primary" shape="square">
        <XMarkIcon />
      </Button>
      <Button color="primary" shape="circle">
        <XMarkIcon />
      </Button>
    </Space>
  ),
  'wide': (
    <Space direction="vertical" size="sm">
      <Button color="primary" shape="wide">Wide Button</Button>
      <Button color="secondary" shape="wide">Another Wide</Button>
    </Space>
  ),
  'block': (
    <Space direction="vertical" className="w-full">
      <Button color="primary" shape="block">Block Button</Button>
      <Button color="secondary" shape="block">Another Block</Button>
    </Space>
  ),
  'loading': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" loading>Loading</Button>
      <Button color="success" loading>Processing</Button>
      <Button color="error" loading>Deleting</Button>
    </Space>
  ),
  'link-buttons': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" href="https://github.com" target="_blank">GitHub</Button>
      <Button variant="ghost" href="https://npmjs.com" target="_blank">npm</Button>
      <Button href="/components" variant="link">Internal Link</Button>
    </Space>
  ),
  'with-icons': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" icon={<ArrowUpTrayIcon />}>
        Upload
      </Button>
      <Button color="success" icon={<CheckIcon />}>
        Save
      </Button>
      <Button color="error" icon={<TrashIcon />} iconPosition="end">
        Delete
      </Button>
    </Space>
  ),
  'icon-sizes': (
    <Space direction="horizontal" wrap size="sm" align="center">
      <Button size="xs" color="primary" icon={<ArrowUpTrayIcon />}>XS</Button>
      <Button size="sm" color="primary" icon={<ArrowUpTrayIcon />}>Small</Button>
      <Button size="md" color="primary" icon={<ArrowUpTrayIcon />}>Medium</Button>
      <Button size="lg" color="primary" icon={<ArrowUpTrayIcon />}>Large</Button>
      <Button size="xl" color="primary" icon={<ArrowUpTrayIcon />}>XL</Button>
    </Space>
  ),
  'danger': (
    <Space direction="horizontal" wrap size="sm">
      <Button danger>Delete</Button>
      <Button danger icon={<TrashIcon />}>
        Remove Item
      </Button>
      <Button danger variant="outline">Cancel Account</Button>
    </Space>
  ),
  'round': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" shape="round">Get Started</Button>
      <Button color="secondary" shape="round">Learn More</Button>
      <Button color="accent" shape="round">Subscribe</Button>
    </Space>
  ),
  'no-animation': (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary">With Animation</Button>
      <Button color="primary" noAnimation>No Animation</Button>
    </Space>
  ),
};

// Stateful demo components
const FormSubmitDemo: React.FC = () => {
  const handleFinish = (values: { email: string }) => {
    notification.success({ message: 'Submitted!', description: `Email: ${values.email}` });
  };

  return (
    <Form onFinish={handleFinish}>
      <Form.Item name="email" label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </Form.Item>
      <Form.Item>
        <Space direction="horizontal" size="sm">
          <Button color="primary" htmlType="submit">Submit</Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const EventHandlingDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAsync = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <Space direction="horizontal" wrap size="sm">
      <Button color="primary" onClick={() => setCount(c => c + 1)}>
        Clicked {count} times
      </Button>
      <Button color="secondary" onClick={handleAsync} loading={loading}>
        {loading ? 'Processing...' : 'Async Action'}
      </Button>
    </Space>
  );
};

const ToggleButtonDemo: React.FC = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <Space direction="horizontal" wrap size="sm">
      <Button
        color="primary"
        pressed={pressed}
        active={pressed}
        onClick={() => setPressed(!pressed)}
      >
        {pressed ? 'On' : 'Off'}
      </Button>
      <Button
        color="secondary"
        variant="outline"
        pressed={pressed}
        active={pressed}
        onClick={() => setPressed(!pressed)}
      >
        Toggle: {pressed ? 'Active' : 'Inactive'}
      </Button>
    </Space>
  );
};

const statefulDemos: Record<string, React.FC> = {
  'form-submit': FormSubmitDemo,
  'event-handling': EventHandlingDemo,
  'toggle': ToggleButtonDemo,
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
