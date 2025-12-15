import React, { useState } from 'react'
import { OTPInput, Space } from 'asterui'
import { Demo } from './Demo'

export const BasicDemo = () => (
  <Demo>
    {() => {
      const [value, setValue] = useState('')
      return (
        <OTPInput
          value={value}
          onChange={setValue}
          onComplete={(otp) => console.log('Complete:', otp)}
        />
      )
    }}
  </Demo>
)

export const FourDigitDemo = () => (
  <Demo>
    {() => {
      const [value, setValue] = useState('')
      return (
        <OTPInput
          length={4}
          value={value}
          onChange={setValue}
        />
      )
    }}
  </Demo>
)

export const SizesDemo = () => (
  <Demo>
    <Space direction="vertical" size="lg">
      <OTPInput length={4} size="xs" />
      <OTPInput length={4} size="sm" />
      <OTPInput length={4} size="md" />
      <OTPInput length={4} size="lg" />
    </Space>
  </Demo>
)

export const MaskedDemo = () => (
  <Demo>
    {() => {
      const [value, setValue] = useState('')
      return (
        <OTPInput
          value={value}
          onChange={setValue}
          mask
        />
      )
    }}
  </Demo>
)

export const AlphanumericDemo = () => (
  <Demo>
    {() => {
      const [value, setValue] = useState('')
      return (
        <OTPInput
          value={value}
          onChange={setValue}
          type="text"
          length={5}
        />
      )
    }}
  </Demo>
)

export const ErrorDemo = () => (
  <Demo>
    {() => {
      const [value, setValue] = useState('123')
      return (
        <OTPInput
          value={value}
          onChange={setValue}
          error
          length={4}
        />
      )
    }}
  </Demo>
)

export const DisabledDemo = () => (
  <Demo>
    <OTPInput
      value="123456"
      disabled
    />
  </Demo>
)
