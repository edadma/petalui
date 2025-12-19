import React, { useState } from 'react';
import { Splitter, Button, Space, Menu } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Splitter } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
        <Splitter>
          <Splitter.Panel>
            <div className="p-4 bg-base-200 h-full">
              <h3 className="font-semibold">Left Panel</h3>
              <p className="text-sm text-base-content/70 mt-2">Drag the divider to resize.</p>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 h-full">
              <h3 className="font-semibold">Right Panel</h3>
              <p className="text-sm text-base-content/70 mt-2">Content on the right side.</p>
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function VerticalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
        <Splitter direction="vertical">
          <Splitter.Panel>
            <div className="p-4 bg-base-200 h-full">
              <h3 className="font-semibold">Top Panel</h3>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 h-full">
              <h3 className="font-semibold">Bottom Panel</h3>
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter, Button, Space } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledDemo() {
  // @example-include
  const [sizes, setSizes] = useState([30, 70]);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Space className="mb-4">
          <Button size="sm" onClick={() => setSizes([20, 80])}>
            20/80
          </Button>
          <Button size="sm" onClick={() => setSizes([50, 50])}>
            50/50
          </Button>
          <Button size="sm" onClick={() => setSizes([80, 20])}>
            80/20
          </Button>
        </Space>
        <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
          <Splitter sizes={sizes} onSizesChange={setSizes}>
            <Splitter.Panel>
              <div className="p-4 bg-primary/10 h-full">{sizes[0].toFixed(0)}%</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <div className="p-4 bg-secondary/10 h-full">{sizes[1].toFixed(0)}%</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function MultiplePanelsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
        <Splitter defaultSizes={[25, 50, 25]}>
          <Splitter.Panel>
            <div className="p-4 bg-primary/10 h-full">Panel 1</div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 bg-secondary/10 h-full">Panel 2</div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 bg-accent/10 h-full">Panel 3</div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function MinMaxDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
        <Splitter>
          <Splitter.Panel minSize={100} maxSize={300}>
            <div className="p-4 bg-warning/10 h-full">
              <p className="text-sm">Min: 100px, Max: 300px</p>
            </div>
          </Splitter.Panel>
          <Splitter.Panel minSize={150}>
            <div className="p-4 bg-info/10 h-full">
              <p className="text-sm">Min: 150px</p>
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function NestedDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-72 border border-base-300 rounded-lg overflow-hidden">
        <Splitter defaultSizes={[30, 70]}>
          <Splitter.Panel>
            <div className="p-4 bg-base-200 h-full">
              <h3 className="font-semibold">Sidebar</h3>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <Splitter direction="vertical" defaultSizes={[60, 40]}>
              <Splitter.Panel>
                <div className="p-4 h-full">
                  <h3 className="font-semibold">Main Content</h3>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="p-4 bg-base-200 h-full">
                  <h3 className="font-semibold">Terminal</h3>
                </div>
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function GutterDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
        <Splitter gutterSize={12}>
          <Splitter.Panel>
            <div className="p-4 bg-success/10 h-full">Wide gutter (12px)</div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 bg-error/10 h-full">Easier to grab</div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter, Menu } from 'asterui'
export function IdeDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-80 border border-base-300 rounded-lg overflow-hidden">
        <Splitter defaultSizes={[20, 80]}>
          <Splitter.Panel minSize={150}>
            <div className="h-full bg-base-200">
              <div className="p-2 border-b border-base-300 font-semibold text-sm">Explorer</div>
              <Menu>
                <Menu.Item>src/</Menu.Item>
                <Menu.Item>components/</Menu.Item>
                <Menu.Item>App.tsx</Menu.Item>
                <Menu.Item>index.ts</Menu.Item>
              </Menu>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <Splitter direction="vertical" defaultSizes={[70, 30]}>
              <Splitter.Panel>
                <div className="h-full p-4">
                  <div className="font-mono text-sm">
                    <span className="text-purple-500">import</span> React{' '}
                    <span className="text-purple-500">from</span>{' '}
                    <span className="text-green-500">'react'</span>
                  </div>
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div className="h-full bg-base-300 p-2">
                  <div className="text-xs font-mono text-base-content/70">$ npm run build</div>
                </div>
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function CollapsibleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-64 border border-base-300 rounded-lg overflow-hidden">
        <Splitter defaultSizes={[25, 75]}>
          <Splitter.Panel collapsible minSize={100}>
            <div className="p-4 bg-base-200 h-full">
              <h3 className="font-semibold">Sidebar</h3>
              <p className="text-sm text-base-content/70 mt-2">
                Click the arrow to collapse.
              </p>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 h-full">
              <h3 className="font-semibold">Main Content</h3>
              <p className="text-sm text-base-content/70 mt-2">
                This panel expands when the sidebar collapses.
              </p>
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Splitter } from 'asterui'
export function NonResizableDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="h-48 border border-base-300 rounded-lg overflow-hidden">
        <Splitter>
          <Splitter.Panel resizable={false} defaultSize={30}>
            <div className="p-4 bg-base-200 h-full">
              <p className="text-sm">Fixed width (30%)</p>
            </div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div className="p-4 h-full">
              <p className="text-sm">Cannot resize - divider is disabled.</p>
            </div>
          </Splitter.Panel>
        </Splitter>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}
