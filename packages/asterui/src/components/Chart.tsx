import React, { useEffect, useRef, useState } from 'react'
import ApexCharts from 'apexcharts'
import type { ApexOptions } from 'apexcharts'

export interface ChartProps {
  /** Chart type */
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap'
  /** Chart series data */
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  /** Chart width */
  width?: string | number
  /** Chart height */
  height?: string | number
  /** ApexCharts options (merged with theme defaults) */
  options?: ApexOptions
  /** Use daisyUI theme colors */
  themed?: boolean
  /** Additional CSS classes */
  className?: string
}

// Get CSS variable value from root
function getCssVar(varName: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

// Convert oklch to hex (approximate)
function oklchToHex(oklch: string): string {
  // Parse oklch(L C H) format
  const match = oklch.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/)
  if (!match) return ''

  const l = parseFloat(match[1]) / 100 // Lightness 0-1
  const c = parseFloat(match[2]) // Chroma
  const h = parseFloat(match[3]) // Hue in degrees

  // Simplified oklch to sRGB conversion
  // This is an approximation - full conversion is complex
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  // Approximate conversion to linear RGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b

  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_

  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3

  // Clamp and convert to sRGB
  const toSrgb = (x: number) => {
    x = Math.max(0, Math.min(1, x))
    return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1/2.4) - 0.055
  }

  r = Math.round(toSrgb(r) * 255)
  g = Math.round(toSrgb(g) * 255)
  bl = Math.round(toSrgb(bl) * 255)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`
}

// Get daisyUI theme colors from CSS variables
function getThemeColors(): string[] {
  if (typeof document === 'undefined') return []

  const colorVars = [
    '--color-primary',
    '--color-secondary',
    '--color-accent',
    '--color-info',
    '--color-success',
    '--color-warning',
    '--color-error',
  ]

  return colorVars
    .map(varName => {
      const value = getCssVar(varName)
      if (value.includes('oklch')) {
        return oklchToHex(value)
      }
      return value
    })
    .filter(Boolean)
}

// Get theme-aware chart options
function getThemedOptions(): Partial<ApexOptions> {
  const colors = getThemeColors()

  // Get text color from CSS variable
  const baseContentVar = getCssVar('--color-base-content')
  const textColor = baseContentVar.includes('oklch')
    ? oklchToHex(baseContentVar)
    : (baseContentVar || '#888888')

  // Get grid color from CSS variable
  const base300Var = getCssVar('--color-base-300')
  const gridColor = base300Var.includes('oklch')
    ? oklchToHex(base300Var)
    : (base300Var || '#e0e0e0')

  // Determine if dark theme by checking luminance of text color
  // If text is light, we're on dark theme
  const textMatch = textColor.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  const isDark = textMatch
    ? (parseInt(textMatch[1], 16) + parseInt(textMatch[2], 16) + parseInt(textMatch[3], 16)) / 3 > 128
    : false

  return {
    colors: colors.length > 0 ? colors : undefined,
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    chart: {
      background: 'transparent',
      foreColor: textColor,
    },
    grid: {
      borderColor: gridColor,
    },
    xaxis: {
      labels: {
        style: {
          colors: textColor,
        },
      },
      axisBorder: {
        color: gridColor,
      },
      axisTicks: {
        color: gridColor,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: textColor,
        },
      },
    },
    legend: {
      labels: {
        colors: textColor,
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      style: {
        fontSize: '12px',
      },
      x: {
        show: true,
      },
      marker: {
        show: true,
      },
    },
    dataLabels: {
      style: {
        colors: [textColor, textColor, textColor, textColor, textColor, textColor, textColor],
      },
      background: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
      },
    },
  }
}

// Deep merge objects
function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        target[key] !== null &&
        !Array.isArray(target[key])
      ) {
        result[key] = deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        ) as T[Extract<keyof T, string>]
      } else {
        result[key] = source[key] as T[Extract<keyof T, string>]
      }
    }
  }

  return result
}

export const Chart: React.FC<ChartProps> = ({
  type,
  series,
  width = '100%',
  height = 350,
  options = {},
  themed = true,
  className = '',
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<ApexCharts | null>(null)
  const [, setMounted] = useState(false)

  // Build final options
  const buildOptions = (): ApexOptions => {
    const baseOptions: ApexOptions = {
      chart: {
        type,
        width,
        height,
      },
      series,
    }

    if (themed) {
      const themedOpts = getThemedOptions()
      return deepMerge(deepMerge(baseOptions as unknown as Record<string, unknown>, themedOpts as unknown as Record<string, unknown>), options as unknown as Record<string, unknown>) as ApexOptions
    }

    return deepMerge(baseOptions as unknown as Record<string, unknown>, options as unknown as Record<string, unknown>) as ApexOptions
  }

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current) return

    const opts = buildOptions()
    chartInstance.current = new ApexCharts(chartRef.current, opts)
    chartInstance.current.render()
    setMounted(true)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update chart when props change
  useEffect(() => {
    if (!chartInstance.current) return

    const opts = buildOptions()
    chartInstance.current.updateOptions(opts, true, true)
  }, [type, series, width, height, options, themed]) // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for theme changes
  useEffect(() => {
    if (!themed || typeof window === 'undefined') return

    const observer = new MutationObserver(() => {
      if (chartInstance.current) {
        const opts = buildOptions()
        chartInstance.current.updateOptions(opts, true, true)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    return () => observer.disconnect()
  }, [themed]) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={chartRef} className={className} />
}
