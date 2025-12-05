import React, { useEffect, useState, useCallback } from 'react'

export interface CountdownProps {
  /** Target timestamp in milliseconds or Date object */
  value: number | Date
  /** Format string: 'D' days, 'H' hours, 'M' minutes, 'S' seconds */
  format?: string
  /** Callback when countdown reaches zero */
  onFinish?: () => void
  /** Callback on each tick with remaining time */
  onChange?: (value: number) => void
  /** Additional CSS classes */
  className?: string
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Show labels under each unit */
  showLabels?: boolean
  /** Custom labels */
  labels?: {
    days?: string
    hours?: string
    minutes?: string
    seconds?: string
  }
  /** Show box style around each unit */
  boxed?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (targetTime: number): TimeLeft => {
  const difference = targetTime - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

const CountdownUnit: React.FC<{
  value: number
  label?: string
  size?: CountdownProps['size']
  showLabel?: boolean
  boxed?: boolean
}> = ({ value, label, size, showLabel, boxed }) => {
  const sizeClasses = {
    xs: 'text-lg',
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
  }

  const content = (
    <span className={`countdown font-mono ${sizeClasses[size || 'md']}`}>
      <span
        style={{ '--value': value, '--digits': 2 } as React.CSSProperties}
        aria-live="polite"
        aria-label={String(value)}
      >
        {String(value).padStart(2, '0')}
      </span>
    </span>
  )

  if (boxed) {
    return (
      <div className="flex flex-col items-center bg-neutral text-neutral-content rounded-box p-2">
        {content}
        {showLabel && label && <span className="text-xs mt-1">{label}</span>}
      </div>
    )
  }

  if (showLabel) {
    return (
      <div className="flex flex-col items-center">
        {content}
        {label && <span className="text-xs text-base-content/70">{label}</span>}
      </div>
    )
  }

  return content
}

export const Countdown: React.FC<CountdownProps> = ({
  value,
  format = 'HH:MM:SS',
  onFinish,
  onChange,
  className = '',
  size = 'md',
  showLabels = false,
  labels = {},
  boxed = false,
}) => {
  const targetTime = value instanceof Date ? value.getTime() : value
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetTime))
  const [finished, setFinished] = useState(false)

  const defaultLabels = {
    days: labels.days || 'days',
    hours: labels.hours || 'hours',
    minutes: labels.minutes || 'min',
    seconds: labels.seconds || 'sec',
  }

  const tick = useCallback(() => {
    const newTimeLeft = calculateTimeLeft(targetTime)
    setTimeLeft(newTimeLeft)

    const remaining = targetTime - Date.now()
    onChange?.(Math.max(0, remaining))

    if (remaining <= 0 && !finished) {
      setFinished(true)
      onFinish?.()
    }
  }, [targetTime, onChange, onFinish, finished])

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    tick() // Initial tick

    return () => clearInterval(timer)
  }, [tick])

  const showDays = format.includes('D')
  const showHours = format.includes('H')
  const showMinutes = format.includes('M')
  const showSeconds = format.includes('S')

  const separatorSize = size === 'lg' || size === 'xl' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl'
  const showSeparators = !showLabels && !boxed

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {showDays && (
        <>
          <CountdownUnit
            value={timeLeft.days}
            label={defaultLabels.days}
            size={size}
            showLabel={showLabels}
            boxed={boxed}
          />
          {showSeparators && (showHours || showMinutes || showSeconds) && (
            <span className={separatorSize}>:</span>
          )}
        </>
      )}
      {showHours && (
        <>
          <CountdownUnit
            value={timeLeft.hours}
            label={defaultLabels.hours}
            size={size}
            showLabel={showLabels}
            boxed={boxed}
          />
          {showSeparators && (showMinutes || showSeconds) && (
            <span className={separatorSize}>:</span>
          )}
        </>
      )}
      {showMinutes && (
        <>
          <CountdownUnit
            value={timeLeft.minutes}
            label={defaultLabels.minutes}
            size={size}
            showLabel={showLabels}
            boxed={boxed}
          />
          {showSeparators && showSeconds && <span className={separatorSize}>:</span>}
        </>
      )}
      {showSeconds && (
        <CountdownUnit
          value={timeLeft.seconds}
          label={defaultLabels.seconds}
          size={size}
          showLabel={showLabels}
          boxed={boxed}
        />
      )}
    </div>
  )
}

Countdown.displayName = 'Countdown'
