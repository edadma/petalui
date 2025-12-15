import { Loading, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Loading />
    </Demo>
  )
}

export function TypesDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="md" align="center" wrap>
        <Loading type="spinner" />
        <Loading type="dots" />
        <Loading type="ring" />
        <Loading type="ball" />
        <Loading type="bars" />
        <Loading type="infinity" />
      </Space>
    </Demo>
  )
}

export function SizesDemo() {
  return (
    <Demo>
      <Space direction="horizontal" size="md" align="center">
        <Loading size="xs" />
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
      </Space>
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}
