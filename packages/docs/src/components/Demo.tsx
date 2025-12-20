import type { ReactNode } from 'react'

interface DemoProps {
  children: ReactNode
  /** Use CSS containment for performance (requires explicit height) */
  contained?: boolean
  /** Height when contained (default: 5rem) */
  height?: string
}

export function Demo({ children, contained, height = '5rem' }: DemoProps) {
  const style: React.CSSProperties = { padding: '0.75rem' }
  if (contained) {
    style.contain = 'strict'
    style.height = height
  }
  return (
    <div className="not-content demo-area" style={style}>
      {children}
      <style>{`
        .demo-area {
          background-color: oklch(91% 0 0);
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.02),
            rgba(0, 0, 0, 0.02) 1px,
            transparent 1px,
            transparent 6px
          );
        }
        [data-theme="dark"] .demo-area {
          background-color: oklch(25% 0.01 260);
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px,
            transparent 6px
          );
        }
      `}</style>
    </div>
  )
}
