import React, { forwardRef, useId, useEffect, useState } from 'react'

export type DescriptionsSize = 'sm' | 'md' | 'lg'
export type DescriptionsLayout = 'horizontal' | 'vertical'

export interface DescriptionsItemProps {
  /** Unique key for the item */
  itemKey?: string
  /** Label for the item */
  label?: React.ReactNode
  /** Number of columns to span, or 'filled' to fill remaining space */
  span?: number | 'filled'
  /** Content of the item */
  children?: React.ReactNode
  /** Custom label styles */
  labelStyle?: React.CSSProperties
  /** Custom content styles */
  contentStyle?: React.CSSProperties
  /** Custom label class */
  labelClassName?: string
  /** Custom content class */
  contentClassName?: string
}

/** Item configuration for the items prop */
export interface DescriptionsItemConfig {
  /** Unique key for the item (used for test IDs and React keys) */
  key?: string
  /** Label for the item */
  label: React.ReactNode
  /** Content of the item */
  children: React.ReactNode
  /** Number of columns to span, or 'filled' to fill remaining space */
  span?: number | 'filled'
  /** Custom label styles */
  labelStyle?: React.CSSProperties
  /** Custom content styles */
  contentStyle?: React.CSSProperties
  /** Custom label class */
  labelClassName?: string
  /** Custom content class */
  contentClassName?: string
}

/** Semantic DOM structure for styles/classNames */
export type DescriptionsSemanticDOM = 'root' | 'header' | 'title' | 'extra' | 'table' | 'label' | 'content'

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title of the descriptions block */
  title?: React.ReactNode
  /** Extra content in the top-right corner */
  extra?: React.ReactNode
  /** Show borders around cells */
  bordered?: boolean
  /** Number of columns (or responsive config) */
  column?: number | {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  /** Size variant */
  size?: DescriptionsSize
  /** Layout direction */
  layout?: DescriptionsLayout
  /** Show colon after labels */
  colon?: boolean
  /** Default label styles (deprecated, use styles.label) */
  labelStyle?: React.CSSProperties
  /** Default content styles (deprecated, use styles.content) */
  contentStyle?: React.CSSProperties
  /** Semantic styles for component parts */
  styles?: Partial<Record<DescriptionsSemanticDOM, React.CSSProperties>>
  /** Semantic classNames for component parts */
  classNames?: Partial<Record<DescriptionsSemanticDOM, string>>
  /** Item configurations (alternative to children) */
  items?: DescriptionsItemConfig[]
  /** Children (Descriptions.Item elements) */
  children?: React.ReactNode
  /** Test ID for the component */
  'data-testid'?: string
}

function DescriptionsItem(_props: DescriptionsItemProps) {
  // This component is used for the compound pattern
  // The parent Descriptions component extracts props from children
  return null
}

const sizeClasses: Record<DescriptionsSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

// Breakpoint values in pixels (matches Tailwind defaults)
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

type BreakpointKey = keyof typeof breakpoints

