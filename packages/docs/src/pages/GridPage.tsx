import { Row, Col, Card, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const rowApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Col components',
    type: 'React.ReactNode',
  },
  {
    property: 'gutter',
    description: 'Grid spacing (in Tailwind spacing units: 4 = 1rem). Can be number or [horizontal, vertical]',
    type: 'number | [number, number]',
    default: '0',
  },
  {
    property: 'justify',
    description: 'Horizontal alignment of grid items',
    type: "'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'",
  },
  {
    property: 'align',
    description: 'Vertical alignment of grid items',
    type: "'start' | 'end' | 'center' | 'stretch' | 'baseline'",
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const colApi: ApiProperty[] = [
  {
    property: 'span',
    description: 'Number of columns to span (1-24)',
    type: 'number',
  },
  {
    property: 'offset',
    description: 'Number of columns to offset from the left',
    type: 'number',
  },
  {
    property: 'order',
    description: 'Display order of the column',
    type: 'number',
  },
  {
    property: 'xs',
    description: 'Column span for mobile (default)',
    type: 'number',
  },
  {
    property: 'sm',
    description: 'Column span for sm breakpoint (640px+)',
    type: 'number',
  },
  {
    property: 'md',
    description: 'Column span for md breakpoint (768px+)',
    type: 'number',
  },
  {
    property: 'lg',
    description: 'Column span for lg breakpoint (1024px+)',
    type: 'number',
  },
  {
    property: 'xl',
    description: 'Column span for xl breakpoint (1280px+)',
    type: 'number',
  },
  {
    property: 'xxl',
    description: 'Column span for 2xl breakpoint (1536px+)',
    type: 'number',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary text-primary-content p-4 rounded text-center">{children}</div>
)

export function GridPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Grid</h1>
        <p className="text-base-content/70">
          Powerful 24-column grid system built on Tailwind CSS Grid with responsive breakpoints.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Grid"
          description="Simple 24-column grid layout."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={[4, 4]}>
    <Col span={24}>col-24</Col>
    <Col span={12}>col-12</Col>
    <Col span={12}>col-12</Col>
    <Col span={8}>col-8</Col>
    <Col span={8}>col-8</Col>
    <Col span={8}>col-8</Col>
  </Row>
)

export default App`}
        >
          <Row gutter={[4, 4]}>
            <Col span={24}>
              <DemoBox>col-24</DemoBox>
            </Col>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={8}>
              <DemoBox>col-8</DemoBox>
            </Col>
            <Col span={8}>
              <DemoBox>col-8</DemoBox>
            </Col>
            <Col span={8}>
              <DemoBox>col-8</DemoBox>
            </Col>
          </Row>
        </ExampleSection>

        <ExampleSection
          title="Gutter"
          description="Add spacing between columns with gutter prop."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={4}>
    <Col span={12}>col-12</Col>
    <Col span={12}>col-12</Col>
    <Col span={16}>col-16</Col>
    <Col span={8}>col-8</Col>
  </Row>
)

export default App`}
        >
          <Row gutter={4}>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={16}>
              <DemoBox>col-16</DemoBox>
            </Col>
            <Col span={8}>
              <DemoBox>col-8</DemoBox>
            </Col>
          </Row>
        </ExampleSection>

        <ExampleSection
          title="Horizontal & Vertical Gutter"
          description="Different horizontal and vertical spacing."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={[4, 8]}>
    <Col span={12}>col-12</Col>
    <Col span={12}>col-12</Col>
    <Col span={12}>col-12</Col>
    <Col span={12}>col-12</Col>
  </Row>
)

export default App`}
        >
          <Row gutter={[4, 8]}>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
            <Col span={12}>
              <DemoBox>col-12</DemoBox>
            </Col>
          </Row>
        </ExampleSection>

        <ExampleSection
          title="Column Offset"
          description="Offset columns from the left."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={4}>
    <Col span={16}>col-16</Col>
    <Col span={16} offset={8}>col-16 offset-8</Col>
    <Col span={12} offset={6}>col-12 offset-6</Col>
    <Col span={8} offset={8}>col-8 offset-8</Col>
  </Row>
)

export default App`}
        >
          <Row gutter={4}>
            <Col span={16}>
              <DemoBox>col-16</DemoBox>
            </Col>
            <Col span={16} offset={8}>
              <DemoBox>col-16 offset-8</DemoBox>
            </Col>
            <Col span={12} offset={6}>
              <DemoBox>col-12 offset-6</DemoBox>
            </Col>
            <Col span={8} offset={8}>
              <DemoBox>col-8 offset-8</DemoBox>
            </Col>
          </Row>
        </ExampleSection>

        <ExampleSection
          title="Responsive Grid"
          description="Different column spans at different breakpoints."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={4}>
    <Col xs={24} sm={12} md={8} lg={6}>
      Responsive Column
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      Responsive Column
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      Responsive Column
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      Responsive Column
    </Col>
  </Row>
)

