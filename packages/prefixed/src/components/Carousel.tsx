import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from 'react'

export type CarouselEffect = 'scrollx' | 'fade'
export type CarouselDotPlacement = 'top' | 'bottom' | 'start' | 'end'

export interface CarouselRef {
  goTo: (index: number, animate?: boolean) => void
  next: () => void
  prev: () => void
}

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string
  children: React.ReactNode
}

const CarouselItemComponent = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ children, className = '', 'data-testid': testId, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={`d-carousel-item w-full flex-shrink-0 ${className}`}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

CarouselItemComponent.displayName = 'Carousel.Item'

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Carousel slides */
  children: React.ReactNode
  /** Current slide index (controlled mode) */
  activeIndex?: number
  /** Default slide index (uncontrolled mode) */
  defaultActiveIndex?: number
  /** Auto-advance slides */
  autoplay?: boolean
  /** Autoplay interval in milliseconds */
  autoplaySpeed?: number
  /** Animation duration in milliseconds */
  speed?: number
  /** Show prev/next navigation arrows */
  arrows?: boolean
  /** Show slide indicator dots */
  dots?: boolean | { className?: string }
  /** Position of indicator dots */
  dotPlacement?: CarouselDotPlacement
  /** Transition effect */
  effect?: CarouselEffect
  /** Enable infinite looping */
  infinite?: boolean
  /** Pause autoplay on hover */
  pauseOnHover?: boolean
  /** Vertical carousel orientation */
  vertical?: boolean
  /** Callback before slide change */
  beforeChange?: (current: number, next: number) => void
  /** Callback after slide change */
  afterChange?: (current: number) => void
  /** Test ID for testing */
  'data-testid'?: string
}

