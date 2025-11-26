import { CodeMockup, Masonry } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const codeApi: ApiProperty[] = [
  { property: 'children', description: 'Code lines (use CodeMockup.Line)', type: 'React.ReactNode' },
  { property: 'className', description: 'Additional CSS classes', type: 'string' },
]

const lineApi: ApiProperty[] = [
  { property: 'children', description: 'Code content', type: 'React.ReactNode' },
  { property: 'prefix', description: 'Line prefix (e.g., $, >, line number)', type: 'string', default: "'$'" },
  { property: 'className', description: 'Classes for the line (e.g., text-success)', type: 'string' },
]

export function CodeMockupPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">CodeMockup</h1>
        <p className="text-base-content/70">
          Display code in a terminal-style mockup with line prefixes.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Code"
          description="Terminal-style code display."
          code={`<CodeMockup className="w-full">
  <CodeMockup.Line>npm install @edadma/petalui</CodeMockup.Line>
</CodeMockup>`}
        >
          <CodeMockup className="w-full">
            <CodeMockup.Line>npm install @edadma/petalui</CodeMockup.Line>
          </CodeMockup>
        </ExampleSection>

        <ExampleSection
          title="Multiple Lines"
          description="Multiple lines with different prefixes."
          code={`<CodeMockup className="w-full">
  <CodeMockup.Line prefix="1">npm install @edadma/petalui</CodeMockup.Line>
  <CodeMockup.Line prefix="2">importing...</CodeMockup.Line>
  <CodeMockup.Line prefix="3" className="text-success">Done!</CodeMockup.Line>
</CodeMockup>`}
        >
          <CodeMockup className="w-full">
            <CodeMockup.Line prefix="1">npm install @edadma/petalui</CodeMockup.Line>
            <CodeMockup.Line prefix="2">importing...</CodeMockup.Line>
            <CodeMockup.Line prefix="3" className="text-success">Done!</CodeMockup.Line>
          </CodeMockup>
        </ExampleSection>

        <ExampleSection
          title="With Colors"
          description="Highlighted lines with status colors."
          code={`<CodeMockup className="w-full">
  <CodeMockup.Line prefix="~">Compiling...</CodeMockup.Line>
  <CodeMockup.Line prefix="~" className="text-warning">Warning: unused variable</CodeMockup.Line>
  <CodeMockup.Line prefix="~" className="text-error">Error: missing semicolon</CodeMockup.Line>
  <CodeMockup.Line prefix="~" className="text-success">Build complete!</CodeMockup.Line>
</CodeMockup>`}
        >
          <CodeMockup className="w-full">
            <CodeMockup.Line prefix="~">Compiling...</CodeMockup.Line>
            <CodeMockup.Line prefix="~" className="text-warning">Warning: unused variable</CodeMockup.Line>
            <CodeMockup.Line prefix="~" className="text-error">Error: missing semicolon</CodeMockup.Line>
            <CodeMockup.Line prefix="~" className="text-success">Build complete!</CodeMockup.Line>
          </CodeMockup>
        </ExampleSection>

        <ExampleSection
          title="Line Numbers"
          description="Code with line numbers."
          code={`<CodeMockup className="w-full">
  <CodeMockup.Line prefix="1">import React from 'react'</CodeMockup.Line>
  <CodeMockup.Line prefix="2">import { CodeMockup } from '@edadma/petalui'</CodeMockup.Line>
  <CodeMockup.Line prefix="3">{' '}</CodeMockup.Line>
  <CodeMockup.Line prefix="4">export default function App() {'{'}</CodeMockup.Line>
  <CodeMockup.Line prefix="5">{'  return <CodeMockup />'}</CodeMockup.Line>
  <CodeMockup.Line prefix="6">{'}'}</CodeMockup.Line>
</CodeMockup>`}
        >
          <CodeMockup className="w-full">
            <CodeMockup.Line prefix="1">import React from 'react'</CodeMockup.Line>
            <CodeMockup.Line prefix="2">import {'{ CodeMockup }'} from '@edadma/petalui'</CodeMockup.Line>
            <CodeMockup.Line prefix="3">{' '}</CodeMockup.Line>
            <CodeMockup.Line prefix="4">export default function App() {'{'}</CodeMockup.Line>
            <CodeMockup.Line prefix="5">{'  return <CodeMockup />'}</CodeMockup.Line>
            <CodeMockup.Line prefix="6">{'}'}</CodeMockup.Line>
          </CodeMockup>
        </ExampleSection>

        <ExampleSection
          title="Terminal Commands"
          description="Show terminal command sequence."
          code={`<CodeMockup className="w-full">
  <CodeMockup.Line>cd my-project</CodeMockup.Line>
  <CodeMockup.Line>npm init -y</CodeMockup.Line>
  <CodeMockup.Line>npm install @edadma/petalui</CodeMockup.Line>
  <CodeMockup.Line className="text-success">+ @edadma/petalui@0.6.0</CodeMockup.Line>
</CodeMockup>`}
        >
          <CodeMockup className="w-full">
            <CodeMockup.Line>cd my-project</CodeMockup.Line>
            <CodeMockup.Line>npm init -y</CodeMockup.Line>
            <CodeMockup.Line>npm install @edadma/petalui</CodeMockup.Line>
            <CodeMockup.Line className="text-success">+ @edadma/petalui@0.6.0</CodeMockup.Line>
          </CodeMockup>
        </ExampleSection>

        <ExampleSection
          title="Git Commands"
          description="Show git workflow."
          code={`<CodeMockup className="w-full">
  <CodeMockup.Line prefix=">">git add .</CodeMockup.Line>
  <CodeMockup.Line prefix=">">git commit -m "Initial commit"</CodeMockup.Line>
  <CodeMockup.Line prefix=">" className="text-info">[main 1234567] Initial commit</CodeMockup.Line>
  <CodeMockup.Line prefix=">">git push origin main</CodeMockup.Line>
</CodeMockup>`}
        >
          <CodeMockup className="w-full">
            <CodeMockup.Line prefix=">">git add .</CodeMockup.Line>
            <CodeMockup.Line prefix=">">git commit -m "Initial commit"</CodeMockup.Line>
            <CodeMockup.Line prefix=">" className="text-info">[main 1234567] Initial commit</CodeMockup.Line>
            <CodeMockup.Line prefix=">">git push origin main</CodeMockup.Line>
          </CodeMockup>
        </ExampleSection>
      </Masonry>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="CodeMockup" data={codeApi} />
        <ApiTable title="CodeMockup.Line" data={lineApi} />
      </div>
    </div>
  )
}
