import { TextRotate } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <TextRotate
        items={['Hello', 'Salut', 'Hola', 'Ciao', 'Hallo']}
        className="text-4xl font-bold"
      />
    </Demo>
  )
}

export function CenteredDemo() {
  return (
    <Demo>
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
    </Demo>
  )
}

export function StyledDemo() {
  return (
    <Demo>
      <TextRotate
        items={[
          <span className="text-primary">Creative</span>,
          <span className="text-secondary">Innovative</span>,
          <span className="text-accent">Dynamic</span>,
          <span className="text-success">Powerful</span>,
        ]}
        className="text-5xl font-black"
      />
    </Demo>
  )
}

export function FastDemo() {
  return (
    <Demo>
      <TextRotate
        items={[
          'BLAZING',
          <span className="font-bold italic px-2">FAST ▶︎▶︎</span>,
        ]}
        duration={6000}
        centered
        className="text-7xl"
      />
    </Demo>
  )
}
