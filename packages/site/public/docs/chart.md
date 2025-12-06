# Chart

Data visualization with ApexCharts integration.

**Installation:** `npm install apexcharts`

**Import:** `import { Chart } from 'asterui'`

## Examples

### Line

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

### Multi Line

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

### Bar

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

### Pie

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

### Donut

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

### Area

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

### Radar

```tsx
import React from 'react'
import { Chart } from 'asterui'

const App: React.FC = () => (
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
)

export default App
```

## API

### Chart

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `type` | Chart type | `line' \| 'bar' \| 'pie' \| 'donut' \| 'area' \| 'radar' \| 'radialBar` | `line` |
| `series` | Data series | `ApexAxisChartSeries \| ApexNonAxisChartSeries` | `[]` |
| `options` | ApexCharts options | `ApexOptions` | `{` |
| `height` | Chart height | `number \| string` | `350` |
| `width` | Chart width | `number \| string` | `100%` |
| `className` | Additional CSS classes | `string` | `-` |
