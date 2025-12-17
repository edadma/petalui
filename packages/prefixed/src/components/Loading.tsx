import React from 'react'

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
  spinning?: boolean
  children?: React.ReactNode
  tip?: string
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  type = 'spinner',
  className = '',
  spinning = true,
  children,
  tip,
  ...rest
}) => {
  const sizeClasses = {
    xs: 'd-loading-xs',
    sm: 'd-loading-sm',
    md: 'd-loading-md',
    lg: 'd-loading-lg',
  }

  const typeClasses = {
    spinner: 'd-loading-spinner',
    dots: 'd-loading-dots',
    ring: 'd-loading-ring',
    ball: 'd-loading-ball',
    bars: 'd-loading-bars',
    infinity: 'd-loading-infinity',
  }

  const spinnerClasses = ['d-loading', typeClasses[type], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ')

  if (children) {
    return (
      <div className="relative" {...rest}>
        {spinning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100/50 backdrop-blur-sm z-10">
            <span className={spinnerClasses}></span>
            {tip && <p className="mt-2 text-sm">{tip}</p>}
          </div>
        )}
        <div className={spinning ? 'pointer-events-none' : ''}>{children}</div>
      </div>
    )
  }

  if (!spinning) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-2" {...rest}>
      <span className={spinnerClasses}></span>
      {tip && <p className="text-sm">{tip}</p>}
    </div>
  )
}