export default App`}
        >
          <Row gutter={4}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DemoBox>xs:24 sm:12 md:8 lg:6</DemoBox>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DemoBox>xs:24 sm:12 md:8 lg:6</DemoBox>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DemoBox>xs:24 sm:12 md:8 lg:6</DemoBox>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <DemoBox>xs:24 sm:12 md:8 lg:6</DemoBox>
            </Col>
          </Row>
        </ExampleSection>

        <ExampleSection
          title="Alignment"
          description="Align grid items horizontally and vertically."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <>
    <Row gutter={4} justify="start">
      <Col span={8}>Left</Col>
      <Col span={8}>Left</Col>
    </Row>
    <Row gutter={4} justify="center">
      <Col span={8}>Center</Col>
      <Col span={8}>Center</Col>
    </Row>
    <Row gutter={4} justify="end">
      <Col span={8}>Right</Col>
      <Col span={8}>Right</Col>
    </Row>
  </>
)

export default App`}
        >
          <div className="space-y-2">
            <Row gutter={4} justify="start">
              <Col span={8}>
                <DemoBox>Left</DemoBox>
              </Col>
              <Col span={8}>
                <DemoBox>Left</DemoBox>
              </Col>
            </Row>
            <Row gutter={4} justify="center">
              <Col span={8}>
                <DemoBox>Center</DemoBox>
              </Col>
              <Col span={8}>
                <DemoBox>Center</DemoBox>
              </Col>
            </Row>
            <Row gutter={4} justify="end">
              <Col span={8}>
                <DemoBox>Right</DemoBox>
              </Col>
              <Col span={8}>
                <DemoBox>Right</DemoBox>
              </Col>
            </Row>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Order"
          description="Change the display order of columns."
          code={`import React from 'react'
import { Row, Col } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={4}>
    <Col span={12} order={4}>1 (order-4)</Col>
    <Col span={12} order={3}>2 (order-3)</Col>
    <Col span={12} order={2}>3 (order-2)</Col>
    <Col span={12} order={1}>4 (order-1)</Col>
  </Row>
)

export default App`}
        >
          <Row gutter={4}>
            <Col span={12} order={4}>
              <DemoBox>1 (order-4)</DemoBox>
            </Col>
            <Col span={12} order={3}>
              <DemoBox>2 (order-3)</DemoBox>
            </Col>
            <Col span={12} order={2}>
              <DemoBox>3 (order-2)</DemoBox>
            </Col>
            <Col span={12} order={1}>
              <DemoBox>4 (order-1)</DemoBox>
            </Col>
          </Row>
        </ExampleSection>

        <ExampleSection
          title="Nested Grid"
          description="Grids can be nested inside columns."
          code={`import React from 'react'
import { Row, Col, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <Row gutter={4}>
    <Col span={24}>
      <Card className="bg-base-200">
        Level 1
        <Row gutter={4} className="mt-4">
          <Col span={12}>Level 2</Col>
          <Col span={12}>Level 2</Col>
        </Row>
      </Card>
    </Col>
    <Col span={12}>
      <Card className="bg-base-200">Column</Card>
    </Col>
    <Col span={12}>
      <Card className="bg-base-200">Column</Card>
    </Col>
  </Row>
)

export default App`}
        >
          <Row gutter={4}>
            <Col span={24}>
              <Card className="bg-base-200">
                <div className="font-bold mb-2">Level 1</div>
                <Row gutter={4}>
                  <Col span={12}>
                    <DemoBox>Level 2</DemoBox>
                  </Col>
                  <Col span={12}>
                    <DemoBox>Level 2</DemoBox>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="bg-base-200 p-4">Column</Card>
            </Col>
            <Col span={12}>
              <Card className="bg-base-200 p-4">Column</Card>
            </Col>
          </Row>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Row" data={rowApi} />

        <ApiTable title="Col" data={colApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Grid uses a flexible 24-column layout</li>
              <li>Gutter values use Tailwind spacing scale (4 = 1rem, 8 = 2rem, etc.)</li>
              <li>Responsive props: xs (default), sm (640px+), md (768px+), lg (1024px+), xl (1280px+), xxl (1536px+)</li>
              <li>Use offset to create gaps between columns</li>
              <li>Use order to reorder columns without changing markup</li>
              <li>Columns can be nested for complex layouts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
