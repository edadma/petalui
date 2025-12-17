import React, { useState, useRef, useEffect } from 'react'

export type PopoverPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'

export type PopoverTrigger = 'hover' | 'click' | 'focus'

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content' | 'title'> {
  children: React.ReactNode
  content: React.ReactNode
  title?: React.ReactNode
  trigger?: PopoverTrigger
  placement?: PopoverPlacement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  overlayClassName?: string
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  title,
  trigger = 'hover',
  placement = 'top',
  open: controlledOpen,
  onOpenChange,
  className = '',
  overlayClassName = '',
  ...rest
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(value)
    }
    onOpenChange?.(value)
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(() => setOpen(false), 100)
    }
  }

  const handleClick = () => {
    if (trigger === 'click') {
      setOpen(!isOpen)
    }
  }

  const handleFocus = () => {
    if (trigger === 'focus') {
      setOpen(true)
    }
  }

  const handleBlur = () => {
    if (trigger === 'focus') {
      setOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === 'click' &&
        isOpen &&
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [trigger, isOpen])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const getPlacementClasses = () => {
    const baseClasses = 'absolute z-50'

    const placements: Record<PopoverPlacement, string> = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      topLeft: 'bottom-full left-0 mb-2',
      topRight: 'bottom-full right-0 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      bottomLeft: 'top-full left-0 mt-2',
      bottomRight: 'top-full right-0 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      leftTop: 'right-full top-0 mr-2',
      leftBottom: 'right-full bottom-0 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      rightTop: 'left-full top-0 ml-2',
      rightBottom: 'left-full bottom-0 ml-2',
    }

    return `${baseClasses} ${placements[placement]}`
  }

  return (
    <div className={`relative inline-block ${className}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={getPlacementClasses()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`bg-base-100 border border-base-content/10 rounded-lg shadow-lg p-3 min-w-[200px] max-w-xs ${overlayClassName}`}
          >
            {title && (
              <div className="font-semibold mb-2 text-base-content border-b border-base-content/10 pb-2">
                {title}
              </div>
            )}
            <div className="text-sm text-base-content/80">{content}</div>
          </div>
        </div>
      )}
    </div>
  )
}

Popover.displayName = 'Popover'

export default Popover
