import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface DemoProps {
  children: ReactNode
}

export function Demo({ children }: DemoProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      const shadow = hostRef.current.attachShadow({ mode: 'open' })

      // Add DaisyUI CSS via link element
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/daisyui@5/daisyui.css'
      shadow.appendChild(link)

      // Add base styles
      const style = document.createElement('style')
      style.textContent = `
        *, *::before, *::after {
          box-sizing: border-box;
        }
        :host {
          display: block;
        }
        :host > div {
          padding: 0.75rem;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.05) 1px,
            transparent 1px,
            transparent 6px
          );
        }
        :host > div[data-theme="dark"] {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 6px
          );
        }
        /* Tailwind utilities for AsterUI components */
        .rounded-full { border-radius: 9999px; }
        .flex { display: flex; }
        .flex-row { flex-direction: row; }
        .flex-col { flex-direction: column; }
        .flex-wrap { flex-wrap: wrap; }
        .items-start { align-items: flex-start; }
        .items-center { align-items: center; }
        .items-end { align-items: flex-end; }
        .items-baseline { align-items: baseline; }
        .items-stretch { align-items: stretch; }
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
      `
      shadow.appendChild(style)

      // Create container for React content
      const div = document.createElement('div')
      shadow.appendChild(div)

      // Sync theme with Starlight
      const syncTheme = () => {
        const isDark = document.documentElement.dataset.theme === 'dark' ||
          document.documentElement.classList.contains('dark') ||
          (document.querySelector('[data-theme]') as HTMLElement)?.dataset.theme === 'dark'
        div.setAttribute('data-theme', isDark ? 'dark' : 'light')
      }

      syncTheme()

      // Watch for theme changes
      const observer = new MutationObserver(syncTheme)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
      })

      setContainer(div)

      return () => observer.disconnect()
    }
  }, [])

  return (
    <div ref={hostRef}>
      {container && createPortal(children, container)}
    </div>
  )
}
