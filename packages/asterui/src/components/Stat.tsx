import React from 'react'

// DaisyUI classes
const dStats = 'stats'
const dStatsHorizontal = 'stats-horizontal'
const dStatsVertical = 'stats-vertical'
const dStat = 'stat'
const dStatFigure = 'stat-figure'
const dStatTitle = 'stat-title'
const dStatValue = 'stat-value'
const dStatDesc = 'stat-desc'
const dStatActions = 'stat-actions'

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
    dStats,
    vertical ? dStatsVertical : dStatsHorizontal,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...rest}>{children}</div>
}

function StatItem({ title, value, desc, figure, actions, className = '', ...rest }: StatProps) {
  return (
    <div className={`${dStat} ${className}`} {...rest}>
      {figure && <div className={dStatFigure}>{figure}</div>}
      {title && <div className={dStatTitle}>{title}</div>}
      {value && <div className={dStatValue}>{value}</div>}
      {desc && <div className={dStatDesc}>{desc}</div>}
      {actions && <div className={dStatActions}>{actions}</div>}
    </div>
  )
}

export const Stats = Object.assign(StatsRoot, {
  Stat: StatItem,
})
