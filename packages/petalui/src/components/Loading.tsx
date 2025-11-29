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
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  }

  const typeClasses = {
    spinner: 'loading-spinner',
    dots: 'loading-dots',
    ring: 'loading-ring',
    ball: 'loading-ball',
    bars: 'loading-bars',
    infinity: 'loading-infinity',
  }

  const spinnerClasses = ['loading', typeClasses[type], sizeClasses[size], className]
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
