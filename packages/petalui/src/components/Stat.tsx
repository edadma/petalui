import React from 'react'

export interface StatsProps {
  children: React.ReactNode
  className?: string
  vertical?: boolean
}

export interface StatProps {
  title?: React.ReactNode
  value?: React.ReactNode
  desc?: React.ReactNode
  figure?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function StatsRoot({ children, className = '', vertical = false }: StatsProps) {
  const classes = [
    'stats',
    vertical ? 'stats-vertical' : 'stats-horizontal',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}

function StatItem({ title, value, desc, figure, actions, className = '' }: StatProps) {
  return (
    <div className={`stat ${className}`}>
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
