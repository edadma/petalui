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
    'd-stats',
    vertical ? 'd-stats-vertical' : 'd-stats-horizontal',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}

function StatItem({ title, value, desc, figure, actions, className = '', ...rest }: StatProps) {
  return (
    <div className={`d-stat ${className}`} {...rest}>
      {figure && <div className="d-stat-figure">{figure}</div>}
      {title && <div className="d-stat-title">{title}</div>}
      {value && <div className="d-stat-value">{value}</div>}
      {desc && <div className="d-stat-desc">{desc}</div>}
      {actions && <div className="d-stat-actions">{actions}</div>}
    </div>
  )
}

export const Stats = Object.assign(StatsRoot, {
  Stat: StatItem,
})
