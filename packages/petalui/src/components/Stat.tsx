import React from 'react'

export interface StatsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  vertical?: boolean
}

export interface StatProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  value?: React.ReactNode
  desc?: React.ReactNode
  figure?: React.ReactNode
  actions?: React.ReactNode
}

function StatsRoot({ children, className = '', vertical = false, ...rest }: StatsProps) {
  const classes = [
    'stats',
    vertical ? 'stats-vertical' : 'stats-horizontal',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}

function StatItem({ title, value, desc, figure, actions, className = '', ...rest }: StatProps) {
  return (
    <div className={`stat ${className}`} {...rest}>
      {figure && <div className="stat-figure">{figure}</div>}
      {title && <div className="stat-title">{title}</div>}
      {value && <div className="stat-value">{value}</div>}
      {desc && <div className="stat-desc">{desc}</div>}
      {actions && <div className="stat-actions">{actions}</div>}
    </div>
  )
}

export const Stats = Object.assign(StatsRoot, {
  Stat: StatItem,
})
