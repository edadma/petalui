import { useState } from 'react';
import { Pagination } from 'asterui';
import { Demo } from './Demo';

export function BasicDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <Demo>
      <Pagination
        current={current}
        total={85}
        onChange={(page) => setCurrent(page)}
      />
    </Demo>
  );
}

export function SizeChangerDemo() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  return (
    <Demo>
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
    </Demo>
  );
}

export function ShowTotalDemo() {
  return (
    <Demo>
      <Pagination total={250} showTotal />
    </Demo>
  );
}

export function CustomTotalDemo() {
  return (
    <Demo>
      <Pagination
        total={250}
        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`}
      />
    </Demo>
  );
}

export function QuickJumperDemo() {
  return (
    <Demo>
      <Pagination total={500} showQuickJumper />
    </Demo>
  );
}

export function AllFeaturesDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <Demo>
      <Pagination
        current={current}
        total={500}
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        onChange={(page) => setCurrent(page)}
      />
    </Demo>
  );
}

export function SimpleDemo() {
  return (
    <Demo>
      <Pagination total={100} simple />
    </Demo>
  );
}

export function SizesDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}

export function DisabledDemo() {
  return (
    <Demo>
      <Pagination total={100} disabled />
    </Demo>
  );
}
