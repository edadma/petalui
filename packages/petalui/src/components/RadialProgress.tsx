import React from 'react'

export interface RadialProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  value: number
  size?: string | number
  thickness?: string | number
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  showValue?: boolean
  children?: React.ReactNode
}

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
  neutral: 'text-neutral',
} as const

export const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  size,
  thickness,
  color,
  showValue = true,
  children,
  className = '',
  style,
  ...rest
}) => {
  const getClasses = () => {
    const classes = ['radial-progress']

    if (color) {
      classes.push(colorClasses[color])
    }

    if (className) {
      classes.push(className)
    }

    return classes.join(' ')
  }

  const getStyle = (): React.CSSProperties => {
    const style: Record<string, string | number> = {
      '--value': value,
    }

    if (size !== undefined) {
      style['--size'] = typeof size === 'number' ? `${size}rem` : size
    }

    if (thickness !== undefined) {
      style['--thickness'] = typeof thickness === 'number' ? `${thickness}px` : thickness
    }

    return style as React.CSSProperties
  }

  return (
    <div
      className={getClasses()}
      style={{ ...getStyle(), ...style }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      {children !== undefined ? children : showValue ? `${value}%` : null}
    </div>
  )
}
