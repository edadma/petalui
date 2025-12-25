import React, { useEffect, useMemo, useState } from 'react'
import { useConfig } from '../providers/ConfigProvider'
import { Button } from './Button'
import { Flex } from './Flex'
import { InputNumber } from './InputNumber'
import { Select } from './Select'
import { Space } from './Space'

export type DateOfBirthOrder = 'mdy' | 'dmy' | 'ymd'
export type DateOfBirthMonthStyle = 'select' | 'grid'
export type DateOfBirthYearStyle = 'select' | 'input'

export interface DateOfBirthValue {
  month?: string
  day?: string
  year?: string
}

export interface DateOfBirthProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: DateOfBirthValue
  defaultValue?: DateOfBirthValue
  onChange?: (value: DateOfBirthValue) => void
  yearSpan?: number
  minAge?: number
  maxAge?: number
  order?: DateOfBirthOrder
  monthStyle?: DateOfBirthMonthStyle
  yearStyle?: DateOfBirthYearStyle
  monthPlaceholder?: string
  dayPlaceholder?: string
  yearPlaceholder?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  /** Test ID prefix for child elements */
  'data-testid'?: string
}

const DEFAULT_MONTHS = Array.from({ length: 12 }, (_, index) => String(index + 1))

function getMonthLabels(locale: string, format: 'long' | 'short') {
  const formatter = new Intl.DateTimeFormat(locale, { month: format })
  return DEFAULT_MONTHS.map((value, index) => ({
    value,
    label: formatter.format(new Date(2020, index, 1)),
  }))
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function validateAge(value: DateOfBirthValue, minAge?: number, maxAge?: number) {
  if (!value.year || !value.month || !value.day) return true
  const year = Number(value.year)
  const month = Number(value.month) - 1
  const day = Number(value.day)
  const birthDate = new Date(year, month, day)
  if (Number.isNaN(birthDate.getTime())) return false
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
  if (!hasHadBirthday) age -= 1
  if (minAge !== undefined && age < minAge) return false
  if (maxAge !== undefined && age > maxAge) return false
  return true
}

export const DateOfBirth: React.FC<DateOfBirthProps> = ({
  value,
  defaultValue,
  onChange,
  yearSpan = 120,
  minAge = 13,
  maxAge,
  order = 'mdy',
  monthStyle = 'select',
  yearStyle = 'select',
  monthPlaceholder = 'Month',
  dayPlaceholder = 'Day',
  yearPlaceholder = 'Year',
  disabled = false,
  size,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const { locale, componentSize } = useConfig()
  const effectiveSize = size ?? componentSize ?? 'md'
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<DateOfBirthValue>(
    value ?? defaultValue ?? {}
  )

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value ?? {})
    }
  }, [isControlled, value])

  const currentValue = isControlled ? (value ?? {}) : internalValue
  const localeCode = locale?.locale ?? 'en-US'
  const monthLabels = useMemo(
    () => getMonthLabels(localeCode, monthStyle === 'grid' ? 'short' : 'long'),
    [localeCode, monthStyle]
  )

  const yearRange = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: yearSpan }, (_, i) => String(currentYear - i))
  }, [yearSpan])

  const dayOptions = useMemo(() => {
    if (!currentValue.month) return Array.from({ length: 31 }, (_, i) => String(i + 1))
    const month = Number(currentValue.month)
    const year = currentValue.year ? Number(currentValue.year) : 2000
    const daysInMonth = getDaysInMonth(year, month)
    return Array.from({ length: daysInMonth }, (_, i) => String(i + 1))
  }, [currentValue.month, currentValue.year])

  useEffect(() => {
    if (currentValue.day && !dayOptions.includes(currentValue.day)) {
      handleChange({ ...currentValue, day: undefined })
    }
  }, [currentValue.day, dayOptions])

  const handleChange = (nextValue: DateOfBirthValue) => {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onChange?.(nextValue)
  }

  const renderMonth = () => {
    if (monthStyle === 'grid') {
      return (
        <div className="grid grid-cols-3 gap-2">
          {monthLabels.map((month) => {
            const isActive = currentValue.month === month.value
            return (
              <Button
                key={month.value}
                htmlType="button"
                size="sm"
                color={isActive ? 'primary' : undefined}
                variant={isActive ? 'solid' : 'ghost'}
                disabled={disabled}
                onClick={() => handleChange({ ...currentValue, month: month.value })}
                data-testid={testId ? `${testId}-month-${month.value}` : undefined}
              >
                {month.label}
              </Button>
            )
          })}
        </div>
      )
    }

    return (
      <Select
        value={currentValue.month ?? ''}
        onChange={(e) => handleChange({ ...currentValue, month: e.target.value })}
        disabled={disabled}
        size={effectiveSize}
        data-testid={testId ? `${testId}-month` : undefined}
      >
        <option value="">{monthPlaceholder}</option>
        {monthLabels.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>
    )
  }

  const renderDay = () => (
    <Select
      value={currentValue.day ?? ''}
      onChange={(e) => handleChange({ ...currentValue, day: e.target.value })}
      disabled={disabled}
      size={effectiveSize}
      data-testid={testId ? `${testId}-day` : undefined}
    >
      <option value="">{dayPlaceholder}</option>
      {dayOptions.map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </Select>
  )

  const renderYear = () => {
    if (yearStyle === 'input') {
      return (
        <InputNumber
          value={currentValue.year ? Number(currentValue.year) : undefined}
          min={Number(yearRange[yearRange.length - 1])}
          max={Number(yearRange[0])}
          placeholder={yearPlaceholder}
          disabled={disabled}
          size={effectiveSize}
          onChange={(nextValue) => handleChange({ ...currentValue, year: nextValue ? String(nextValue) : undefined })}
          data-testid={testId ? `${testId}-year` : undefined}
        />
      )
    }

    return (
      <Select
        value={currentValue.year ?? ''}
        onChange={(e) => handleChange({ ...currentValue, year: e.target.value })}
        disabled={disabled}
        size={effectiveSize}
        data-testid={testId ? `${testId}-year` : undefined}
      >
        <option value="">{yearPlaceholder}</option>
        {yearRange.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>
    )
  }

  const fieldMap = {
    m: renderMonth(),
    d: renderDay(),
    y: renderYear(),
  }

  const orderedFields = order.split('').map((key) => key as keyof typeof fieldMap)
  const gridFields = order
    .split('')
    .filter((key) => key !== 'm')
    .map((key) => key as keyof typeof fieldMap)
  const fieldWidths: Record<'m' | 'd' | 'y', string> = {
    m: 'w-full sm:w-[7rem]',
    d: 'w-full sm:w-[5rem]',
    y: 'w-full sm:w-[5rem]',
  }

  const showAgeWarning = currentValue.year && currentValue.month && currentValue.day && !validateAge(currentValue, minAge, maxAge)

  return (
    <div className={className} data-testid={testId} {...rest}>
      {monthStyle === 'grid' ? (
        <Space direction="vertical" size="sm">
          {renderMonth()}
          <Flex gap="sm">
            {gridFields.map((fieldKey) => (
              <div key={fieldKey} className={fieldWidths[fieldKey]}>
                {fieldMap[fieldKey]}
              </div>
            ))}
          </Flex>
        </Space>
      ) : (
        <Flex wrap="wrap" gap="sm">
          {orderedFields.map((fieldKey) => (
            <div key={fieldKey} className={fieldWidths[fieldKey]}>
              {fieldMap[fieldKey]}
            </div>
          ))}
        </Flex>
      )}

      {showAgeWarning && (
        <div className="text-xs text-error mt-2">
          {minAge ? `You must be at least ${minAge} years old.` : 'Date of birth is not valid.'}
        </div>
      )}
    </div>
  )
}

DateOfBirth.displayName = 'DateOfBirth'
