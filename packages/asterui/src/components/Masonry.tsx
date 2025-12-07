import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  columns?:
    | number
    | {
        xs?: number
        sm?: number
        md?: number
        lg?: number
        xl?: number
        '2xl'?: number
      }
  gap?: number
}

// Tailwind breakpoints in pixels
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function getColumnsForWidth(
  columns: MasonryProps['columns'],
  width: number
): number {
  if (typeof columns === 'number') {
    return columns
  }

  if (!columns) return 3

  // Find the appropriate column count for current width
  // Start from largest breakpoint and work down
  if (columns['2xl'] !== undefined && width >= BREAKPOINTS['2xl']) {
    return columns['2xl']
  }
  if (columns.xl !== undefined && width >= BREAKPOINTS.xl) {
    return columns.xl
  }
  if (columns.lg !== undefined && width >= BREAKPOINTS.lg) {
    return columns.lg
  }
  if (columns.md !== undefined && width >= BREAKPOINTS.md) {
    return columns.md
  }
  if (columns.sm !== undefined && width >= BREAKPOINTS.sm) {
    return columns.sm
  }
  if (columns.xs !== undefined) {
    return columns.xs
  }

  // Default fallback
  return 3
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  gap = 16,
  className = '',
  style,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<
    Array<{ left: number; top: number }>
  >([])
  const [containerHeight, setContainerHeight] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const childArray = React.Children.toArray(children)

  const calculateLayout = useCallback(() => {
    const container = containerRef.current
    if (!container || childArray.length === 0) return

    const containerWidth = container.offsetWidth
    // Use viewport width for responsive breakpoints (matches Tailwind behavior)
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth
    const numColumns = getColumnsForWidth(columns, viewportWidth)
    const columnWidth = (containerWidth - gap * (numColumns - 1)) / numColumns

    // Track height of each column
    const columnHeights = new Array(numColumns).fill(0)
    const newPositions: Array<{ left: number; top: number }> = []

    // Place each item in the shortest column
    childArray.forEach((_, index) => {
      const itemEl = itemRefs.current[index]
      if (!itemEl) return

      // Find shortest column
      let shortestColumn = 0
      let minHeight = columnHeights[0]
      for (let i = 1; i < numColumns; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i]
          shortestColumn = i
        }
      }

      // Calculate position
      const left = shortestColumn * (columnWidth + gap)
      const top = columnHeights[shortestColumn]

      newPositions[index] = { left, top }

      // Update column height
      const itemHeight = itemEl.offsetHeight
      columnHeights[shortestColumn] += itemHeight + gap
    })

    setPositions(newPositions)
    setContainerHeight(Math.max(...columnHeights) - gap)
  }, [children, columns, gap, childArray.length])

  // Calculate layout after render and on resize
  useLayoutEffect(() => {
    calculateLayout()

    const handleResize = () => {
      calculateLayout()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateLayout])

  // Recalculate when children change
  useLayoutEffect(() => {
    // Small delay to ensure refs are populated
    const timer = setTimeout(calculateLayout, 0)
    return () => clearTimeout(timer)
  }, [children, calculateLayout])

  const containerWidth = containerRef.current?.offsetWidth ?? 0
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth
  const numColumns = getColumnsForWidth(columns, viewportWidth)
  const columnWidth =
    containerWidth > 0
      ? (containerWidth - gap * (numColumns - 1)) / numColumns
      : 0

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: containerHeight > 0 ? containerHeight : undefined,
        ...style,
      }}
      {...rest}
    >
      {childArray.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          style={{
            position: positions.length > 0 ? 'absolute' : 'relative',
            left: positions[index]?.left ?? 0,
            top: positions[index]?.top ?? 0,
            width: columnWidth > 0 ? columnWidth : '100%',
            visibility: positions.length > 0 ? 'visible' : 'hidden',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

Masonry.displayName = 'Masonry'

export default Masonry
