import React from 'react'

// DaisyUI classes
const dDiff = 'd-diff'
const dDiffItem1 = 'd-diff-item-1'
const dDiffItem2 = 'd-diff-item-2'
const dDiffResizer = 'd-diff-resizer'

export interface DiffProps extends React.HTMLAttributes<HTMLElement> {
  /** Left side content (revealed when dragging) */
  left: React.ReactNode
  /** Right side content (hidden when dragging) */
  right: React.ReactNode
  /** Aspect ratio class (e.g., "aspect-16/9", "aspect-4/3", "aspect-square") */
  aspect?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export const Diff: React.FC<DiffProps> = ({
  left,
  right,
  aspect = 'aspect-16/9',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <figure
      className={`${dDiff} ${aspect} ${className}`.trim()}
      tabIndex={0}
      data-testid={testId}
      {...rest}
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
