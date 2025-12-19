import { useState } from 'react';
import { Pagination } from '@aster-ui/prefixed';
import { Demo } from './Demo';

// @example-imports: { Pagination } from 'asterui'
// @example-imports: { useState } from 'react'
export function BasicDemo() {
  // @example-include
  const [current, setCurrent] = useState(1);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Pagination
        current={current}
        total={85}
        onChange={(page) => setCurrent(page)}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
// @example-imports: { useState } from 'react'
export function SizeChangerDemo() {
  // @example-include
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Pagination
        current={current}
        total={500}
        pageSize={pageSize}
        showSizeChanger
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
export function ShowTotalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Pagination total={250} showTotal />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
export function CustomTotalDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Pagination
        total={250}
        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
export function QuickJumperDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Pagination total={500} showQuickJumper />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
// @example-imports: { useState } from 'react'
export function AllFeaturesDemo() {
  // @example-include
  const [current, setCurrent] = useState(1);
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Pagination
        current={current}
        total={500}
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        onChange={(page) => setCurrent(page)}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
export function SimpleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Pagination total={100} simple />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-4">
        <div>
          <div className="text-sm text-base-content/60 mb-2">Extra Small</div>
          <Pagination total={100} size="xs" />
        </div>
        <div>
          <div className="text-sm text-base-content/60 mb-2">Small</div>
          <Pagination total={100} size="sm" />
        </div>
        <div>
          <div className="text-sm text-base-content/60 mb-2">Medium (default)</div>
          <Pagination total={100} size="md" />
        </div>
        <div>
          <div className="text-sm text-base-content/60 mb-2">Large</div>
          <Pagination total={100} size="lg" />
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { Pagination } from 'asterui'
export function DisabledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Pagination total={100} disabled />
      {/* @example-return-end */}
    </Demo>
  );
}
