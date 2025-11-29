import React from 'react'

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
}

export interface ListRowProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

function ListRoot({ children, className = '', ...rest }: ListProps) {
  const classes = ['list', className].filter(Boolean).join(' ')
  return <ul className={classes} {...rest}>{children}</ul>
}

function ListRow({ children, className = '', ...rest }: ListRowProps) {
  const classes = ['list-row', className].filter(Boolean).join(' ')
  return <li className={classes} {...rest}>{children}</li>
}

export const List = Object.assign(ListRoot, {
  Row: ListRow,
})
