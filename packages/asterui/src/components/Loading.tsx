import React from 'react'
import { useConfig } from '../providers/ConfigProvider'

// DaisyUI classes
const dLoading = 'loading'
const dLoadingXs = 'loading-xs'
const dLoadingSm = 'loading-sm'
const dLoadingMd = 'loading-md'
const dLoadingLg = 'loading-lg'
const dLoadingXl = 'loading-xl'
const dLoadingSpinner = 'loading-spinner'
const dLoadingDots = 'loading-dots'
const dLoadingRing = 'loading-ring'
const dLoadingBall = 'loading-ball'
const dLoadingBars = 'loading-bars'
const dLoadingInfinity = 'loading-infinity'

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
  spinning?: boolean
  children?: React.ReactNode
  tip?: string
  /** Accessible label for the loading indicator (defaults to tip or "Loading") */
  label?: string
}

export const Loading: React.FC<LoadingProps> = ({
  size,
  type = 'spinner',
  className = '',
  spinning = true,
  children,
  tip,
  label,
  ...rest
}) => {
  const { componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
  const accessibleLabel = label || tip || 'Loading'

  const sizeClasses = {
    xs: dLoadingXs,
    sm: dLoadingSm,
    md: dLoadingMd,
    lg: dLoadingLg,
    xl: dLoadingXl,
  }

  const typeClasses = {
    spinner: dLoadingSpinner,
    dots: dLoadingDots,
    ring: dLoadingRing,
    ball: dLoadingBall,
    bars: dLoadingBars,
    infinity: dLoadingInfinity,
  }

  const spinnerClasses = [dLoading, typeClasses[type], sizeClasses[effectiveSize], className]
    .filter(Boolean)
    .join(' ')

  if (children) {
    return (
      <div className="relative" aria-busy={spinning} {...rest}>
        {spinning && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-base-100/50 backdrop-blur-sm z-10"
            role="status"
            aria-live="polite"
          >
            <span className={spinnerClasses} aria-hidden="true"></span>
            {tip && <p className="mt-2 text-sm">{tip}</p>}
            {!tip && <span className="sr-only">{accessibleLabel}</span>}
          </div>
        )}
        <div className={spinning ? 'pointer-events-none' : ''} aria-hidden={spinning}>
          {children}
        </div>
      </div>
    )
  }

  if (!spinning) {
    return null
  }

  return (
    <div
      className="flex flex-col items-center gap-2"
      role="status"
      aria-live="polite"
      {...rest}
    >
      <span className={spinnerClasses} aria-hidden="true"></span>
      {tip && <p className="text-sm">{tip}</p>}
      {!tip && <span className="sr-only">{accessibleLabel}</span>}
    </div>
  )
}
