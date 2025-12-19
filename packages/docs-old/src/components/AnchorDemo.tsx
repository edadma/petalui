import { Anchor, Flex } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Anchor, Flex } from 'asterui'
export function BasicDemo() {
  // @example-include
  const getContainer = () => document.getElementById('scroll-container-basic') as HTMLElement
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Flex gap="md">
        <Anchor
          items={[
            { href: 'section-1', title: 'Section 1' },
            { href: 'section-2', title: 'Section 2' },
            { href: 'section-3', title: 'Section 3' },
          ]}
          getContainer={getContainer}
        />
        <div id="scroll-container-basic" className="flex-1 h-48 overflow-y-auto border rounded p-2">
          <section id="section-1" className="h-32 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Section 1</h3>
            <p className="text-sm">Scroll to see active link change</p>
          </section>
          <section id="section-2" className="h-32 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Section 2</h3>
            <p className="text-sm">Content for section 2</p>
          </section>
          <section id="section-3" className="h-32 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Section 3</h3>
            <p className="text-sm">Content for section 3</p>
          </section>
        </div>
      </Flex>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Anchor } from 'asterui'
export function HorizontalDemo() {
  // @example-include
  const getContainer = () => document.getElementById('scroll-container-horizontal') as HTMLElement
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Anchor
          direction="horizontal"
          items={[
            { href: 'intro', title: 'Introduction' },
            { href: 'features', title: 'Features' },
            { href: 'pricing', title: 'Pricing' },
            { href: 'faq', title: 'FAQ' },
          ]}
          getContainer={getContainer}
        />
        <div id="scroll-container-horizontal" className="h-32 overflow-y-auto border rounded p-2 mt-2">
          <section id="intro" className="h-24 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Introduction</h3>
            <p className="text-sm">Welcome to our product</p>
          </section>
          <section id="features" className="h-24 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Features</h3>
            <p className="text-sm">Amazing features</p>
          </section>
          <section id="pricing" className="h-24 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Pricing</h3>
            <p className="text-sm">Affordable plans</p>
          </section>
          <section id="faq" className="h-24 p-3 bg-base-200 rounded">
            <h3 className="font-bold">FAQ</h3>
            <p className="text-sm">Common questions</p>
          </section>
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Anchor, Flex } from 'asterui'
export function NestedDemo() {
  // @example-include
  const getContainer = () => document.getElementById('scroll-container-nested') as HTMLElement
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Flex gap="md">
        <Anchor
          items={[
            {
              href: 'getting-started',
              title: 'Getting Started',
              children: [
                { href: 'installation', title: 'Installation' },
                { href: 'configuration', title: 'Configuration' },
              ],
            },
            {
              href: 'components',
              title: 'Components',
              children: [
                { href: 'buttons', title: 'Buttons' },
                { href: 'forms', title: 'Forms' },
              ],
            },
          ]}
          getContainer={getContainer}
        />
        <div id="scroll-container-nested" className="flex-1 h-48 overflow-y-auto border rounded p-2">
          <section id="getting-started" className="h-20 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Getting Started</h3>
          </section>
          <section id="installation" className="h-20 mb-2 p-3 bg-base-200 rounded ml-4">
            <h4 className="font-semibold text-sm">Installation</h4>
          </section>
          <section id="configuration" className="h-20 mb-2 p-3 bg-base-200 rounded ml-4">
            <h4 className="font-semibold text-sm">Configuration</h4>
          </section>
          <section id="components" className="h-20 mb-2 p-3 bg-base-200 rounded">
            <h3 className="font-bold">Components</h3>
          </section>
          <section id="buttons" className="h-20 mb-2 p-3 bg-base-200 rounded ml-4">
            <h4 className="font-semibold text-sm">Buttons</h4>
          </section>
          <section id="forms" className="h-20 p-3 bg-base-200 rounded ml-4">
            <h4 className="font-semibold text-sm">Forms</h4>
          </section>
        </div>
      </Flex>
      {/* @example-return-end */}
    </Demo>
  )
}
