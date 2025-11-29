import React from 'react'

export interface StepsProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
  vertical?: boolean
}

export interface StepProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'color'> {
  children: React.ReactNode
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  dataContent?: string
}

function StepsRoot({ children, vertical = false, className = '', ...rest }: StepsProps) {
  const classes = ['steps', vertical && 'steps-vertical', className].filter(Boolean).join(' ')

  return <ul className={classes} {...rest}>{children}</ul>
}

function Step({ children, color, dataContent, className = '', ...rest }: StepProps) {
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
    <li className={classes} data-content={dataContent} {...rest}>
      {children}
    </li>
  )
}

export const Steps = Object.assign(StepsRoot, {
  Step,
})
