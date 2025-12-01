import { Browser, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const browserApi: ApiProperty[] = [
  { property: 'children', description: 'Content inside the browser viewport', type: 'React.ReactNode' },
  { property: 'url', description: 'URL shown in address bar', type: 'string', default: "'https://example.com'" },
  { property: 'className', description: 'Classes for browser container', type: 'string' },
  { property: 'contentClassName', description: 'Classes for content area', type: 'string' },
]

export function BrowserPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Browser</h1>
        <p className="text-base-content/70">
          Display content in a browser window mockup with address bar.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Browser"
          description="Browser window with URL bar."
          code={`<Browser url="https://daisyui.com" className="w-full">
  <div className="grid place-content-center h-40 bg-base-200">
    Hello!
  </div>
</Browser>`}
        >
          <Browser url="https://daisyui.com" className="w-full">
            <div className="grid place-content-center h-40 bg-base-200">
              Hello!
            </div>
          </Browser>
        </ExampleSection>

        <ExampleSection
          title="Website Preview"
          description="Preview a website layout."
          code={`<Browser url="https://mysite.com" className="w-full">
  <div className="bg-base-100">
    <div className="bg-primary text-primary-content p-4">
      <span className="font-bold">MySite</span>
    </div>
    <div className="p-4 h-32">
      <h2 className="text-xl font-bold">Welcome</h2>
      <p className="text-base-content/70">Content here...</p>
    </div>
  </div>
</Browser>`}
        >
          <Browser url="https://mysite.com" className="w-full">
            <div className="bg-base-100">
              <div className="bg-primary text-primary-content p-4">
                <span className="font-bold">MySite</span>
              </div>
              <div className="p-4 h-32">
                <h2 className="text-xl font-bold">Welcome</h2>
                <p className="text-base-content/70">Your content goes here...</p>
              </div>
            </div>
          </Browser>
        </ExampleSection>

        <ExampleSection
          title="With Background"
          description="Custom background color."
          code={`<Browser url="https://app.example.com" className="w-full">
  <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-48 grid place-content-center">
    <span className="text-white text-2xl font-bold">Gradient</span>
  </div>
</Browser>`}
        >
          <Browser url="https://app.example.com" className="w-full">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-48 grid place-content-center">
              <span className="text-white text-2xl font-bold">Gradient</span>
            </div>
          </Browser>
        </ExampleSection>

        <ExampleSection
          title="Dashboard Preview"
          description="Mock up a dashboard UI."
          code={`<Browser url="https://dashboard.example.com" className="w-full">
  <div className="bg-base-100 p-4 h-56">
    <div className="flex gap-4 mb-4">
      <div className="bg-primary/10 rounded-lg p-3 flex-1">
        <div className="text-xs text-base-content/60">Users</div>
        <div className="text-xl font-bold">1,234</div>
      </div>
      <div className="bg-secondary/10 rounded-lg p-3 flex-1">
        <div className="text-xs text-base-content/60">Revenue</div>
        <div className="text-xl font-bold">$5,678</div>
      </div>
    </div>
    <div className="bg-base-200 rounded-lg h-24"></div>
  </div>
</Browser>`}
        >
          <Browser url="https://dashboard.example.com" className="w-full">
            <div className="bg-base-100 p-4 h-56">
              <div className="flex gap-4 mb-4">
                <div className="bg-primary/10 rounded-lg p-3 flex-1">
                  <div className="text-xs text-base-content/60">Users</div>
                  <div className="text-xl font-bold">1,234</div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3 flex-1">
                  <div className="text-xs text-base-content/60">Revenue</div>
                  <div className="text-xl font-bold">$5,678</div>
                </div>
              </div>
              <div className="bg-base-200 rounded-lg h-24"></div>
            </div>
          </Browser>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Browser" data={browserApi} />
      </div>
    </div>
  )
}
