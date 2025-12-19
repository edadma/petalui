import { FileInput, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { FileInput } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <FileInput />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FileInput, Space } from 'asterui'
export function AcceptTypesDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FileInput } from 'asterui'
export function MultipleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <FileInput multiple />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FileInput, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <FileInput size="xs" />
        <FileInput size="sm" />
        <FileInput size="md" />
        <FileInput size="lg" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FileInput, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <FileInput color="primary" />
        <FileInput color="secondary" />
        <FileInput color="accent" />
        <FileInput color="success" />
        <FileInput color="warning" />
        <FileInput color="error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { FileInput, Space } from 'asterui'
export function StylesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md">
        <FileInput bordered color="primary" />
        <FileInput ghost color="secondary" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
