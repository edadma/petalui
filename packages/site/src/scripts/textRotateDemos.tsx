import React from 'react'
import { createRoot } from 'react-dom/client'
import { TextRotate } from 'asterui'
import { CheckIconSvg } from './icons'

const BasicDemo = () => (
  <TextRotate
    items={['Hello', 'Salut', 'Hola', 'Ciao', 'Hallo']}
    className="text-4xl font-bold"
  />
)

const CenteredDemo = () => (
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
)

const StyledDemo = () => (
  <TextRotate
    items={[
      <span key="1" className="text-primary">Creative</span>,
      <span key="2" className="text-secondary">Innovative</span>,
      <span key="3" className="text-accent">Dynamic</span>,
      <span key="4" className="text-success">Powerful</span>,
    ]}
    className="text-5xl font-black"
  />
)

const FastDemo = () => (
  <TextRotate
    items={[
      'BLAZING',
      <span key="fast" className="font-bold italic px-2">FAST ▶︎▶︎</span>,
    ]}
    duration={6000}
    centered
    className="text-7xl"
  />
)

const demos: Record<string, React.ReactNode> = {
  basic: <BasicDemo />,
  centered: <CenteredDemo />,
  styled: <StyledDemo />,
  fast: <FastDemo />,
}

document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && demos[exampleId]) {
    createRoot(container).render(demos[exampleId])
  }
})

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML = CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
