import { Code, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const codeApi: ApiProperty[] = [
  { property: 'children', description: 'Code lines (use Code.Line)', type: 'React.ReactNode' },
  { property: 'className', description: 'Additional CSS classes', type: 'string' },
]

const lineApi: ApiProperty[] = [
  { property: 'children', description: 'Code content', type: 'React.ReactNode' },
  { property: 'prefix', description: 'Line prefix (e.g., $, >, line number)', type: 'string', default: "'$'" },
  { property: 'highlight', description: 'Highlight this line', type: 'boolean', default: 'false' },
  { property: 'className', description: 'Classes for the line (e.g., text-success)', type: 'string' },
]

export function CodePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Code</h1>
        <p className="text-base-content/70">
          Display code in a terminal-style mockup with line prefixes.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Code"
          description="Terminal-style code display."
          code={`<Code className="w-full">
  <Code.Line>npm install bloomui</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line>npm install bloomui</Code.Line>
          </Code>
        </ExampleSection>

        <ExampleSection
          title="Multiple Lines"
          description="Multiple lines with different prefixes."
          code={`<Code className="w-full">
  <Code.Line prefix="1">npm install bloomui</Code.Line>
  <Code.Line prefix="2">importing...</Code.Line>
  <Code.Line prefix="3" className="text-success">Done!</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line prefix="1">npm install bloomui</Code.Line>
            <Code.Line prefix="2">importing...</Code.Line>
            <Code.Line prefix="3" className="text-success">Done!</Code.Line>
          </Code>
        </ExampleSection>

        <ExampleSection
          title="With Colors"
          description="Highlighted lines with status colors."
          code={`<Code className="w-full">
  <Code.Line prefix="~">Compiling...</Code.Line>
  <Code.Line prefix="~" className="text-warning">Warning: unused variable</Code.Line>
  <Code.Line prefix="~" className="text-error">Error: missing semicolon</Code.Line>
  <Code.Line prefix="~" className="text-success">Build complete!</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line prefix="~">Compiling...</Code.Line>
            <Code.Line prefix="~" className="text-warning">Warning: unused variable</Code.Line>
            <Code.Line prefix="~" className="text-error">Error: missing semicolon</Code.Line>
            <Code.Line prefix="~" className="text-success">Build complete!</Code.Line>
          </Code>
        </ExampleSection>

        <ExampleSection
          title="Line Numbers"
          description="Code with line numbers."
          code={`<Code className="w-full">
  <Code.Line prefix="1">import React from 'react'</Code.Line>
  <Code.Line prefix="2">import { Code } from '@edadma/bloomui'</Code.Line>
  <Code.Line prefix="3">{' '}</Code.Line>
  <Code.Line prefix="4">export default function App() {'{'}</Code.Line>
  <Code.Line prefix="5">{'  return <Code />'}</Code.Line>
  <Code.Line prefix="6">{'}'}</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line prefix="1">import React from 'react'</Code.Line>
            <Code.Line prefix="2">import {'{ Code }'} from '@edadma/bloomui'</Code.Line>
            <Code.Line prefix="3">{' '}</Code.Line>
            <Code.Line prefix="4">export default function App() {'{'}</Code.Line>
            <Code.Line prefix="5">{'  return <Code />'}</Code.Line>
            <Code.Line prefix="6">{'}'}</Code.Line>
          </Code>
        </ExampleSection>

        <ExampleSection
          title="Terminal Commands"
          description="Show terminal command sequence."
          code={`<Code className="w-full">
  <Code.Line>cd my-project</Code.Line>
  <Code.Line>npm init -y</Code.Line>
  <Code.Line>npm install bloomui</Code.Line>
  <Code.Line className="text-success">+ bloomui@0.9.0</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line>cd my-project</Code.Line>
            <Code.Line>npm init -y</Code.Line>
            <Code.Line>npm install bloomui</Code.Line>
            <Code.Line className="text-success">+ bloomui@0.9.0</Code.Line>
          </Code>
        </ExampleSection>

        <ExampleSection
          title="Git Commands"
          description="Show git workflow."
          code={`<Code className="w-full">
  <Code.Line prefix=">">git add .</Code.Line>
  <Code.Line prefix=">">git commit -m "Initial commit"</Code.Line>
  <Code.Line prefix=">" className="text-info">[main 1234567] Initial commit</Code.Line>
  <Code.Line prefix=">">git push origin main</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line prefix=">">git add .</Code.Line>
            <Code.Line prefix=">">git commit -m "Initial commit"</Code.Line>
            <Code.Line prefix=">" className="text-info">[main 1234567] Initial commit</Code.Line>
            <Code.Line prefix=">">git push origin main</Code.Line>
          </Code>
        </ExampleSection>

        <ExampleSection
          title="Highlighted Lines"
          description="Highlight specific lines."
          code={`<Code className="w-full">
  <Code.Line prefix="1">function greet(name) {'{'}</Code.Line>
  <Code.Line prefix="2" highlight>  console.log('Hello, ' + name)</Code.Line>
  <Code.Line prefix="3">{'}'}</Code.Line>
  <Code.Line prefix="4">{' '}</Code.Line>
  <Code.Line prefix="5" highlight>greet('World')</Code.Line>
</Code>`}
        >
          <Code className="w-full">
            <Code.Line prefix="1">function greet(name) {'{'}</Code.Line>
            <Code.Line prefix="2" highlight>  console.log('Hello, ' + name)</Code.Line>
            <Code.Line prefix="3">{'}'}</Code.Line>
            <Code.Line prefix="4">{' '}</Code.Line>
            <Code.Line prefix="5" highlight>greet('World')</Code.Line>
          </Code>
        </ExampleSection>
      </Masonry>

      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Code" data={codeApi} />
        <ApiTable title="Code.Line" data={lineApi} />
      </div>
    </div>
  )
}
