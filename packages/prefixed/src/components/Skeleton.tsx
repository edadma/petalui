import React from 'react'

// DaisyUI classes
const dSkeleton = 'd-skeleton'
const dSkeletonText = 'd-skeleton-text'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  circle?: boolean
  variant?: 'default' | 'text'
  children?: React.ReactNode
  /** Test ID for testing */
  'data-testid'?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  circle = false,
  variant = 'default',
  className = '',
  children,
  style,
  ...rest
}) => {
  const getClasses = () => {
    const classes = [dSkeleton]

    if (variant === 'text') {
      classes.push(dSkeletonText)
    }

    if (circle) {
      classes.push('rounded-full')
    }

    if (className) {
      classes.push(className)
    }

    return classes.join(' ')
  }

  const getStyles = () => {
    const styles: React.CSSProperties = {}

    if (width) {
      styles.width = typeof width === 'number' ? `${width}px` : width
    }

    if (height) {
      styles.height = typeof height === 'number' ? `${height}px` : height
    }

    return Object.keys(styles).length > 0 ? styles : undefined
  }

  return (
    <div className={getClasses()} style={{ ...getStyles(), ...style }} {...rest}>
      {children}
    </div>
  )
}
