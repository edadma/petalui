import { Collapse, Button, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Collapse } from 'asterui'
export function BasicDemo() {
  // @example-include
  const items = [
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
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Collapse items={items} defaultActiveKey={['1']} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Collapse } from 'asterui'
export function AccordionDemo() {
  // @example-include
  const items = [
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
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Collapse items={items} accordion defaultActiveKey="1" />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Collapse } from 'asterui'
export function BorderlessDemo() {
  // @example-include
  const items = [
    {
      key: '1',
      label: 'Panel 1',
      children: 'Content without borders for a cleaner look.',
    },
    {
      key: '2',
      label: 'Panel 2',
      children: 'Great for FAQ sections or sidebars.',
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Collapse items={items} bordered={false} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Collapse, Button, Space } from 'asterui'
export function NestedDemo() {
  // @example-include
  const items = [
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
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Collapse items={items} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Collapse } from 'asterui'
export function GhostDemo() {
  // @example-include
  const items = [
    {
      key: '1',
      label: 'Transparent Background',
      children: 'Ghost mode removes the background color.',
    },
    {
      key: '2',
      label: 'Clean Look',
      children: 'Great for minimalist designs.',
    },
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Collapse items={items} ghost bordered={false} />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Collapse } from 'asterui'
export function PlusIconDemo() {
  // @example-include
  const items = [
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
  ]
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Collapse items={items} icon="plus" />
      {/* @example-return-end */}
    </Demo>
  )
}
