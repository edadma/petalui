import { Container, Space } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Container>
        <h1>Page Content</h1>
        <p>Content is centered with max-width constraint.</p>
      </Container>
    </Demo>
  )
}

export function PageLayoutDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}
