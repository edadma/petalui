import React from 'react'
import { Watermark, Card, Space, Typography } from '@aster-ui/prefixed'
import { Demo } from './Demo'

const { Title, Paragraph, Text } = Typography

const logoSvg = 'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.18" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="88" fill="url(#g)" />
  <text x="100" y="115" text-anchor="middle" font-size="48" font-family="sans-serif" fill="#0f172a" fill-opacity="0.35" font-weight="700">AU</text>
</svg>`)

// @example-imports: { Watermark, Card, Typography } from 'asterui'
export const BasicDemo: React.FC = () => {
  // @example-include
  const { Paragraph } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Watermark
        content="Confidential"
        gap={[140, 120]}
        font={{ fontWeight: 700, color: 'hsl(var(--bc) / 0.28)' }}
      >
        <Card title="Product Brief" className="bg-base-200 min-h-[420px] flex items-center">
          <Paragraph className="text-base-content/80">
            Provide enough spacing and padding on parent containers so the watermark tiles stay visible. The overlay is pointer-events-none, so links and inputs remain usable.
          </Paragraph>
        </Card>
      </Watermark>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Watermark, Typography } from 'asterui'
export const MultilineDemo: React.FC = () => {
  // @example-include
  const { Title } = Typography
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Watermark
        content={["AsterUI", "Internal"]}
        gap={[120, 100]}
        rotate={-30}
        offset={[48, 48]}
        font={{ fontSize: 18, fontWeight: 700, color: 'hsl(var(--bc) / 0.26)' }}
      >
        <div className="bg-base-200 border border-base-300 rounded-box p-6 min-h-[400px] flex flex-col gap-2">
          <Title level={4} className="m-0">Release Checklist</Title>
          <ul className="list-disc list-inside text-sm text-base-content/80 space-y-1">
            <li>Validate components in docs and examples</li>
            <li>Update changelog and version</li>
            <li>Record accessibility notes</li>
          </ul>
        </div>
      </Watermark>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Watermark, Typography } from 'asterui'
export const ImageDemo: React.FC = () => {
  // @example-include
  const { Title, Text } = Typography

  const logoSvg = 'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.18" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="88" fill="url(#g)" />
    <text x="100" y="115" text-anchor="middle" font-size="48" font-family="sans-serif" fill="#0f172a" fill-opacity="0.35" font-weight="700">AU</text>
  </svg>`)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Watermark image={logoSvg} width={160} height={160} gap={[120, 120]} rotate={-25}>
        <div className="bg-base-200 border border-base-300 rounded-box p-6 min-h-[420px]">
          <Title level={4} className="m-0">Image Watermark</Title>
          <Text className="text-sm text-base-content/80 block">
            Supply a data URI or hosted image. Images are drawn to canvas with rotation and gap applied.
          </Text>
        </div>
      </Watermark>
      {/* @example-return-end */}
    </Demo>
  )
}
