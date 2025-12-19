import React, { useState } from 'react'
import { OTPInput, Space } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { OTPInput } from 'asterui'
// @example-imports: { useState } from 'react'
export const BasicDemo = () => (
  <Demo>
    {() => {
      // @example-include
      const [value, setValue] = useState('')
      // @example-include-end

      return (
        <>
          {/* @example-return */}
          <OTPInput
            value={value}
            onChange={setValue}
            onComplete={(otp) => console.log('Complete:', otp)}
          />
          {/* @example-return-end */}
        </>
      )
    }}
  </Demo>
)

// @example-imports: { OTPInput } from 'asterui'
// @example-imports: { useState } from 'react'
export const FourDigitDemo = () => (
  <Demo>
    {() => {
      // @example-include
      const [value, setValue] = useState('')
      // @example-include-end

      return (
        <>
          {/* @example-return */}
          <OTPInput
            length={4}
            value={value}
            onChange={setValue}
          />
          {/* @example-return-end */}
        </>
      )
    }}
  </Demo>
)

// @example-imports: { OTPInput, Space } from 'asterui'
export const SizesDemo = () => (
  <Demo>
    {/* @example-return */}
    <Space direction="vertical" size="lg">
      <OTPInput length={4} size="xs" />
      <OTPInput length={4} size="sm" />
      <OTPInput length={4} size="md" />
      <OTPInput length={4} size="lg" />
    </Space>
    {/* @example-return-end */}
  </Demo>
)

// @example-imports: { OTPInput } from 'asterui'
// @example-imports: { useState } from 'react'
export const MaskedDemo = () => (
  <Demo>
    {() => {
      // @example-include
      const [value, setValue] = useState('')
      // @example-include-end

      return (
        <>
          {/* @example-return */}
          <OTPInput
            value={value}
            onChange={setValue}
            mask
          />
          {/* @example-return-end */}
        </>
      )
    }}
  </Demo>
)

// @example-imports: { OTPInput } from 'asterui'
// @example-imports: { useState } from 'react'
export const AlphanumericDemo = () => (
  <Demo>
    {() => {
      // @example-include
      const [value, setValue] = useState('')
      // @example-include-end

      return (
        <>
          {/* @example-return */}
          <OTPInput
            value={value}
            onChange={setValue}
            type="text"
            length={5}
          />
          {/* @example-return-end */}
        </>
      )
    }}
  </Demo>
)

// @example-imports: { OTPInput } from 'asterui'
// @example-imports: { useState } from 'react'
export const ErrorDemo = () => (
  <Demo>
    {() => {
      // @example-include
      const [value, setValue] = useState('123')
      // @example-include-end

      return (
        <>
          {/* @example-return */}
          <OTPInput
            value={value}
            onChange={setValue}
            error
            length={4}
          />
          {/* @example-return-end */}
        </>
      )
    }}
  </Demo>
)

// @example-imports: { OTPInput } from 'asterui'
export const DisabledDemo = () => (
  <Demo>
    {/* @example-return */}
    <OTPInput
      value="123456"
      disabled
    />
    {/* @example-return-end */}
  </Demo>
)
