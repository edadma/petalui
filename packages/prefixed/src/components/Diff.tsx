import React from 'react'

export interface DiffProps {
  /** Left side content (revealed when dragging) */
  left: React.ReactNode
  /** Right side content (hidden when dragging) */
  right: React.ReactNode
  /** Aspect ratio class (e.g., "aspect-16/9", "aspect-4/3", "aspect-square") */
  aspect?: string
  /** Additional CSS classes */
  className?: string
}

export const Diff: React.FC<DiffProps> = ({
  left,
  right,
  aspect = 'aspect-16/9',
  className = '',
}) => {
  return (
    <figure
      className={`d-diff ${aspect} ${className}`.trim()}
      tabIndex={0}
    >
      <div className="d-diff-item-1" role="img" tabIndex={0}>
        {left}
      </div>
      <div className="d-diff-item-2" role="img">
        {right}
      </div>
      <div className="d-diff-resizer" />
    </figure>
  )
}
