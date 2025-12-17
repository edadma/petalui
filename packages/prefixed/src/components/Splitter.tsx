import React, { useState, useRef, useCallback, useEffect } from 'react'

export interface SplitterPanelProps {
  children: React.ReactNode
  defaultSize?: number
  size?: number
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  resizable?: boolean
  className?: string
}

export interface SplitterProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  sizes?: number[]
  defaultSizes?: number[]
  onSizesChange?: (sizes: number[]) => void
  gutterSize?: number
  minSize?: number
  className?: string
}

const Panel: React.FC<SplitterPanelProps> = ({ children }) => {
  return <>{children}</>
}

export const Splitter: React.FC<SplitterProps> & { Panel: typeof Panel } = ({
  children,
  direction = 'horizontal',
  sizes,
  defaultSizes,
  onSizesChange,
  gutterSize = 8,
  minSize = 50,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const draggingRef = useRef<{ index: number; startPos: number; startSizes: number[] } | null>(null)

  // Extract panel props from children
  const panels = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<SplitterPanelProps> =>
      React.isValidElement(child)
  )

  const panelCount = panels.length

  // Track collapsed state for each panel
  const [collapsedStates, setCollapsedStates] = useState<boolean[]>(() =>
    panels.map((panel) => panel.props.defaultCollapsed ?? panel.props.collapsed ?? false)
  )

  // Store sizes before collapse for restoration
  const sizesBeforeCollapseRef = useRef<number[]>([])

  // Initialize sizes from panel props or defaults
  const getInitialSizes = useCallback(() => {
    // First check if any panels have defaultSize
    const panelDefaultSizes = panels.map((panel) => panel.props.defaultSize)
    const hasAnyPanelSize = panelDefaultSizes.some((s) => s !== undefined)

    if (defaultSizes && defaultSizes.length === panelCount) {
      return defaultSizes
    }

    if (hasAnyPanelSize) {
      // Calculate sizes from panel props
      const definedTotal = panelDefaultSizes.reduce<number>((sum, s) => sum + (s ?? 0), 0)
      const undefinedCount = panelDefaultSizes.filter((s) => s === undefined).length
      const remainingSize = Math.max(0, 100 - definedTotal)
      const sizePerUndefined = undefinedCount > 0 ? remainingSize / undefinedCount : 0

      return panelDefaultSizes.map((s) => s ?? sizePerUndefined)
    }

    // Equal distribution
    const equalSize = 100 / panelCount
    return Array(panelCount).fill(equalSize)
  }, [defaultSizes, panelCount, panels])

  const [internalSizes, setInternalSizes] = useState<number[]>(getInitialSizes)

  // Handle controlled sizes from panel props
  const getControlledSizes = useCallback(() => {
    const panelSizes = panels.map((panel) => panel.props.size)
    const hasControlledPanel = panelSizes.some((s) => s !== undefined)

    if (!hasControlledPanel) return null

    // Mix controlled and uncontrolled
    const definedTotal = panelSizes.reduce<number>((sum, s) => sum + (s ?? 0), 0)
    const undefinedCount = panelSizes.filter((s) => s === undefined).length
    const remainingSize = Math.max(0, 100 - definedTotal)
    const sizePerUndefined = undefinedCount > 0 ? remainingSize / undefinedCount : 0

    return panelSizes.map((s, i) => s ?? internalSizes[i] ?? sizePerUndefined)
  }, [panels, internalSizes])

  const currentSizes = sizes || getControlledSizes() || internalSizes

  // Update internal sizes when panel count changes
  useEffect(() => {
    if (!sizes && internalSizes.length !== panelCount) {
      setInternalSizes(getInitialSizes())
    }
  }, [panelCount, sizes, internalSizes.length, getInitialSizes])

  // Sync controlled collapsed states from props
  useEffect(() => {
    const newCollapsedStates = panels.map((panel, i) =>
      panel.props.collapsed ?? collapsedStates[i] ?? false
    )
    const hasChange = newCollapsedStates.some((s, i) => s !== collapsedStates[i])
    if (hasChange) {
      setCollapsedStates(newCollapsedStates)
    }
  }, [panels.map(p => p.props.collapsed).join(',')])

  const updateSizes = useCallback(
    (newSizes: number[]) => {
      if (!sizes) {
        setInternalSizes(newSizes)
      }
      onSizesChange?.(newSizes)
    },
    [sizes, onSizesChange]
  )

  const toggleCollapse = useCallback(
    (panelIndex: number) => {
      const panel = panels[panelIndex]
      if (!panel?.props.collapsible) return

      const isCurrentlyCollapsed = collapsedStates[panelIndex]
      const newCollapsed = !isCurrentlyCollapsed

      // Update collapsed state
      const newCollapsedStates = [...collapsedStates]
      newCollapsedStates[panelIndex] = newCollapsed
      setCollapsedStates(newCollapsedStates)

      // Call panel's onCollapse callback
      panel.props.onCollapse?.(newCollapsed)

      // Adjust sizes
      if (newCollapsed) {
        // Store current sizes before collapse
        sizesBeforeCollapseRef.current = [...currentSizes]

        // Collapse: set to minimum (we'll use 0 for collapsed)
        const collapsedSize = 0
        const sizeToRedistribute = currentSizes[panelIndex] - collapsedSize

        // Find panels that can receive the size
        const otherPanels = currentSizes
          .map((s, i) => ({ size: s, index: i }))
          .filter((_, i) => i !== panelIndex && !newCollapsedStates[i])

        if (otherPanels.length > 0) {
          const sizePerPanel = sizeToRedistribute / otherPanels.length
          const newSizes = currentSizes.map((s, i) => {
            if (i === panelIndex) return collapsedSize
            if (!newCollapsedStates[i]) return s + sizePerPanel
            return s
          })
          updateSizes(newSizes)
        }
      } else {
        // Expand: restore previous size
        const previousSize = sizesBeforeCollapseRef.current[panelIndex] || (100 / panelCount)

        // Take size from other panels proportionally
        const otherPanels = currentSizes
          .map((s, i) => ({ size: s, index: i }))
          .filter((_, i) => i !== panelIndex && !newCollapsedStates[i])

        const totalOtherSize = otherPanels.reduce((sum, p) => sum + p.size, 0)

        if (totalOtherSize > 0) {
          const newSizes = currentSizes.map((s, i) => {
            if (i === panelIndex) return previousSize
            if (!newCollapsedStates[i]) {
              const proportion = s / totalOtherSize
              return s - previousSize * proportion
            }
            return s
          })
          updateSizes(newSizes)
        }
      }
    },
    [panels, collapsedStates, currentSizes, panelCount, updateSizes]
  )

  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent) => {
      // Check if either panel is non-resizable
      const panel1Props = panels[index]?.props || {}
      const panel2Props = panels[index + 1]?.props || {}

      if (panel1Props.resizable === false || panel2Props.resizable === false) {
        return // Don't allow dragging
      }

      // Don't allow dragging if either panel is collapsed
      if (collapsedStates[index] || collapsedStates[index + 1]) {
        return
      }

      e.preventDefault()
      const startPos = direction === 'horizontal' ? e.clientX : e.clientY
      draggingRef.current = {
        index,
        startPos,
        startSizes: [...currentSizes],
      }

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!draggingRef.current || !containerRef.current) return

        const { index: dragIndex, startPos: dragStartPos, startSizes } = draggingRef.current
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerSize = direction === 'horizontal' ? containerRect.width : containerRect.height
        const currentPos = direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY

        // Calculate delta as percentage
        const gutterCount = panelCount - 1
        const totalGutterSize = gutterCount * gutterSize
        const availableSize = containerSize - totalGutterSize
        const deltaPixels = currentPos - dragStartPos
        const deltaPercent = (deltaPixels / availableSize) * 100

        // Get min sizes for panels
        const panel1Props = panels[dragIndex]?.props || {}
        const panel2Props = panels[dragIndex + 1]?.props || {}
        const minSize1 = panel1Props.minSize ?? minSize
        const minSize2 = panel2Props.minSize ?? minSize
        const minPercent1 = (minSize1 / availableSize) * 100
        const minPercent2 = (minSize2 / availableSize) * 100

        // Calculate new sizes
        let newSize1 = startSizes[dragIndex] + deltaPercent
        let newSize2 = startSizes[dragIndex + 1] - deltaPercent

        // Apply min constraints
        if (newSize1 < minPercent1) {
          newSize1 = minPercent1
          newSize2 = startSizes[dragIndex] + startSizes[dragIndex + 1] - minPercent1
        }
        if (newSize2 < minPercent2) {
          newSize2 = minPercent2
          newSize1 = startSizes[dragIndex] + startSizes[dragIndex + 1] - minPercent2
        }

        // Apply max constraints
        const maxSize1 = panel1Props.maxSize
        const maxSize2 = panel2Props.maxSize
        if (maxSize1) {
          const maxPercent1 = (maxSize1 / availableSize) * 100
          if (newSize1 > maxPercent1) {
            newSize1 = maxPercent1
            newSize2 = startSizes[dragIndex] + startSizes[dragIndex + 1] - maxPercent1
          }
        }
        if (maxSize2) {
          const maxPercent2 = (maxSize2 / availableSize) * 100
          if (newSize2 > maxPercent2) {
            newSize2 = maxPercent2
            newSize1 = startSizes[dragIndex] + startSizes[dragIndex + 1] - maxPercent2
          }
        }

        const newSizes = [...startSizes]
        newSizes[dragIndex] = newSize1
        newSizes[dragIndex + 1] = newSize2
        updateSizes(newSizes)
      }

      const handleMouseUp = () => {
        draggingRef.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize'
      document.body.style.userSelect = 'none'
    },
    [direction, currentSizes, panelCount, gutterSize, panels, minSize, updateSizes, collapsedStates]
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      // Don't allow keyboard resize if either panel is collapsed
      if (collapsedStates[index] || collapsedStates[index + 1]) {
        return
      }

      const step = e.shiftKey ? 10 : 1
      let delta = 0

      if (direction === 'horizontal') {
        if (e.key === 'ArrowLeft') delta = -step
        else if (e.key === 'ArrowRight') delta = step
      } else {
        if (e.key === 'ArrowUp') delta = -step
        else if (e.key === 'ArrowDown') delta = step
      }

      if (delta !== 0) {
        e.preventDefault()
        const newSizes = [...currentSizes]
        const minPercent = 5 // Minimum 5% when using keyboard

        let newSize1 = newSizes[index] + delta
        let newSize2 = newSizes[index + 1] - delta

        if (newSize1 >= minPercent && newSize2 >= minPercent) {
          newSizes[index] = newSize1
          newSizes[index + 1] = newSize2
          updateSizes(newSizes)
        }
      }
    },
    [direction, currentSizes, updateSizes, collapsedStates]
  )

  const isHorizontal = direction === 'horizontal'

  // Determine if gutter should show collapse buttons
  const getCollapseConfig = (index: number) => {
    const panel1 = panels[index]
    const panel2 = panels[index + 1]
    const panel1Collapsible = panel1?.props.collapsible
    const panel2Collapsible = panel2?.props.collapsible
    const panel1Collapsed = collapsedStates[index]
    const panel2Collapsed = collapsedStates[index + 1]

    return {
      showStart: panel1Collapsible && !panel2Collapsed,
      showEnd: panel2Collapsible && !panel1Collapsed,
      panel1Collapsed,
      panel2Collapsed,
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} h-full w-full ${className}`}
    >
      {panels.map((panel, index) => {
        const panelProps = panel.props
        const isLast = index === panels.length - 1
        const isCollapsed = collapsedStates[index]
        const canResize = panelProps.resizable !== false && !isCollapsed

        return (
          <React.Fragment key={index}>
            <div
              ref={(el) => {
                panelsRef.current[index] = el
              }}
              className={`overflow-auto ${panelProps.className || ''}`}
              style={{
                [isHorizontal ? 'width' : 'height']: isCollapsed
                  ? '0px'
                  : `calc(${currentSizes[index]}% - ${((panelCount - 1) * gutterSize) / panelCount}px)`,
                flexShrink: 0,
                overflow: isCollapsed ? 'hidden' : 'auto',
              }}
              data-collapsed={isCollapsed}
            >
              {panelProps.children}
            </div>
            {!isLast && (
              <div
                role="separator"
                aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
                aria-valuenow={Math.round(currentSizes[index])}
                tabIndex={canResize ? 0 : -1}
                className={`
                  flex-shrink-0 bg-base-300 transition-colors duration-150 relative group
                  ${canResize ? 'hover:bg-primary/30 active:bg-primary/50' : ''}
                  ${canResize ? (isHorizontal ? 'cursor-col-resize' : 'cursor-row-resize') : 'cursor-default'}
                `}
                style={{
                  [isHorizontal ? 'width' : 'height']: `${gutterSize}px`,
                }}
                onMouseDown={(e) => handleMouseDown(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              >
                {/* Collapse buttons */}
                {(() => {
                  const { showStart, showEnd, panel1Collapsed, panel2Collapsed } = getCollapseConfig(index)

                  if (!showStart && !showEnd) {
                    // Just show grip indicator
                    return (
                      <div
                        className={`
                          absolute inset-0 flex items-center justify-center
                          ${isHorizontal ? 'flex-col gap-0.5' : 'flex-row gap-0.5'}
                        `}
                      >
                        <div className="w-1 h-1 rounded-full bg-base-content/30 group-hover:bg-primary/60" />
                        <div className="w-1 h-1 rounded-full bg-base-content/30 group-hover:bg-primary/60" />
                        <div className="w-1 h-1 rounded-full bg-base-content/30 group-hover:bg-primary/60" />
                      </div>
                    )
                  }

                  return (
                    <div
                      className={`
                        absolute inset-0 flex items-center justify-center
                        ${isHorizontal ? 'flex-col' : 'flex-row'}
                      `}
                    >
                      {showStart && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCollapse(index)
                          }}
                          className={`
                            p-0.5 rounded hover:bg-base-content/20 transition-colors
                            ${isHorizontal ? '' : ''}
                          `}
                          aria-label={panel1Collapsed ? 'Expand panel' : 'Collapse panel'}
                        >
                          <svg
                            className={`w-3 h-3 text-base-content/50 hover:text-base-content transition-transform ${
                              panel1Collapsed
                                ? isHorizontal ? 'rotate-180' : '-rotate-90'
                                : isHorizontal ? 'rotate-0' : 'rotate-90'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                      {showEnd && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCollapse(index + 1)
                          }}
                          className={`
                            p-0.5 rounded hover:bg-base-content/20 transition-colors
                          `}
                          aria-label={panel2Collapsed ? 'Expand panel' : 'Collapse panel'}
                        >
                          <svg
                            className={`w-3 h-3 text-base-content/50 hover:text-base-content transition-transform ${
                              panel2Collapsed
                                ? isHorizontal ? 'rotate-0' : 'rotate-90'
                                : isHorizontal ? 'rotate-180' : '-rotate-90'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )
                })()}
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

Splitter.Panel = Panel
