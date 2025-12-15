import { FileInput, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <FileInput />
    </Demo>
  )
}

export function AcceptTypesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="md">
        <div>
          <label className="block text-sm font-medium mb-2">Images only</label>
          <FileInput accept="image/*" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">PDF files only</label>
          <FileInput accept=".pdf" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Images and PDFs</label>
          <FileInput accept="image/*,.pdf" />
        </div>
      </Space>
    </Demo>
  )
}

export function MultipleDemo() {
  return (
    <Demo>
      <FileInput multiple />
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="md">
        <FileInput size="xs" />
        <FileInput size="sm" />
        <FileInput size="md" />
        <FileInput size="lg" />
      </Space>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="md">
        <FileInput color="primary" />
        <FileInput color="secondary" />
        <FileInput color="accent" />
        <FileInput color="success" />
        <FileInput color="warning" />
        <FileInput color="error" />
      </Space>
    </Demo>
  )
}

export function StylesDemo() {
  return (
    <Demo>
      <Space direction="vertical" size="md">
        <FileInput bordered color="primary" />
        <FileInput ghost color="secondary" />
      </Space>
    </Demo>
  )
}
