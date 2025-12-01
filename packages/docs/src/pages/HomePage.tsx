import { Alert, Button, Card, Masonry } from '@edadma/bloomui'

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">BloomUI</h1>
        <p className="text-xl text-base-content/70 mb-8">
          A modern React UI component library built with DaisyUI and Tailwind CSS
        </p>
        <div className="flex justify-center">
          <Button
            outline
            onClick={() => window.open('https://github.com/edadma/bloomui', '_blank')}
          >
            View on GitHub
          </Button>
        </div>
      </div>

      <Alert type="info">
        <div>
          <div className="font-semibold">Documentation Site</div>
          <div className="text-sm">
            This is the official component documentation for BloomUI. Browse components in the sidebar
            to see live examples, API documentation, and code samples.
          </div>
        </div>
      </Alert>

      <Masonry columns={{ xs: 1, md: 2 }} gap={4}>
        <Card bordered title="Installation">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Install Dependencies</h3>
              <p className="text-sm mb-2">
                Install Tailwind CSS, DaisyUI, and PetalUI:
              </p>
              <div className="relative group mb-2">
                <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>npm install tailwindcss @tailwindcss/vite daisyui bloomui</code>
                </pre>
                <button
                  className="absolute top-2 right-2 btn btn-xs btn-ghost opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => navigator.clipboard.writeText('npm install tailwindcss @tailwindcss/vite daisyui bloomui')}
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Configure Vite</h3>
              <p className="text-sm mb-2">
                Add the Tailwind plugin to your <code className="bg-base-300 px-1 rounded">vite.config.ts</code>:
              </p>
              <div className="relative group mb-2">
                <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}`}</code>
                </pre>
                <button
                  className="absolute top-2 right-2 btn btn-xs btn-ghost opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => navigator.clipboard.writeText(`import tailwindcss from '@tailwindcss/vite'\n\nexport default {\n  plugins: [tailwindcss()],\n}`)}
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Configure CSS</h3>
              <p className="text-sm mb-2">
                Add the following to your CSS file (e.g., <code className="bg-base-300 px-1 rounded">app.css</code>):
              </p>
              <div className="relative group mb-2">
                <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`@import "tailwindcss";
@plugin "daisyui";
@source "../node_modules/@edadma/bloomui/dist";`}</code>
                </pre>
                <button
                  className="absolute top-2 right-2 btn btn-xs btn-ghost opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => navigator.clipboard.writeText(`@import "tailwindcss";\n@plugin "daisyui";\n@source "../node_modules/@edadma/bloomui/dist";`)}
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-base-content/70">
                The <code className="bg-base-300 px-1 rounded">@source</code> directive tells Tailwind to scan PetalUI for utility classes.
              </p>
            </div>
          </div>
        </Card>

        <Card bordered title="Peer Dependencies">
            <div className="space-y-2">
              <p>PetalUI requires the following peer dependencies:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>React 18+ or React 19+</li>
                <li>React DOM 18+ or React DOM 19+</li>
                <li>React Hook Form 7+</li>
              </ul>
              <p className="text-sm text-base-content/70 mt-2">
                With npm 7+, peer dependencies are installed automatically.
              </p>
            </div>
        </Card>

        <Card bordered title="Quick Start">
            <div className="space-y-2">
              <p>Import and use components in your React app:</p>
              <div className="relative group">
                <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { Button, Card } from '@edadma/bloomui'

const App = () => {
  return (
    <Card bordered title="Hello!">
      <Button type="primary">Click me</Button>
    </Card>
  )
}

export default App`}</code>
                </pre>
                <button
                  className="absolute top-2 right-2 btn btn-xs btn-ghost opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    navigator.clipboard.writeText(`import { Button, Card } from '@edadma/bloomui'

const App = () => {
  return (
    <Card bordered title="Hello!">
      <Button type="primary">Click me</Button>
    </Card>
  )
}

export default App`)
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
        </Card>

        <Card bordered title="Features">
            <ul className="list-disc list-inside space-y-2">
              <li>80+ React components</li>
              <li>Built with DaisyUI and Tailwind CSS</li>
              <li>TypeScript support</li>
              <li>Tree-shakeable</li>
              <li>Form integration with React Hook Form</li>
              <li>Customizable themes</li>
            </ul>
        </Card>
      </Masonry>
    </div>
  )
}
