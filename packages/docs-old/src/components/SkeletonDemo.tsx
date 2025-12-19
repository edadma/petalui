import React from 'react'
import { Skeleton, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Skeleton, Space } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton } from 'asterui'
export function CircleDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4">
        <Skeleton circle className="h-12 w-12" />
        <Skeleton circle className="h-16 w-16" />
        <Skeleton circle className="h-20 w-20" />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton, Space } from 'asterui'
export function TextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space size="xs">
        <Skeleton variant="text" className="text-2xl">
          Loading heading...
        </Skeleton>
        <Skeleton variant="text">
          Loading paragraph text that will be replaced with actual content...
        </Skeleton>
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton } from 'asterui'
export function DimensionsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4">
        <Skeleton width={100} height={100} />
        <Skeleton width="200px" height="100px" />
        <Skeleton width="50%" height={100} />
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton, Space } from 'asterui'
export function AvatarTextDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="flex gap-4">
        <Skeleton circle className="h-12 w-12 shrink-0" />
        <Space size="xs" className="flex-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-full" />
        </Space>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton } from 'asterui'
export function CardDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton, Space } from 'asterui'
export function ListDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Space>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton circle className="h-12 w-12 shrink-0" />
            <Space size="xs" className="flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </Space>
          </div>
        ))}
      </Space>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Skeleton } from 'asterui'
export function ComplexDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div className="space-y-6">
        <div className="flex gap-4">
          <Skeleton circle className="h-16 w-16 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