const CarouselComponent = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      activeIndex: controlledIndex,
      defaultActiveIndex = 0,
      autoplay = false,
      autoplaySpeed = 3000,
      speed = 500,
      arrows = true,
      dots = true,
      dotPlacement = 'bottom',
      effect = 'scrollx',
      infinite = true,
      pauseOnHover = true,
      vertical = false,
      beforeChange,
      afterChange,
      className = '',
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledIndex !== undefined
    const [internalIndex, setInternalIndex] = useState(defaultActiveIndex)
    const currentIndex = isControlled ? controlledIndex : internalIndex

    const [isPaused, setIsPaused] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    const slides = Children.toArray(children).filter(isValidElement)
    const slideCount = slides.length

    const goTo = useCallback(
      (index: number, animate = true) => {
        if (isAnimating || slideCount === 0) return

        let targetIndex = index
        if (infinite) {
          targetIndex = ((index % slideCount) + slideCount) % slideCount
        } else {
          targetIndex = Math.max(0, Math.min(index, slideCount - 1))
        }

        if (targetIndex === currentIndex) return

        beforeChange?.(currentIndex, targetIndex)

        if (animate) {
          setIsAnimating(true)
          setTimeout(() => {
            setIsAnimating(false)
            afterChange?.(targetIndex)
          }, speed)
        } else {
          afterChange?.(targetIndex)
        }

        if (!isControlled) {
          setInternalIndex(targetIndex)
        }
      },
      [currentIndex, slideCount, infinite, isControlled, beforeChange, afterChange, speed, isAnimating]
    )

    const next = useCallback(() => {
      goTo(currentIndex + 1)
    }, [goTo, currentIndex])

    const prev = useCallback(() => {
      goTo(currentIndex - 1)
    }, [goTo, currentIndex])

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      goTo: (index: number, animate = true) => goTo(index, animate),
      next,
      prev,
    }))

    // Autoplay
    useEffect(() => {
      if (autoplay && !isPaused && slideCount > 1) {
        autoplayRef.current = setInterval(() => {
          next()
        }, autoplaySpeed)
      }

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current)
        }
      }
    }, [autoplay, isPaused, autoplaySpeed, next, slideCount])

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (vertical) {
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            prev()
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            next()
          }
        } else {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            prev()
          } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            next()
          }
        }
      },
      [vertical, prev, next]
    )

    const handleMouseEnter = () => {
      if (pauseOnHover && autoplay) {
        setIsPaused(true)
      }
    }

    const handleMouseLeave = () => {
      if (pauseOnHover && autoplay) {
        setIsPaused(false)
      }
    }

    // Build carousel classes
    const carouselClasses = [
      'd-carousel',
      vertical ? 'd-carousel-vertical' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Slide transform/opacity based on effect
    const getSlideStyle = (index: number): React.CSSProperties => {
      if (effect === 'fade') {
        return {
          position: index === 0 ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          opacity: index === currentIndex ? 1 : 0,
          transition: `opacity ${speed}ms ease-in-out`,
          zIndex: index === currentIndex ? 1 : 0,
        }
      }
      return {}
    }

    // Container style for scrollx effect
    const trackStyle: React.CSSProperties =
      effect === 'scrollx'
        ? {
            display: 'flex',
            flexDirection: vertical ? 'column' : 'row',
            transform: vertical
              ? `translateY(-${currentIndex * 100}%)`
              : `translateX(-${currentIndex * 100}%)`,
            transition: `transform ${speed}ms ease-in-out`,
            height: vertical ? '100%' : undefined,
          }
        : {
            position: 'relative',
            width: '100%',
            height: '100%',
          }

    // Slide style - ensure proper sizing for vertical/horizontal
    const getSlideContainerStyle = (): React.CSSProperties => {
      if (vertical) {
        return { height: '100%', flexShrink: 0 }
      }
      return {}
    }

    // Dots placement classes
    const dotsPlacementClasses: Record<CarouselDotPlacement, string> = {
      top: 'top-2 left-1/2 -translate-x-1/2 flex-row',
      bottom: 'bottom-2 left-1/2 -translate-x-1/2 flex-row',
      start: 'left-2 top-1/2 -translate-y-1/2 flex-col',
      end: 'right-2 top-1/2 -translate-y-1/2 flex-col',
    }

    const showDots = dots === true || (typeof dots === 'object' && dots !== null)
    const dotsClassName = typeof dots === 'object' ? dots.className : ''

    // Arrow buttons
    const ArrowButton = ({
      direction,
      onClick,
      disabled,
    }: {
      direction: 'prev' | 'next'
      onClick: () => void
      disabled: boolean
    }) => {
      const isPrev = direction === 'prev'
      const positionClass = vertical
        ? isPrev
          ? 'top-2 left-1/2 -translate-x-1/2'
          : 'bottom-2 left-1/2 -translate-x-1/2'
        : isPrev
          ? 'left-2 top-1/2 -translate-y-1/2'
          : 'right-2 top-1/2 -translate-y-1/2'

      const arrowIcon = vertical
        ? isPrev
          ? '▲'
          : '▼'
        : isPrev
          ? '❮'
          : '❯'

      return (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label={isPrev ? 'Previous slide' : 'Next slide'}
          className={`absolute ${positionClass} d-btn d-btn-circle d-btn-sm bg-base-100/80 hover:bg-base-100 border-none shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed`}
          data-testid={testId ? `${testId}-${direction}` : undefined}
        >
          {arrowIcon}
        </button>
      )
    }

    return (
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${carouselClasses}`}
        data-testid={testId}
        data-active-index={currentIndex}
        {...rest}
      >
        {/* Slides track */}
        <div
          className={effect === 'fade' ? 'relative w-full h-full' : vertical ? 'h-full' : ''}
          style={trackStyle}
          aria-live="polite"
        >
          {slides.map((slide, index) => {
            const slideElement = slide as React.ReactElement<CarouselItemProps & { style?: React.CSSProperties }>
            return cloneElement(slideElement, {
              key: index,
              'aria-hidden': index !== currentIndex,
              'aria-label': `Slide ${index + 1} of ${slideCount}`,
              style: {
                ...slideElement.props.style,
                ...getSlideContainerStyle(),
                ...getSlideStyle(index),
              },
              'data-testid': testId ? `${testId}-slide-${index}` : undefined,
            })
          })}
        </div>

        {/* Navigation arrows */}
        {arrows && slideCount > 1 && (
          <>
            <ArrowButton
              direction="prev"
              onClick={prev}
              disabled={!infinite && currentIndex === 0}
            />
            <ArrowButton
              direction="next"
              onClick={next}
              disabled={!infinite && currentIndex === slideCount - 1}
            />
          </>
        )}

        {/* Dot indicators */}
        {showDots && slideCount > 1 && (
          <div
            className={`absolute flex gap-2 ${dotsPlacementClasses[dotPlacement]} ${dotsClassName || ''}`}
            role="tablist"
            aria-label="Slide indicators"
            data-testid={testId ? `${testId}-dots` : undefined}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-4'
                    : 'bg-base-content/30 hover:bg-base-content/50'
                }`}
                data-testid={testId ? `${testId}-dot-${index}` : undefined}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

CarouselComponent.displayName = 'Carousel'

// Compound component type
type CarouselType = typeof CarouselComponent & {
  Item: typeof CarouselItemComponent
}

export const Carousel = CarouselComponent as CarouselType
Carousel.Item = CarouselItemComponent
