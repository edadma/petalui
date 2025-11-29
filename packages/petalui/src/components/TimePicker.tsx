import React, { useState, useRef, useEffect } from 'react'
import { Input } from './Input'

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  format?: '12' | '24'
  placeholder?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showSeconds?: boolean
}

function formatTime(date: Date | null, format: '12' | '24' = '24', showSeconds: boolean = false): string {
  if (!date) return ''

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  if (format === '12') {
    const period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    const timeStr = showSeconds
      ? `${hours}:${minutes}:${seconds} ${period}`
      : `${hours}:${minutes} ${period}`
    return timeStr
  }

  const hoursStr = String(hours).padStart(2, '0')
  return showSeconds ? `${hoursStr}:${minutes}:${seconds}` : `${hoursStr}:${minutes}`
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue,
  onChange,
  format = '24',
  placeholder = 'Select time',
  disabled = false,
  className = '',
  size = 'md',
  showSeconds = false,
  ...rest
}) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    value || defaultValue || null
  )
  const [isOpen, setIsOpen] = useState(false)
  const [hours, setHours] = useState(selectedTime ? selectedTime.getHours() : 0)
  const [minutes, setMinutes] = useState(selectedTime ? selectedTime.getMinutes() : 0)
  const [seconds, setSeconds] = useState(selectedTime ? selectedTime.getSeconds() : 0)
  const [period, setPeriod] = useState<'AM' | 'PM'>(
    selectedTime && selectedTime.getHours() >= 12 ? 'PM' : 'AM'
  )

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value)
      if (value) {
        setHours(value.getHours())
        setMinutes(value.getMinutes())
        setSeconds(value.getSeconds())
        setPeriod(value.getHours() >= 12 ? 'PM' : 'AM')
      }
    }
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleTimeChange = (newHours: number, newMinutes: number, newSeconds: number) => {
    const now = new Date()
    const newTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      newHours,
      newMinutes,
      newSeconds
    )
    setSelectedTime(newTime)
    onChange?.(newTime)
  }

  const handleHourChange = (newHour: number) => {
    let actualHour = newHour
    if (format === '12') {
      actualHour = period === 'PM' ? (newHour % 12) + 12 : newHour % 12
    }
    setHours(actualHour)
    handleTimeChange(actualHour, minutes, seconds)
  }

  const handleMinuteChange = (newMinute: number) => {
    setMinutes(newMinute)
    handleTimeChange(hours, newMinute, seconds)
  }

  const handleSecondChange = (newSecond: number) => {
    setSeconds(newSecond)
    handleTimeChange(hours, minutes, newSecond)
  }

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod)
    const newHours = newPeriod === 'PM'
      ? (hours % 12) + 12
      : hours % 12
    setHours(newHours)
    handleTimeChange(newHours, minutes, seconds)
  }

  const renderTimeColumn = (
    label: string,
    maxValue: number,
    currentValue: number,
    onChange: (value: number) => void,
    start: number = 0
  ) => {
    const items = Array.from({ length: maxValue - start + 1 }, (_, i) => start + i)

    return (
      <div className="flex flex-col">
        <div className="text-xs font-semibold text-center text-base-content/60 py-2">
          {label}
        </div>
        <div className="flex-1 overflow-y-auto max-h-48">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              className={`
                w-full px-4 py-2 text-center hover:bg-base-200 transition-colors
                ${currentValue === item ? 'bg-primary text-primary-content' : ''}
              `}
            >
              {String(item).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const displayHours = format === '12' ? (hours % 12 || 12) : hours

  return (
    <div ref={containerRef} className={`relative ${className}`} data-state={isOpen ? 'open' : 'closed'} {...rest}>
      <Input
        value={formatTime(selectedTime, format, showSeconds)}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
          <div className="flex divide-x divide-base-300">
            {renderTimeColumn(
              'Hour',
              format === '12' ? 12 : 23,
              displayHours,
              handleHourChange,
              format === '12' ? 1 : 0
            )}

            {renderTimeColumn('Min', 59, minutes, handleMinuteChange)}

            {showSeconds && renderTimeColumn('Sec', 59, seconds, handleSecondChange)}

            {format === '12' && (
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-center text-base-content/60 py-2">
                  Period
                </div>
                <div className="flex-1 flex flex-col p-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePeriodChange('AM')}
                    className={`
                      btn btn-sm
                      ${period === 'AM' ? 'btn-primary' : 'btn-ghost'}
                    `}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePeriodChange('PM')}
                    className={`
                      btn btn-sm
                      ${period === 'PM' ? 'btn-primary' : 'btn-ghost'}
                    `}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 p-3 border-t border-base-300">
            <button
              type="button"
              onClick={() => {
                const now = new Date()
                setHours(now.getHours())
                setMinutes(now.getMinutes())
                setSeconds(now.getSeconds())
                setPeriod(now.getHours() >= 12 ? 'PM' : 'AM')
                handleTimeChange(now.getHours(), now.getMinutes(), now.getSeconds())
              }}
              className="btn btn-ghost btn-sm"
            >
              Now
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary btn-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
