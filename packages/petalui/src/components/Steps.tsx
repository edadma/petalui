import React from 'react'

export interface StepsProps {
  children: React.ReactNode
  vertical?: boolean
  className?: string
}

export interface StepProps {
  children: React.ReactNode
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  dataContent?: string
  className?: string
}

function StepsRoot({ children, vertical = false, className = '' }: StepsProps) {
  const classes = ['steps', vertical && 'steps-vertical', className].filter(Boolean).join(' ')

  return <ul className={classes}>{children}</ul>
}

function Step({ children, color, dataContent, className = '' }: StepProps) {
  const colorClasses = {
    neutral: 'step-neutral',
    primary: 'step-primary',
    secondary: 'step-secondary',
    accent: 'step-accent',
    info: 'step-info',
    success: 'step-success',
    warning: 'step-warning',
    error: 'step-error',
  }

  const classes = ['step', color && colorClasses[color], className].filter(Boolean).join(' ')

  return (
    <li className={classes} data-content={dataContent}>
      {children}
    </li>
  )
}

export const Steps = Object.assign(StepsRoot, {
  Step,
})
