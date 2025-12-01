import { useState } from 'react'
import { QRCode, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const qrcodeApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'The value to encode in the QR code',
    type: 'string',
  },
  {
    property: 'size',
    description: 'QR code canvas size in pixels',
    type: 'number',
    default: '160',
  },
  {
    property: 'errorLevel',
    description: 'Error correction level',
    type: "'L' | 'M' | 'Q' | 'H'",
    default: "'M'",
  },
  {
    property: 'icon',
    description: 'URL of icon/logo to display in center',
    type: 'string',
  },
  {
    property: 'iconSize',
    description: 'Size of the center icon in pixels',
    type: 'number',
    default: '40',
  },
  {
    property: 'type',
    description: 'Render type',
    type: "'canvas' | 'svg'",
    default: "'canvas'",
  },
  {
    property: 'color',
    description: 'Foreground color (QR code color)',
    type: 'string',
    default: "'#000000'",
  },
  {
    property: 'bgColor',
    description: 'Background color',
    type: 'string',
    default: "'#FFFFFF'",
  },
  {
    property: 'bordered',
    description: 'Show border around QR code',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'status',
    description: 'QR code status state',
    type: "'active' | 'loading' | 'expired'",
    default: "'active'",
  },
  {
    property: 'onRefresh',
    description: 'Callback when refresh button is clicked (expired status)',
    type: '() => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function QRCodePage() {
  const [text, setText] = useState('https://github.com/anthropics/claude-code')
  const [status, setStatus] = useState<'active' | 'loading' | 'expired'>('active')

  const handleRefresh = () => {
    setStatus('loading')
    setTimeout(() => setStatus('active'), 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">QR Code</h1>
        <p className="text-base-content/70">
          Generate QR codes with customizable appearance, icons, and status states.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic QR Code"
          description="Simple QR code with default settings."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
  <QRCode value="https://github.com/anthropics/claude-code" />
)

export default App`}
        >
          <QRCode value="https://github.com/anthropics/claude-code" />
        </ExampleSection>

        <ExampleSection
          title="Custom Size"
          description="Different QR code sizes."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 items-center flex-wrap">
    <QRCode value="https://example.com" size={80} />
    <QRCode value="https://example.com" size={120} />
    <QRCode value="https://example.com" size={160} />
    <QRCode value="https://example.com" size={200} />
  </div>
)

export default App`}
        >
          <div className="flex gap-4 items-center flex-wrap">
            <QRCode value="https://example.com" size={80} />
            <QRCode value="https://example.com" size={120} />
            <QRCode value="https://example.com" size={160} />
            <QRCode value="https://example.com" size={200} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Colors"
          description="Customize foreground and background colors."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <QRCode
      value="https://example.com"
      color="#1890ff"
      bgColor="#f0f0f0"
    />
    <QRCode
      value="https://example.com"
      color="#52c41a"
      bgColor="#f6ffed"
    />
    <QRCode
      value="https://example.com"
      color="#722ed1"
      bgColor="#f9f0ff"
    />
  </div>
)

export default App`}
        >
          <div className="flex gap-4 flex-wrap">
            <QRCode value="https://example.com" color="#1890ff" bgColor="#f0f0f0" />
            <QRCode value="https://example.com" color="#52c41a" bgColor="#f6ffed" />
            <QRCode value="https://example.com" color="#722ed1" bgColor="#f9f0ff" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Icon"
          description="QR code with centered logo/icon."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
  <QRCode
    value="https://github.com/anthropics/claude-code"
    icon="https://avatars.githubusercontent.com/u/142286421"
    iconSize={40}
  />
)

export default App`}
        >
          <QRCode
            value="https://github.com/anthropics/claude-code"
            icon="https://avatars.githubusercontent.com/u/142286421"
            iconSize={40}
          />
        </ExampleSection>

        <ExampleSection
          title="Error Correction Level"
          description="Different error correction levels affect QR code density."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
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
      <QRCode value="https://example.com/data" errorLevel="Q" />
      <div className="text-sm mt-2">Level Q (25%)</div>
    </div>
    <div className="text-center">
      <QRCode value="https://example.com/data" errorLevel="H" />
      <div className="text-sm mt-2">Level H (30%)</div>
    </div>
  </div>
)

