import React from 'react'

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export interface FloatingLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  label: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

function LabelRoot({ children, className = '', ...rest }: LabelProps) {
  return <span className={`label ${className}`} {...rest}>{children}</span>
}

function FloatingLabel({ children, label, size, className = '', ...rest }: FloatingLabelProps) {
  const sizeClasses = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
    xl: 'input-xl',
  }

  const classes = ['floating-label', size && sizeClasses[size], className].filter(Boolean).join(' ')

  return (
    <label className={classes} {...rest}>
      {children}
      <span>{label}</span>
    </label>
  )
}

export const Label = Object.assign(LabelRoot, {
  Floating: FloatingLabel,
})