function useResponsiveColumn(
  column: number | Partial<Record<BreakpointKey, number>>
): number {
  const [columnCount, setColumnCount] = useState(() => {
    if (typeof column === 'number') return column
    // SSR fallback: use md or first available
    return column.md ?? column.sm ?? column.xs ?? 3
  })

  useEffect(() => {
    if (typeof column === 'number') {
      setColumnCount(column)
      return
    }

    const updateColumns = () => {
      const width = window.innerWidth
      const sortedBreakpoints = (Object.keys(breakpoints) as BreakpointKey[])
        .filter((key) => column[key] !== undefined)
        .sort((a, b) => breakpoints[b] - breakpoints[a])

      for (const bp of sortedBreakpoints) {
        if (width >= breakpoints[bp]) {
          setColumnCount(column[bp]!)
          return
        }
      }
      // Fallback to smallest defined or 3
      const smallest = sortedBreakpoints[sortedBreakpoints.length - 1]
      setColumnCount(smallest ? column[smallest]! : 3)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [column])

  return columnCount
}

/** Internal item config with resolved key */
interface InternalItemConfig extends DescriptionsItemConfig {
  _key: string
  _index: number
}

const DescriptionsRoot = forwardRef<HTMLDivElement, DescriptionsProps>(
  (
    {
      title,
      extra,
      bordered = false,
      column = 3,
      size = 'md',
      layout = 'horizontal',
      colon = true,
      labelStyle,
      contentStyle,
      styles,
      classNames,
      items: itemsProp,
      className = '',
      style,
      children,
      'data-testid': testId = 'descriptions',
      ...rest
    },
    ref
  ) => {
    const baseId = useId()
    const columnCount = useResponsiveColumn(column)

    // Merge deprecated props with styles prop
    const mergedLabelStyle = { ...labelStyle, ...styles?.label }
    const mergedContentStyle = { ...contentStyle, ...styles?.content }

    // Convert children to item configs, or use items prop
    const itemConfigs: InternalItemConfig[] = (
      itemsProp
        ? itemsProp
        : React.Children.toArray(children)
            .filter((child): child is React.ReactElement<DescriptionsItemProps> =>
              React.isValidElement(child)
            )
            .map((child) => ({
              key: child.props.itemKey ?? child.key?.toString().replace(/^\.\$/, ''),
              label: child.props.label,
              children: child.props.children,
              span: child.props.span,
              labelStyle: child.props.labelStyle,
              contentStyle: child.props.contentStyle,
              labelClassName: child.props.labelClassName,
              contentClassName: child.props.contentClassName,
            }))
    ).map((item, index) => ({
      ...item,
      _key: item.key ?? `item-${index}`,
      _index: index,
    }))

    // Calculate rows with 'filled' span support
    const calculateRows = (): InternalItemConfig[][] => {
      const rows: InternalItemConfig[][] = []
      let currentRow: InternalItemConfig[] = []
      let currentSpan = 0

      itemConfigs.forEach((item) => {
        if (item.span === 'filled') {
          // 'filled' means fill the rest of the row
          if (currentRow.length > 0) {
            currentRow.push({ ...item, span: columnCount - currentSpan })
            rows.push(currentRow)
            currentRow = []
            currentSpan = 0
          } else {
            // First item in row with 'filled' takes whole row
            rows.push([{ ...item, span: columnCount }])
          }
        } else {
          const span = item.span ?? 1
          const effectiveSpan = Math.min(span, columnCount)

          if (currentSpan + effectiveSpan > columnCount) {
            rows.push(currentRow)
            currentRow = [item]
            currentSpan = effectiveSpan
          } else {
            currentRow.push(item)
            currentSpan += effectiveSpan
          }
        }
      })

      if (currentRow.length > 0) {
        rows.push(currentRow)
      }

      return rows
    }

    const rows = calculateRows()

    const getLabelClasses = (item: InternalItemConfig) => {
      return [
        bordered ? 'border border-base-content/10' : '',
        'bg-base-200/50 font-semibold text-base-content/70 text-left px-4 py-2',
        layout === 'horizontal' ? 'whitespace-nowrap' : '',
        classNames?.label ?? '',
        item.labelClassName ?? '',
      ].filter(Boolean).join(' ')
    }

    const getContentClasses = (item: InternalItemConfig) => {
      return [
        bordered ? 'border border-base-content/10' : '',
        'bg-base-100 text-base-content px-4 py-2',
        classNames?.content ?? '',
        item.contentClassName ?? '',
      ].filter(Boolean).join(' ')
    }

    const getLabelStyle = (item: InternalItemConfig): React.CSSProperties => ({
      ...mergedLabelStyle,
      ...item.labelStyle,
    })

    const getContentStyle = (item: InternalItemConfig): React.CSSProperties => ({
      ...mergedContentStyle,
      ...item.contentStyle,
    })

    const renderVerticalLayout = () => {
      return rows.map((row, rowIndex) => (
        <React.Fragment key={row.map(r => r._key).join('-')}>
          <tr data-testid={`${testId}-row-${rowIndex}-labels`}>
            {row.map((item) => {
              const span = typeof item.span === 'number' ? item.span : 1
              const effectiveSpan = Math.min(span, columnCount)
              const labelId = `${baseId}-${item._key}-label`

              return (
                <th
                  key={item._key}
                  id={labelId}
                  className={getLabelClasses(item)}
                  style={getLabelStyle(item)}
                  colSpan={effectiveSpan}
                  scope="col"
                  data-testid={`${testId}-${item._key}-label`}
                >
                  {item.label}
                  {colon && item.label && <span aria-hidden="true">:</span>}
                </th>
              )
            })}
          </tr>
          <tr data-testid={`${testId}-row-${rowIndex}-values`}>
            {row.map((item) => {
              const span = typeof item.span === 'number' ? item.span : 1
              const effectiveSpan = Math.min(span, columnCount)
              const labelId = `${baseId}-${item._key}-label`

              return (
                <td
                  key={item._key}
                  className={getContentClasses(item)}
                  style={getContentStyle(item)}
                  colSpan={effectiveSpan}
                  aria-labelledby={labelId}
                  data-testid={`${testId}-${item._key}-content`}
                >
                  {item.children}
                </td>
              )
            })}
          </tr>
        </React.Fragment>
      ))
    }

    const renderHorizontalLayout = () => {
      return rows.map((row, rowIndex) => (
        <tr key={row.map(r => r._key).join('-')} data-testid={`${testId}-row-${rowIndex}`}>
          {row.map((item) => {
            const span = typeof item.span === 'number' ? item.span : 1
            const effectiveSpan = Math.min(span, columnCount)
            const labelId = `${baseId}-${item._key}-label`

            return (
              <React.Fragment key={item._key}>
                <th
                  id={labelId}
                  className={getLabelClasses(item)}
                  style={getLabelStyle(item)}
                  scope="row"
                  data-testid={`${testId}-${item._key}-label`}
                >
                  {item.label}
                  {colon && item.label && <span aria-hidden="true">:</span>}
                </th>
                <td
                  className={getContentClasses(item)}
                  style={getContentStyle(item)}
                  colSpan={effectiveSpan > 1 ? effectiveSpan * 2 - 1 : 1}
                  aria-labelledby={labelId}
                  data-testid={`${testId}-${item._key}-content`}
                >
                  {item.children}
                </td>
              </React.Fragment>
            )
          })}
        </tr>
      ))
    }

    const containerClasses = [
      'w-full',
      bordered && 'border-collapse',
      sizeClasses[size],
      classNames?.table ?? '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const rootClasses = [classNames?.root ?? ''].filter(Boolean).join(' ')

    return (
      <div
        ref={ref}
        className={rootClasses || undefined}
        style={{ ...styles?.root, ...style }}
        data-testid={testId}
        {...rest}
      >
        {(title || extra) && (
          <div
            className={`flex items-center justify-between mb-4 ${classNames?.header ?? ''}`}
            style={styles?.header}
            data-testid={`${testId}-header`}
          >
            {title && (
              <div
                className={`text-lg font-semibold ${classNames?.title ?? ''}`}
                style={styles?.title}
                data-testid={`${testId}-title`}
              >
                {title}
              </div>
            )}
            {extra && (
              <div
                className={classNames?.extra ?? ''}
                style={styles?.extra}
                data-testid={`${testId}-extra`}
              >
                {extra}
              </div>
            )}
          </div>
        )}
        <table
          className={containerClasses}
          style={styles?.table}
          data-testid={`${testId}-table`}
        >
          {title && (
            <caption className="sr-only">
              {typeof title === 'string' ? title : 'Description list'}
            </caption>
          )}
          <tbody>
            {layout === 'vertical' ? renderVerticalLayout() : renderHorizontalLayout()}
          </tbody>
        </table>
      </div>
    )
  }
)

DescriptionsRoot.displayName = 'Descriptions'

export const Descriptions = Object.assign(DescriptionsRoot, {
  Item: DescriptionsItem,
})

export default Descriptions
