import { Code } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Code } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Code>
        <Code.Line prefix="$">npm install asterui</Code.Line>
      </Code>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Code } from 'asterui'
export function MultilineDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Code>
        <Code.Line prefix="$">npm install asterui</Code.Line>
        <Code.Line prefix=">">installing dependencies...</Code.Line>
        <Code.Line prefix=">">added 42 packages</Code.Line>
        <Code.Line prefix="$">npm run dev</Code.Line>
      </Code>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Code } from 'asterui'
export function LineNumbersDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Code>
        <Code.Line prefix="1">import React from 'react'</Code.Line>
        <Code.Line prefix="2">import {'{ Button }'} from 'asterui'</Code.Line>
        <Code.Line prefix="3"></Code.Line>
        <Code.Line prefix="4">export default function App() {'{'}</Code.Line>
        <Code.Line prefix="5">  return &lt;Button&gt;Click me&lt;/Button&gt;</Code.Line>
        <Code.Line prefix="6">{'}'}</Code.Line>
      </Code>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Code } from 'asterui'
export function HighlightDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Code>
        <Code.Line prefix="1">function greet(name) {'{'}</Code.Line>
        <Code.Line prefix="2" highlight>  console.log('Hello, ' + name)</Code.Line>
        <Code.Line prefix="3">{'}'}</Code.Line>
        <Code.Line prefix="4"></Code.Line>
        <Code.Line prefix="5" highlight>greet('World')</Code.Line>
      </Code>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Code } from 'asterui'
export function CopyableDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Code copyable>
        <Code.Line prefix="$">npm install asterui</Code.Line>
      </Code>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Code } from 'asterui'
export function CopyableMultilineDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Code copyable>
        <Code.Line prefix="1">import {'{ Button }'} from 'asterui'</Code.Line>
        <Code.Line prefix="2"></Code.Line>
        <Code.Line prefix="3">export default function App() {'{'}</Code.Line>
        <Code.Line prefix="4">  return &lt;Button&gt;Click me&lt;/Button&gt;</Code.Line>
        <Code.Line prefix="5">{'}'}</Code.Line>
      </Code>
      {/* @example-return-end */}
    </Demo>
  )
}
