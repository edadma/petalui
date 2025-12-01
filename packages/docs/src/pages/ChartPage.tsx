import { Chart, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const chartApi: ApiProperty[] = [
  { property: 'type', description: 'Chart type', type: "'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'heatmap' | 'radar' | ..." },
  { property: 'series', description: 'Chart data series', type: 'ApexAxisChartSeries | ApexNonAxisChartSeries' },
  { property: 'width', description: 'Chart width', type: 'string | number', default: "'100%'" },
  { property: 'height', description: 'Chart height', type: 'string | number', default: '350' },
  { property: 'options', description: 'ApexCharts options (merged with theme defaults)', type: 'ApexOptions' },
  { property: 'themed', description: 'Use daisyUI theme colors', type: 'boolean', default: 'true' },
  { property: 'className', description: 'Additional CSS classes', type: 'string' },
]

const lineSeries = [
  { name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
  { name: 'Revenue', data: [20, 35, 40, 45, 50, 55, 65, 80, 100] },
]

const barSeries = [
  { name: 'Sales', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
]

const pieSeries = [44, 55, 13, 43, 22]

const areaSeries = [
  { name: 'Series 1', data: [31, 40, 28, 51, 42, 109, 100] },
  { name: 'Series 2', data: [11, 32, 45, 32, 34, 52, 41] },
]

const radarSeries = [
  { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
  { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
]

export function ChartPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Chart</h1>
        <p className="text-base-content/70">
          Data visualization powered by ApexCharts with automatic daisyUI theme integration.
        </p>
        <div className="alert alert-info mt-4">
          <span>Requires <code>apexcharts</code> peer dependency: <code>npm install apexcharts</code></span>
        </div>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Line Chart"
          description="Basic line chart with multiple series."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="line"
    height={300}
    series={[
      { name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
      { name: 'Revenue', data: [20, 35, 40, 45, 50, 55, 65, 80, 100] },
    ]}
    options={{
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    }}
  />
)

export default App`}
        >
          <Chart
            type="line"
            height={300}
            series={lineSeries}
            options={{
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              },
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Bar Chart"
          description="Vertical bar chart."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="bar"
    height={300}
    series={[{ name: 'Sales', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }]}
    options={{
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      plotOptions: {
        bar: { borderRadius: 4 },
      },
    }}
  />
)

export default App`}
        >
          <Chart
            type="bar"
            height={300}
            series={barSeries}
            options={{
              xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
              },
              plotOptions: {
                bar: { borderRadius: 4 },
              },
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Area Chart"
          description="Area chart with gradient fill."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="area"
    height={300}
    series={[
      { name: 'Series 1', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Series 2', data: [11, 32, 45, 32, 34, 52, 41] },
    ]}
    options={{
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      stroke: { curve: 'smooth' },
    }}
  />
)

export default App`}
        >
          <Chart
            type="area"
            height={300}
            series={areaSeries}
            options={{
              xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              },
              stroke: { curve: 'smooth' },
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Pie Chart"
          description="Pie chart with labels."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="pie"
    height={300}
    series={[44, 55, 13, 43, 22]}
    options={{
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    }}
  />
)

export default App`}
        >
          <Chart
            type="pie"
            height={300}
            series={pieSeries}
            options={{
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Donut Chart"
          description="Donut variation of pie chart."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="donut"
    height={300}
    series={[44, 55, 13, 43, 22]}
    options={{
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Grape'],
    }}
  />
)

export default App`}
        >
          <Chart
            type="donut"
            height={300}
            series={pieSeries}
            options={{
              labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Grape'],
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Radar Chart"
          description="Radar/spider chart for multivariate data."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="radar"
    height={300}
    series={[
      { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
      { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
    ]}
    options={{
      xaxis: {
        categories: ['Speed', 'Power', 'Defense', 'Stamina', 'Agility', 'Skill'],
      },
    }}
  />
)

export default App`}
        >
          <Chart
            type="radar"
            height={300}
            series={radarSeries}
            options={{
              xaxis: {
                categories: ['Speed', 'Power', 'Defense', 'Stamina', 'Agility', 'Skill'],
              },
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Radial Bar"
          description="Circular progress indicators."
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="radialBar"
    height={300}
    series={[70, 55, 80]}
    options={{
      labels: ['Progress A', 'Progress B', 'Progress C'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: { show: true, label: 'Total' },
          },
        },
      },
    }}
  />
)

export default App`}
        >
          <Chart
            type="radialBar"
            height={300}
            series={[70, 55, 80]}
            options={{
              labels: ['Progress A', 'Progress B', 'Progress C'],
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    total: { show: true, label: 'Total' },
                  },
                },
              },
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Theme Integration"
          description="Charts automatically use daisyUI theme colors. Try switching themes!"
          code={`import React from 'react'
import { Chart } from '@edadma/bloomui'

const App: React.FC = () => (
  <Chart
    type="bar"
    height={250}
    series={[{ data: [21, 22, 10, 28, 16, 21] }]}
    options={{
      xaxis: { categories: ['A', 'B', 'C', 'D', 'E', 'F'] },
      plotOptions: {
        bar: { distributed: true, borderRadius: 4 },
      },
      legend: { show: false },
    }}
  />
)

export default App`}
        >
          <Chart
            type="bar"
            height={250}
            series={[{ data: [21, 22, 10, 28, 16, 21] }]}
            options={{
              xaxis: { categories: ['A', 'B', 'C', 'D', 'E', 'F'] },
              plotOptions: {
                bar: { distributed: true, borderRadius: 4 },
              },
              legend: { show: false },
            }}
          />
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Chart" data={chartApi} />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">ApexCharts Documentation</h3>
          <p className="text-base-content/70">
            For complete chart options and customization, see the{' '}
            <a href="https://apexcharts.com/docs/options/" target="_blank" rel="noopener noreferrer" className="link link-primary">
              ApexCharts documentation
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
