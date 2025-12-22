# OTPInput

One-time password input component for verification codes.

## Import

```tsx
import { OTPInput } from 'asterui'
```

## Basic Usage

```tsx
const [value, setValue] = useState('')

<OTPInput
  value={value}
  onChange={setValue}
  length={6}
/>
```

## Different Lengths

```tsx
<OTPInput length={4} />
<OTPInput length={6} />
<OTPInput length={8} />
```

## With Separator

```tsx
<OTPInput
  length={6}
  separator="-"
  separatorInterval={3}
/>
```

## Masked Input

```tsx
<OTPInput
  length={6}
  mask
/>
```

## Sizes

```tsx
<OTPInput length={6} size="sm" />
<OTPInput length={6} size="md" />
<OTPInput length={6} size="lg" />
```

## Disabled State

```tsx
<OTPInput
  length={6}
  disabled
/>
```

## API

### OTPInput Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Current value | `string` | - |
| onChange | Value change callback | `(value: string) => void` | - |
| length | Number of input fields | `number` | `6` |
| separator | Separator character | `string` | - |
| separatorInterval | Interval for separator | `number` | - |
| mask | Mask input characters | `boolean` | `false` |
| size | Input size | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | Disable input | `boolean` | `false` |
| autoFocus | Auto focus first input | `boolean` | `false` |
| onComplete | Callback when all fields filled | `(value: string) => void` | - |
| data-testid | Test ID prefix for child elements | `string` | - |
| className | Additional CSS classes | `string` | - |

## Accessibility

- Each input field is focusable
- Arrow keys navigate between fields
- Backspace moves to previous field
- Paste support for full OTP codes
- Screen reader announces input position
