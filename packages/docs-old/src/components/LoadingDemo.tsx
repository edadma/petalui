import { Loading, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Loading } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Loading />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Loading, Space } from 'asterui'
export function TypesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md" align="center" wrap>
        <Loading type="spinner" />
        <Loading type="dots" />
        <Loading type="ring" />
        <Loading type="ball" />
        <Loading type="bars" />
        <Loading type="infinity" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Loading, Space } from 'asterui'
export function SizesDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md" align="center">
        <Loading size="xs" />
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Loading, Space } from 'asterui'
export function ColorsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="horizontal" size="md" align="center" wrap>
        <Loading color="primary" />
        <Loading color="secondary" />
        <Loading color="accent" />
        <Loading color="neutral" />
        <Loading color="info" />
        <Loading color="success" />
        <Loading color="warning" />
        <Loading color="error" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}
