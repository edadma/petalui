import { useState, useEffect, memo } from 'react';
import { Demo } from './Demo';

// Singleton: load QRCode component once, share across all instances
let cachedQRCode: React.ComponentType<any> | null = null
let loadPromise: Promise<void> | null = null

const QRCode = memo((props: any) => {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (cachedQRCode) return

    if (!loadPromise) {
      loadPromise = import('@aster-ui/prefixed/qrcode').then(m => {
        cachedQRCode = m.QRCode
      })
    }

    loadPromise.then(() => forceUpdate(n => n + 1))
  }, [])

  if (!cachedQRCode) {
    return <div style={{ width: props.size || 160, height: props.size || 160 }} className="animate-pulse bg-base-300/50 rounded" />
  }

  const LoadedQRCode = cachedQRCode
  return <LoadedQRCode {...props} />
})

// @example-imports: { QRCode } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <QRCode value="https://github.com" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 items-center flex-wrap">
        <QRCode value="https://example.com" size={80} />
        <QRCode value="https://example.com" size={120} />
        <QRCode value="https://example.com" size={160} />
        <QRCode value="https://example.com" size={200} />
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 flex-wrap">
        <QRCode value="https://example.com" color="#1890ff" bgColor="#f0f0f0" />
        <QRCode value="https://example.com" color="#52c41a" bgColor="#f6ffed" />
        <QRCode value="https://example.com" color="#722ed1" bgColor="#f9f0ff" />
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
export function IconDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <QRCode
        value="https://github.com"
        icon="https://avatars.githubusercontent.com/u/142286421"
        iconSize={40}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
export function ErrorLevelDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 flex-wrap">
        <div className="text-center">
          <QRCode value="https://example.com/data" errorLevel="L" />
          <div className="text-sm mt-2">Level L (7%)</div>
        </div>
        <div className="text-center">
          <QRCode value="https://example.com/data" errorLevel="M" />
          <div className="text-sm mt-2">Level M (15%)</div>
        </div>
        <div className="text-center">
          <QRCode value="https://example.com/data" errorLevel="H" />
          <div className="text-sm mt-2">Level H (30%)</div>
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
export function BorderDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4 flex-wrap">
        <QRCode value="https://example.com" bordered />
        <QRCode value="https://example.com" bordered={false} />
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
export function LoadingDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <QRCode value="https://example.com" status="loading" />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
// @example-imports: { useState } from 'react'
export function ExpiredDemo() {
  // @example-include
  const [status, setStatus] = useState<'active' | 'loading' | 'expired'>('expired');

  const handleRefresh = () => {
    setStatus('loading');
    setTimeout(() => setStatus('active'), 2000);
  };
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <QRCode
        value="https://example.com"
        status={status}
        onRefresh={handleRefresh}
      />
      {/* @example-return-end */}
    </Demo>
  );
}

// @example-imports: { QRCode } from 'asterui'
// @example-imports: { useState } from 'react'
export function DynamicDemo() {
  // @example-include
  const [text, setText] = useState('https://github.com');
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div className="flex flex-col gap-4 items-center">
        <QRCode value={text} />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="input input-bordered w-full max-w-md"
        />
      </div>
      {/* @example-return-end */}
    </Demo>
  );
}
