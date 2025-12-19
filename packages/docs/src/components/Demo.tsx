import type { ReactNode } from 'react'

interface DemoProps {
  children: ReactNode
}

export function Demo({ children }: DemoProps) {
  return (
    <div className="demo-area" style={{ padding: '0.75rem' }}>
      {children}
      <style>{`
        .demo-area {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.05) 1px,
            transparent 1px,
            transparent 6px
          );
        }
        [data-theme="dark"] .demo-area {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 6px
          );
        }
      `}</style>
    </div>
  )
}
