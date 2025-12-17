import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

export interface VirtualListProps<T> {
  /** Array of items to render */
  items: T[]
  /** Height of the scrollable container */
  height: number | string
  /** Height of each item, or function returning estimated height per item */
  itemHeight: number | ((item: T, index: number) => number)
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Number of items to render outside visible area */
  overscan?: number
  /** Additional class for the scroll container */
  className?: string
  /** Additional class for the inner container */
  innerClassName?: string
  /** Additional class for each item wrapper */
  itemClassName?: string
  /** Width of the container */
  width?: number | string
  /** Gap between items */
  gap?: number
  /** Callback when scroll position changes */
  onScroll?: (scrollTop: number) => void
}

export function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = '',
  innerClassName = '',
  itemClassName = '',
  width,
  gap = 0,
  onScroll,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const itemHeightRef = useRef(itemHeight)
  const itemsRef = useRef(items)
  itemHeightRef.current = itemHeight
  itemsRef.current = items

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const h = typeof itemHeightRef.current === 'function'
        ? itemHeightRef.current(itemsRef.current[index], index)
        : itemHeightRef.current
      return h + gap
    },
    overscan,
  })

  const virtualItems = virtualizer.getVirtualItems()

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll?.(e.currentTarget.scrollTop)
  }

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height, width }}
      onScroll={handleScroll}
    >
      <div
        className={innerClassName}
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            className={itemClassName}
            data-index={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualItem.size - gap,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  )
}

VirtualList.displayName = 'VirtualList'
