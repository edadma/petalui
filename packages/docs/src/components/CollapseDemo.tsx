import React from 'react'
import { Collapse, Button, Space } from 'asterui'

export function BasicCollapseDemo() {
  return (
    <Collapse
      items={[
        {
          key: '1',
          label: 'What is AsterUI?',
          children: 'AsterUI is a React component library built on DaisyUI and Tailwind CSS.',
        },
        {
          key: '2',
          label: 'How do I install it?',
          children: 'Run npm install asterui to get started.',
        },
        {
          key: '3',
          label: 'Is it free?',
          children: 'Yes, AsterUI is open source and free to use.',
        },
      ]}
      defaultActiveKey={['1']}
    />
  )
}

export function AccordionDemo() {
  return (
    <Collapse
      items={[
        {
          key: '1',
          label: 'Section 1',
          children: 'Content for section 1. Click another section to close this one.',
        },
        {
          key: '2',
          label: 'Section 2',
          children: 'Content for section 2. Only one section can be open.',
        },
        {
          key: '3',
          label: 'Section 3',
          children: 'Content for section 3. This is accordion behavior.',
        },
      ]}
      accordion
      defaultActiveKey="1"
    />
  )
}

export function PlusIconDemo() {
  return (
    <Collapse
      items={[
        {
          key: '1',
          label: 'Plus/Minus Icon',
          children: 'This panel uses plus/minus icons instead of arrows.',
        },
        {
          key: '2',
          label: 'Another Panel',
          children: 'Click the plus icon to expand.',
        },
      ]}
      icon="plus"
    />
  )
}

export function NestedContentDemo() {
  return (
    <Collapse
      items={[
        {
          key: '1',
          label: 'Getting Started',
          children: (
            <Space direction="vertical" size="sm">
              <p>Follow these steps to get started:</p>
              <ol className="list-decimal list-inside">
                <li>Install the package</li>
                <li>Import components</li>
                <li>Start building</li>
              </ol>
              <Button color="primary" size="sm">Read Docs</Button>
            </Space>
          ),
        },
        {
          key: '2',
          label: 'Advanced Usage',
          children: 'Learn about advanced patterns and customization options.',
        },
      ]}
    />
  )
}
