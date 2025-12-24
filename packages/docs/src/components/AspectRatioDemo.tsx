import React from 'react'
import { AspectRatio, Card, Image, Space, Typography } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { AspectRatio, Image } from 'asterui'
export function WidescreenDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <AspectRatio ratio={16 / 9} className="max-w-xl">
        <Image
          src="/valley.png"
          alt="Widescreen landscape"
          width="100%"
          height="100%"
          preview={false}
          className="w-full h-full object-cover rounded-box"
        />
      </AspectRatio>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { AspectRatio, Card, Space, Typography } from 'asterui'
export function SquareCardDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <AspectRatio ratio={1} className="max-w-sm">
        <Card className="h-full w-full" bodyClassName="h-full flex flex-col justify-between">
          <Space direction="vertical">
            <Typography.Title level={5}>Square Tile</Typography.Title>
            <Typography.Text className="text-sm" type="secondary">Keep cards consistent in grid layouts.</Typography.Text>
          </Space>
          <Typography.Text className="text-sm" type="secondary">1:1 aspect ratio</Typography.Text>
        </Card>
      </AspectRatio>
      {/* @example-return-end */}
    </Demo>
  )
}
