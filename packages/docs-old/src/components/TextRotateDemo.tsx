import { TextRotate } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { TextRotate } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TextRotate
        items={['Hello', 'Salut', 'Hola', 'Ciao', 'Hallo']}
        className="text-4xl font-bold"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TextRotate } from 'asterui'
export function CenteredDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TextRotate
        items={[
          'Build faster',
          'Ship sooner',
          'Scale easily',
          'Sleep better',
        ]}
        centered
        className="text-3xl font-semibold text-primary"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TextRotate } from 'asterui'
export function StyledDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TextRotate
        items={[
          <span className="text-primary">Creative</span>,
          <span className="text-secondary">Innovative</span>,
          <span className="text-accent">Dynamic</span>,
          <span className="text-success">Powerful</span>,
        ]}
        className="text-5xl font-black"
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { TextRotate } from 'asterui'
export function FastDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <TextRotate
        items={[
          'BLAZING',
          <span className="font-bold italic px-2">FAST ▶︎▶︎</span>,
        ]}
        duration={6000}
        centered
        className="text-7xl"
      />
      {/* @example-return-end */}
    </Demo>
  )
}