export default App`}
        >
          <div className="flex gap-4 flex-wrap">
            <div className="text-center">
              <QRCode value="https://example.com/data" errorLevel="L" size={120} />
              <div className="text-sm mt-2">Level L (7%)</div>
            </div>
            <div className="text-center">
              <QRCode value="https://example.com/data" errorLevel="M" size={120} />
              <div className="text-sm mt-2">Level M (15%)</div>
            </div>
            <div className="text-center">
              <QRCode value="https://example.com/data" errorLevel="Q" size={120} />
              <div className="text-sm mt-2">Level Q (25%)</div>
            </div>
            <div className="text-center">
              <QRCode value="https://example.com/data" errorLevel="H" size={120} />
              <div className="text-sm mt-2">Level H (30%)</div>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Without Border"
          description="Remove the border for seamless integration."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="flex gap-4 flex-wrap">
    <QRCode value="https://example.com" bordered />
    <QRCode value="https://example.com" bordered={false} />
  </div>
)

export default App`}
        >
          <div className="flex gap-4 flex-wrap">
            <QRCode value="https://example.com" bordered />
            <QRCode value="https://example.com" bordered={false} />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Loading Status"
          description="Show loading state while generating or fetching QR code data."
          code={`import React from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => (
  <QRCode
    value="https://example.com"
    status="loading"
  />
)

export default App`}
        >
          <QRCode value="https://example.com" status="loading" />
        </ExampleSection>

        <ExampleSection
          title="Expired Status"
          description="Show expired state with optional refresh functionality."
          code={`import React, { useState } from 'react'
import { QRCode } from '@edadma/bloomui'

const App: React.FC = () => {
  const [status, setStatus] = useState<'active' | 'loading' | 'expired'>('expired')

  const handleRefresh = () => {
    setStatus('loading')
    setTimeout(() => setStatus('active'), 2000)
  }

  return (
    <QRCode
      value="https://example.com"
      status={status}
      onRefresh={handleRefresh}
    />
  )
}

export default App`}
        >
          <QRCode value="https://example.com" status={status} onRefresh={handleRefresh} />
        </ExampleSection>

        <ExampleSection
          title="Dynamic QR Code"
          description="Update QR code value dynamically."
          code={`import React, { useState } from 'react'
import { QRCode, Input, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const [text, setText] = useState('https://github.com/anthropics/claude-code')

  return (
    <div className="flex flex-col gap-4 items-center">
      <QRCode value={text} />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="w-full max-w-md"
      />
    </div>
  )
}

export default App`}
        >
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
        </ExampleSection>

        <ExampleSection
          title="Download QR Code"
          description="Example of downloading QR code as image."
          code={`import React, { useRef } from 'react'
import { QRCode, Button } from '@edadma/bloomui'

const App: React.FC = () => {
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.download = 'qrcode.png'
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div ref={qrRef}>
        <QRCode value="https://github.com/anthropics/claude-code" />
      </div>
      <Button onClick={handleDownload}>Download QR Code</Button>
    </div>
  )
}

export default App`}
        >
          <div className="flex flex-col gap-4 items-center">
            <div id="qr-download">
              <QRCode value="https://github.com/anthropics/claude-code" />
            </div>
            <Button
              onClick={() => {
                const canvas = document.querySelector('#qr-download canvas') as HTMLCanvasElement
                if (canvas) {
                  const url = canvas.toDataURL('image/png')
                  const a = document.createElement('a')
                  a.download = 'qrcode.png'
                  a.href = url
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                }
              }}
            >
              Download QR Code
            </Button>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="QRCode" data={qrcodeApi} />

        <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
          <h3 className="text-lg font-bold mb-2 text-info">Error Correction Levels</h3>
          <p className="text-sm text-base-content/70 mb-3">
            QR codes support four error correction levels that determine how much data can be restored if the code is
            damaged:
          </p>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
            <li>
              <strong>L (Low):</strong> ~7% error correction - use for clean environments
            </li>
            <li>
              <strong>M (Medium):</strong> ~15% error correction - default, good balance
            </li>
            <li>
              <strong>Q (Quartile):</strong> ~25% error correction - use when damage is likely
            </li>
            <li>
              <strong>H (High):</strong> ~30% error correction - use for maximum resilience or when adding icons
            </li>
          </ul>
          <p className="text-sm text-base-content/70 mt-3">
            Higher error correction levels result in denser QR codes with more modules.
          </p>
        </div>

        <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <h3 className="text-lg font-bold mb-2 text-warning">Usage Tips</h3>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
            <li>Use higher error correction levels (Q or H) when adding center icons</li>
            <li>Ensure sufficient contrast between foreground and background colors</li>
            <li>Test QR codes on actual devices to verify scannability</li>
            <li>Keep URLs and data short for simpler, more scannable codes</li>
            <li>Center icons should not exceed 30% of the QR code size</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
