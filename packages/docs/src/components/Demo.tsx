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

      // Add base reset styles
      const style = document.createElement('style')
      style.textContent = `
        *, *::before, *::after {
          box-sizing: border-box;
        }
        :host {
          display: block;
        }
        div {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.05) 1px,
            transparent 1px,
            transparent 6px
          );
        }
        div[data-theme="dark"] {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 6px
          );
        }
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
