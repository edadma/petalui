import { useState, useEffect, memo } from 'react'
import { Demo } from './Demo'

// Singleton: load Chart component once, share across all instances
let cachedChart: React.ComponentType<any> | null = null
let loadPromise: Promise<void> | null = null

const Chart = memo((props: any) => {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (cachedChart) return

    if (!loadPromise) {
      loadPromise = import('@aster-ui/prefixed/chart').then(m => {
        cachedChart = m.Chart
      })
    }

    loadPromise.then(() => forceUpdate(n => n + 1))
  }, [])

  if (!cachedChart) {
    return <div style={{ height: props.height || 350 }} className="animate-pulse bg-base-300/50 rounded" />
  }

  const LoadedChart = cachedChart
  return <LoadedChart {...props} />
})

// @example-imports: { Chart } from 'asterui/chart'
export function LineDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="line"
        height={300}
        series={[
          {
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          },
        ]}
        options={{
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function MultiLineDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="line"
        height={300}
        series={[
          {
            name: 'Revenue',
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
          {
            name: 'Expenses',
            data: [20, 35, 40, 35, 40, 55, 60, 75],
          },
        ]}
        options={{
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          },
          stroke: {
            curve: 'smooth',
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function BarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="bar"
        height={300}
        series={[
          {
            name: 'Sales',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
        ]}
        options={{
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
            },
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function StackedBarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="bar"
        height={300}
        series={[
          { name: 'Product A', data: [44, 55, 41, 67, 22, 43] },
          { name: 'Product B', data: [13, 23, 20, 8, 13, 27] },
          { name: 'Product C', data: [11, 17, 15, 15, 21, 14] },
        ]}
        options={{
          chart: { stacked: true },
          xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'] },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function PieDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="pie"
        height={350}
        series={[44, 55, 13, 43, 22]}
        options={{
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          legend: {
            position: 'bottom',
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function DonutDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="donut"
        height={350}
        series={[44, 55, 41, 17, 15]}
        options={{
          labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Grapes'],
          legend: {
            position: 'bottom',
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                  },
                },
              },
            },
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function AreaDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="area"
        height={300}
        series={[
          {
            name: 'Series 1',
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: 'Series 2',
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ]}
        options={{
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          stroke: {
            curve: 'smooth',
          },
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.1,
            },
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function RadarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="radar"
        height={350}
        series={[
          {
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
          },
          {
            name: 'Series 2',
            data: [20, 30, 40, 80, 20, 80],
          },
        ]}
        options={{
          xaxis: {
            categories: ['Speed', 'Power', 'Agility', 'Endurance', 'Accuracy', 'Stealth'],
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Chart } from 'asterui/chart'
export function RadialBarDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Chart
        type="radialBar"
        height={350}
        series={[76, 67, 61, 90]}
        options={{
          labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
          plotOptions: {
            radialBar: {
              dataLabels: {
                total: {
                  show: true,
                  label: 'Total',
                },
              },
            },
          },
        }}
      />
      {/* @example-return-end */}
    </Demo>
  )
}
