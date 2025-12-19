import { Container, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Container } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Container>
        <h1>Page Content</h1>
        <p>Content is centered with max-width constraint.</p>
      </Container>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Container, Space } from 'asterui'
export function PageLayoutDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Container size="lg">
        <Space direction="vertical" size="lg">
          <header>
            <h1 className="text-3xl font-bold">Page Title</h1>
            <p className="text-base-content/70">Description</p>
          </header>
          <main className="bg-base-200 p-6 rounded-lg">
            <p>Main content area</p>
          </main>
        </Space>
      </Container>
      {/* @example-return-end */}
    </Demo>
  )
}
