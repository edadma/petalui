import { createRoot } from 'react-dom/client';
import React from 'react';
import { Descriptions } from 'asterui';
import { CheckIconSvg } from './icons';

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  'basic': (
    <Descriptions
      items={[
        { label: 'Name', children: 'John Doe' },
        { label: 'Email', children: 'john@example.com' },
        { label: 'Phone', children: '+1 234 567 890' },
        { label: 'Location', children: 'San Francisco, CA' },
        { label: 'Status', children: 'Active' },
      ]}
    />
  ),
  'bordered': (
    <Descriptions
      items={[
        { label: 'Product', children: 'AsterUI Pro' },
        { label: 'Price', children: '$99.00' },
        { label: 'Quantity', children: '2' },
        { label: 'Total', children: '$198.00' },
      ]}
      bordered
      title="Order Details"
    />
  ),
  'vertical': (
    <Descriptions
      items={[
        { label: 'Created', children: '2024-01-15 10:30:00' },
        { label: 'Updated', children: '2024-01-20 14:45:00' },
        { label: 'Author', children: 'Jane Smith' },
      ]}
      layout="vertical"
    />
  ),
  'columns': (
    <Descriptions
      items={[
        { label: 'Name', children: 'Alice Johnson' },
        { label: 'Age', children: '28' },
        { label: 'Gender', children: 'Female' },
        { label: 'Occupation', children: 'Software Engineer' },
        { label: 'Department', children: 'Engineering' },
        { label: 'Start Date', children: '2022-03-15' },
      ]}
      column={2}
      bordered
    />
  ),
  'with-span': (
    <Descriptions
      items={[
        { label: 'Name', children: 'Product X' },
        { label: 'SKU', children: 'PRD-12345' },
        { label: 'Category', children: 'Electronics' },
        { label: 'Description', children: 'A detailed product description that spans multiple columns for better readability.', span: 3 },
      ]}
      bordered
    />
  ),
};

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example');
  if (exampleId && demos[exampleId]) {
    const root = createRoot(container as HTMLElement);
    root.render(demos[exampleId]);
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
