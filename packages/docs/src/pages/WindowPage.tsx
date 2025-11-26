import { Window, Masonry } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const windowApi: ApiProperty[] = [
  { property: 'children', description: 'Content inside the window', type: 'React.ReactNode' },
  { property: 'className', description: 'Classes for window container', type: 'string' },
  { property: 'contentClassName', description: 'Classes for content area', type: 'string' },
]

export function WindowPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Window</h1>
        <p className="text-base-content/70">
          Display content in an OS-style window frame mockup.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Window"
          description="OS-style window frame."
          code={`<Window className="w-full">
  <div className="grid place-content-center h-40 bg-base-200">
    Hello!
  </div>
</Window>`}
        >
          <Window className="w-full">
            <div className="grid place-content-center h-40 bg-base-200">
              Hello!
            </div>
          </Window>
        </ExampleSection>

        <ExampleSection
          title="Application Window"
          description="Mock up a desktop application."
          code={`<Window className="w-full bg-base-100">
  <div className="p-4 h-48">
    <div className="flex gap-2 mb-4">
      <button className="btn btn-sm">File</button>
      <button className="btn btn-sm">Edit</button>
      <button className="btn btn-sm">View</button>
    </div>
    <div className="bg-base-200 rounded p-3 h-24">
      Document content...
    </div>
  </div>
</Window>`}
        >
          <Window className="w-full bg-base-100">
            <div className="p-4 h-48">
              <div className="flex gap-2 mb-4">
                <button className="btn btn-sm">File</button>
                <button className="btn btn-sm">Edit</button>
                <button className="btn btn-sm">View</button>
              </div>
              <div className="bg-base-200 rounded p-3 h-24">
                Document content...
              </div>
            </div>
          </Window>
        </ExampleSection>

        <ExampleSection
          title="With Background Color"
          description="Custom background styling."
          code={`<Window className="w-full bg-base-300">
  <div className="p-6 h-40 grid place-content-center">
    <span className="text-xl font-semibold">Custom Background</span>
  </div>
</Window>`}
        >
          <Window className="w-full bg-base-300">
            <div className="p-6 h-40 grid place-content-center">
              <span className="text-xl font-semibold">Custom Background</span>
            </div>
          </Window>
        </ExampleSection>

        <ExampleSection
          title="Settings Panel"
          description="Mock up a settings window."
          code={`<Window className="w-full bg-base-100">
  <div className="p-4 h-56">
    <h3 className="font-bold mb-4">Settings</h3>
    <div className="space-y-3">
      <label className="flex items-center gap-3">
        <input type="checkbox" className="toggle toggle-sm" defaultChecked />
        <span>Enable notifications</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="toggle toggle-sm" />
        <span>Dark mode</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="toggle toggle-sm" defaultChecked />
        <span>Auto-save</span>
      </label>
    </div>
  </div>
</Window>`}
        >
          <Window className="w-full bg-base-100">
            <div className="p-4 h-56">
              <h3 className="font-bold mb-4">Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="toggle toggle-sm" defaultChecked />
                  <span>Enable notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="toggle toggle-sm" />
                  <span>Dark mode</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="toggle toggle-sm" defaultChecked />
                  <span>Auto-save</span>
                </label>
              </div>
            </div>
          </Window>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Window" data={windowApi} />
      </div>
    </div>
  )
}
