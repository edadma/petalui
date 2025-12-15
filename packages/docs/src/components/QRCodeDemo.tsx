import { useState } from 'react';
import { QRCode } from 'asterui/qrcode';
import { Demo } from './Demo';

export function BasicDemo() {
  return (
    <Demo>
      <QRCode value="https://github.com" />
    </Demo>
  );
}

export function SizesDemo() {
  return (
    <Demo>
      <div className="flex gap-4 items-center flex-wrap">
        <QRCode value="https://example.com" size={80} />
        <QRCode value="https://example.com" size={120} />
        <QRCode value="https://example.com" size={160} />
        <QRCode value="https://example.com" size={200} />
      </div>
    </Demo>
  );
}

export function ColorsDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <QRCode value="https://example.com" color="#1890ff" bgColor="#f0f0f0" />
        <QRCode value="https://example.com" color="#52c41a" bgColor="#f6ffed" />
        <QRCode value="https://example.com" color="#722ed1" bgColor="#f9f0ff" />
      </div>
    </Demo>
  );
}

export function IconDemo() {
  return (
    <Demo>
      <QRCode
        value="https://github.com"
        icon="https://avatars.githubusercontent.com/u/142286421"
        iconSize={40}
      />
    </Demo>
  );
}

export function ErrorLevelDemo() {
  return (
    <Demo>
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
    </Demo>
  );
}

export function BorderDemo() {
  return (
    <Demo>
      <div className="flex gap-4 flex-wrap">
        <QRCode value="https://example.com" bordered />
        <QRCode value="https://example.com" bordered={false} />
      </div>
    </Demo>
  );
}

export function LoadingDemo() {
  return (
    <Demo>
      <QRCode value="https://example.com" status="loading" />
    </Demo>
  );
}

export function ExpiredDemo() {
  const [status, setStatus] = useState<'active' | 'loading' | 'expired'>('expired');

  const handleRefresh = () => {
    setStatus('loading');
    setTimeout(() => setStatus('active'), 2000);
  };

  return (
    <Demo>
      <QRCode
        value="https://example.com"
        status={status}
        onRefresh={handleRefresh}
      />
    </Demo>
  );
}

export function DynamicDemo() {
  const [text, setText] = useState('https://github.com');

  return (
    <Demo>
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
    </Demo>
  );
}
