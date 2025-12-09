import { createRoot } from 'react-dom/client'
import React, { useState } from 'react'
import { CopyButton, Space, Input } from 'asterui'
import { CheckIconSvg } from './icons'

const BasicDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm">
    <CopyButton text="Hello, World!" />
    <CopyButton text="Copy this text" showTooltip />
  </Space>
)

const WithTextDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm">
    <CopyButton text="npm install asterui">npm install asterui</CopyButton>
    <CopyButton text="pnpm add asterui" copiedChildren="Copied!">pnpm add asterui</CopyButton>
  </Space>
)

const ColorsDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm">
    <CopyButton text="primary" color="primary" showTooltip />
    <CopyButton text="secondary" color="secondary" showTooltip />
    <CopyButton text="accent" color="accent" showTooltip />
    <CopyButton text="success" color="success" showTooltip />
    <CopyButton text="warning" color="warning" showTooltip />
    <CopyButton text="error" color="error" showTooltip />
  </Space>
)

const VariantsDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm">
    <CopyButton text="solid" color="primary" showTooltip />
    <CopyButton text="outline" color="primary" variant="outline" showTooltip />
    <CopyButton text="ghost" variant="ghost" showTooltip />
    <CopyButton text="soft" color="primary" variant="soft" showTooltip />
  </Space>
)

const SizesDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm" align="center">
    <CopyButton text="xs" size="xs" showTooltip />
    <CopyButton text="sm" size="sm" showTooltip />
    <CopyButton text="md" size="md" showTooltip />
    <CopyButton text="lg" size="lg" showTooltip />
    <CopyButton text="xl" size="xl" showTooltip />
  </Space>
)

const ShapesDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm">
    <CopyButton text="square" shape="square" showTooltip />
    <CopyButton text="circle" shape="circle" showTooltip />
  </Space>
)

const CodeBlockDemo: React.FC = () => {
  const codeText = `import { CopyButton } from 'asterui'

export const App = () => (
  <CopyButton text="Hello!" showTooltip />
)`

  return (
    <div style={{ position: 'relative' }} className="bg-base-300 rounded-lg p-4 pr-12">
      <pre className="font-mono text-sm whitespace-pre">{codeText}</pre>
      <div style={{ position: 'absolute', top: 8, right: 8 }}>
        <CopyButton text={codeText} size="sm" variant="ghost" showTooltip />
      </div>
    </div>
  )
}


const InputCopyDemo: React.FC = () => {
  const [value, setValue] = useState('https://asterui.com')

  return (
    <div className="flex gap-2 max-w-md">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1"
      />
      <CopyButton text={value} color="primary" showTooltip />
    </div>
  )
}

const CallbackDemo: React.FC = () => {
  const [message, setMessage] = useState('')

  return (
    <Space direction="vertical" size="sm">
      <CopyButton
        text="Callback example"
        color="primary"
        onCopy={() => setMessage('Copied successfully!')}
        onError={() => setMessage('Copy failed!')}
      >
        Copy with callback
      </CopyButton>
      {message && <span className="text-sm text-base-content/70">{message}</span>}
    </Space>
  )
}

const CustomTimeoutDemo: React.FC = () => (
  <Space direction="horizontal" wrap size="sm">
    <CopyButton text="1 second" timeout={1000} showTooltip tooltipText="1s timeout">
      1s timeout
    </CopyButton>
    <CopyButton text="5 seconds" timeout={5000} showTooltip tooltipText="5s timeout">
      5s timeout
    </CopyButton>
  </Space>
)

const statefulDemos: Record<string, React.FC> = {
  basic: BasicDemo,
  'with-text': WithTextDemo,
  colors: ColorsDemo,
  variants: VariantsDemo,
  sizes: SizesDemo,
  shapes: ShapesDemo,
  'code-block': CodeBlockDemo,
  'input-copy': InputCopyDemo,
  callback: CallbackDemo,
  'custom-timeout': CustomTimeoutDemo,
}

document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && statefulDemos[exampleId]) {
    const root = createRoot(container as HTMLElement)
    const Component = statefulDemos[exampleId]
    root.render(<Component />)
  }
})

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML = CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
