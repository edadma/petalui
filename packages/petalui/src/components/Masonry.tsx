import React from 'react'

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  columns?: number | {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: number | string
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  gap = 4,
  className = '',
  ...rest
}) => {
  // Map gap values to Tailwind classes
  const getGapClass = () => {
    if (typeof gap === 'string') {
      return gap
    }

    const gapMap: Record<number, string> = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
      8: 'gap-8',
      9: 'gap-9',
      10: 'gap-10',
      11: 'gap-11',
      12: 'gap-12',
    }
    return gapMap[gap] || 'gap-4'
  }

  // Static column class mappings for Tailwind JIT
  const baseColumnMap: Record<number, string> = {
    1: 'columns-1',
    2: 'columns-2',
    3: 'columns-3',
    4: 'columns-4',
    5: 'columns-5',
    6: 'columns-6',
    7: 'columns-7',
    8: 'columns-8',
    9: 'columns-9',
    10: 'columns-10',
    11: 'columns-11',
    12: 'columns-12',
  }

  const smColumnMap: Record<number, string> = {
    1: 'sm:columns-1',
    2: 'sm:columns-2',
    3: 'sm:columns-3',
    4: 'sm:columns-4',
    5: 'sm:columns-5',
    6: 'sm:columns-6',
    7: 'sm:columns-7',
    8: 'sm:columns-8',
    9: 'sm:columns-9',
    10: 'sm:columns-10',
    11: 'sm:columns-11',
    12: 'sm:columns-12',
  }

  const mdColumnMap: Record<number, string> = {
    1: 'md:columns-1',
    2: 'md:columns-2',
    3: 'md:columns-3',
    4: 'md:columns-4',
    5: 'md:columns-5',
    6: 'md:columns-6',
    7: 'md:columns-7',
    8: 'md:columns-8',
    9: 'md:columns-9',
    10: 'md:columns-10',
    11: 'md:columns-11',
    12: 'md:columns-12',
  }

  const lgColumnMap: Record<number, string> = {
    1: 'lg:columns-1',
    2: 'lg:columns-2',
    3: 'lg:columns-3',
    4: 'lg:columns-4',
    5: 'lg:columns-5',
    6: 'lg:columns-6',
    7: 'lg:columns-7',
    8: 'lg:columns-8',
    9: 'lg:columns-9',
    10: 'lg:columns-10',
    11: 'lg:columns-11',
    12: 'lg:columns-12',
  }

  const xlColumnMap: Record<number, string> = {
    1: 'xl:columns-1',
    2: 'xl:columns-2',
    3: 'xl:columns-3',
    4: 'xl:columns-4',
    5: 'xl:columns-5',
    6: 'xl:columns-6',
    7: 'xl:columns-7',
    8: 'xl:columns-8',
    9: 'xl:columns-9',
    10: 'xl:columns-10',
    11: 'xl:columns-11',
    12: 'xl:columns-12',
  }

  const xl2ColumnMap: Record<number, string> = {
    1: '2xl:columns-1',
    2: '2xl:columns-2',
    3: '2xl:columns-3',
    4: '2xl:columns-4',
    5: '2xl:columns-5',
    6: '2xl:columns-6',
    7: '2xl:columns-7',
    8: '2xl:columns-8',
    9: '2xl:columns-9',
    10: '2xl:columns-10',
    11: '2xl:columns-11',
    12: '2xl:columns-12',
  }

  // Convert columns to Tailwind classes
  const getColumnClasses = () => {
    if (typeof columns === 'number') {
      return baseColumnMap[columns] || 'columns-3'
    }

    // Handle responsive columns object
    const classes: string[] = []
    if (columns.xs !== undefined) classes.push(baseColumnMap[columns.xs] || 'columns-3')
    if (columns.sm !== undefined) classes.push(smColumnMap[columns.sm] || 'sm:columns-3')
    if (columns.md !== undefined) classes.push(mdColumnMap[columns.md] || 'md:columns-3')
    if (columns.lg !== undefined) classes.push(lgColumnMap[columns.lg] || 'lg:columns-3')
    if (columns.xl !== undefined) classes.push(xlColumnMap[columns.xl] || 'xl:columns-3')
    if (columns['2xl'] !== undefined) classes.push(xl2ColumnMap[columns['2xl']] || '2xl:columns-3')

    return classes.join(' ')
  }

  const containerClasses = [
    getColumnClasses(),
    getGapClass(),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Wrap children in break-inside-avoid containers
  const wrappedChildren = React.Children.map(children, (child, index) => (
    <div key={index} className="break-inside-avoid mb-4">
      {child}
    </div>
  ))

  return (
    <div className={containerClasses} {...rest}>
      {wrappedChildren}
    </div>
  )
}

Masonry.displayName = 'Masonry'

export default Masonry
