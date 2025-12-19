import { Row, Col, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Row, Col } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Row>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
      </Row>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Row, Col } from 'asterui'
export function GutterDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Row gutter={32}>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            col-6
          </div>
        </Col>
      </Row>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Row, Col, Space } from 'asterui'
export function OffsetDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space direction="vertical" size="md" className="w-full">
        <Row>
          <Col span={8}>
            <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
              col-8
            </div>
          </Col>
          <Col span={8} offset={8}>
            <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
              col-8 offset-8
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
              col-6 offset-6
            </div>
          </Col>
          <Col span={6} offset={6}>
            <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
              col-6 offset-6
            </div>
          </Col>
        </Row>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Row, Col } from 'asterui'
export function ResponsiveDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            Responsive
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            Responsive
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            Responsive
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            Responsive
          </div>
        </Col>
      </Row>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Row, Col } from 'asterui'
export function Cols120Demo() {
  return (
    <Demo>
      {/* @example-return */}
      <Row cols={120} gutter={8}>
        <Col span={30}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            30/120
          </div>
        </Col>
        <Col span={45}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            45/120
          </div>
        </Col>
        <Col span={45}>
          <div style={{ background: '#0092ff', padding: '16px', color: 'white' }}>
            45/120
          </div>
        </Col>
      </Row>
      {/* @example-return-end */}
    </Demo>
  )
}
