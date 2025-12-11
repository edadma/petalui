import React from 'react';
import { createRoot } from 'react-dom/client';
import { Tag, CheckableTag, Space, TagLiveRegion } from 'asterui';
import {
  ClipboardDocumentIcon,
  CheckIcon,
  XMarkIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  FireIcon,
  HeartIcon,
  StarIcon,
  BookmarkIcon,
} from '@heroicons/react/20/solid';

const demos: Record<string, React.ReactNode> = {
  basic: (
    <Space size="sm" wrap>
      <Tag>Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="secondary">Secondary</Tag>
      <Tag color="accent">Accent</Tag>
      <Tag color="info">Info</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
    </Space>
  ),
  variants: (
    <Space size="sm" wrap>
      <Tag color="primary" variant="filled">Filled</Tag>
      <Tag color="primary" variant="outlined">Outlined</Tag>
      <Tag color="primary" variant="soft">Soft</Tag>
      <Tag color="primary" variant="dash">Dash</Tag>
    </Space>
  ),
  closable: (
    <>
      <TagLiveRegion />
      <Space size="sm" wrap>
        <Tag closable color="primary">
          Closable
        </Tag>
        <Tag closable color="success">
          Close Me
        </Tag>
        <Tag closable color="warning">
          Removable
        </Tag>
      </Space>
    </>
  ),
  icons: (
    <Space size="sm" wrap>
      <Tag color="primary" icon={<ClipboardDocumentIcon className="w-3 h-3" />}>
        Document
      </Tag>
      <Tag color="success" icon={<CheckIcon className="w-3 h-3" />}>
        Done
      </Tag>
      <Tag color="error" icon={<XMarkIcon className="w-3 h-3" />}>
        Failed
      </Tag>
    </Space>
  ),
  sizes: (
    <Space size="sm" align="center" wrap>
      <Tag color="primary" size="xs">
        Extra Small
      </Tag>
      <Tag color="primary" size="sm">
        Small
      </Tag>
      <Tag color="primary" size="md">
        Medium
      </Tag>
      <Tag color="primary" size="lg">
        Large
      </Tag>
      <Tag color="primary" size="xl">
        Extra Large
      </Tag>
    </Space>
  ),
  'custom-colors': (
    <Space size="sm" wrap>
      <Tag color="#f50">Red</Tag>
      <Tag color="#2db7f5">Blue</Tag>
      <Tag color="#87d068">Green</Tag>
      <Tag color="#108ee9">Cyan</Tag>
      <Tag color="#f5222d">Crimson</Tag>
    </Space>
  ),
  'link-tags': (
    <Space size="sm" wrap>
      <Tag color="primary" href="https://github.com" target="_blank">
        GitHub
      </Tag>
      <Tag color="info" href="/docs">
        Documentation
      </Tag>
    </Space>
  ),
  disabled: (
    <Space size="sm" wrap>
      <Tag color="primary" disabled>Disabled Tag</Tag>
      <Tag color="primary" closable disabled>Disabled Closable</Tag>
      <CheckableTag disabled>Disabled Checkable</CheckableTag>
    </Space>
  ),
  checkable: (
    <Space size="sm" wrap>
      <CheckableTag checked>React</CheckableTag>
      <CheckableTag>Vue</CheckableTag>
      <CheckableTag>Angular</CheckableTag>
      <CheckableTag>Svelte</CheckableTag>
    </Space>
  ),
  'checkable-colors': (
    <Space size="sm" wrap>
      <CheckableTag checked color="success" size="sm">
        Success
      </CheckableTag>
      <CheckableTag color="warning" size="md">
        Warning
      </CheckableTag>
      <CheckableTag color="error" size="lg">
        Error
      </CheckableTag>
    </Space>
  ),
  'checkable-icons': (
    <Space size="sm" wrap>
      <CheckableTag icon={<HeartIcon className="w-3 h-3" />}>Like</CheckableTag>
      <CheckableTag checked icon={<StarIcon className="w-3 h-3" />}>
        Star
      </CheckableTag>
      <CheckableTag icon={<BookmarkIcon className="w-3 h-3" />}>Save</CheckableTag>
    </Space>
  ),
  'use-cases': (
    <Space direction="vertical" size="md">
      <Space direction="vertical" size="xs">
        <span className="text-sm font-semibold">Categories:</span>
        <Space size="sm" wrap>
          <Tag color="primary">Technology</Tag>
          <Tag color="secondary">Design</Tag>
          <Tag color="accent">Marketing</Tag>
        </Space>
      </Space>

      <Space direction="vertical" size="xs">
        <span className="text-sm font-semibold">Status:</span>
        <Space size="sm" wrap>
          <Tag color="success">Active</Tag>
          <Tag color="warning">Pending</Tag>
          <Tag color="error">Inactive</Tag>
        </Space>
      </Space>

      <Space direction="vertical" size="xs">
        <span className="text-sm font-semibold">Skills:</span>
        <Space size="sm" wrap>
          <Tag closable color="info">
            React
          </Tag>
          <Tag closable color="info">
            TypeScript
          </Tag>
          <Tag closable color="info">
            Node.js
          </Tag>
        </Space>
      </Space>
    </Space>
  ),
};

document.querySelectorAll('.demo-container').forEach((container) => {
  const example = container.getAttribute('data-example');
  if (example && demos[example]) {
    const root = createRoot(container);
    root.render(<>{demos[example]}</>);
  }
});
