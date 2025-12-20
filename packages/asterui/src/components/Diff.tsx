import React from 'react'

// DaisyUI classes
const dDiff = 'diff'
const dDiffItem1 = 'diff-item-1'
const dDiffItem2 = 'diff-item-2'
const dDiffResizer = 'diff-resizer'

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
      className={`${dDiff} ${aspect} ${className}`.trim()}
      tabIndex={0}
    >
      <div className={dDiffItem1} role="img" tabIndex={0}>
        {left}
      </div>
      <div className={dDiffItem2} role="img">
        {right}
      </div>
      <div className={dDiffResizer} />
    </figure>
  )
}
