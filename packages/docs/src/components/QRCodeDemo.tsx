import { useState } from 'react'
import { QRCode } from '@aster-ui/prefixed/qrcode'
import { Demo } from './Demo'

// @example-imports: { QRCode } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <QRCode value="https://asterui.com" />
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
        <QRCode value="https://asterui.com" size={80} />
        <QRCode value="https://asterui.com" size={120} />
        <QRCode value="https://asterui.com" size={160} />
        <QRCode value="https://asterui.com" size={200} />
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
        <QRCode value="https://asterui.com" color="#3b82f6" />
        <QRCode value="https://asterui.com" color="#22c55e" />
        <QRCode value="https://asterui.com" color="#a855f7" />
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
        value="https://asterui.com"
        icon="/logo.png"
        iconSize={34}
        errorLevel="H"
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
          <QRCode value="https://asterui.com/data" errorLevel="L" />
          <div className="text-sm mt-2">Level L (7%)</div>
        </div>
        <div className="text-center">
          <QRCode value="https://asterui.com/data" errorLevel="M" />
          <div className="text-sm mt-2">Level M (15%)</div>
        </div>
        <div className="text-center">
          <QRCode value="https://asterui.com/data" errorLevel="H" />
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
        <QRCode value="https://asterui.com" bordered />
        <QRCode value="https://asterui.com" bordered={false} />
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
      <QRCode value="https://asterui.com" status="loading" />
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
        value="https://asterui.com"
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
  const [text, setText] = useState('https://asterui.com');
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
