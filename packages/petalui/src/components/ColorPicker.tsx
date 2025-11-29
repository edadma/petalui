import React, { useState, useRef, useEffect, useCallback } from 'react'

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (color: string) => void
  mode?: 'swatches' | 'picker' | 'both'
  presets?: string[]
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const DEFAULT_PRESETS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
  '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47',
  '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130',
]

// Convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Convert Hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 100, l: 50 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// Validate hex color
function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

// Normalize hex (add # if missing, uppercase)
function normalizeHex(hex: string): string {
  let normalized = hex.trim()
  if (!normalized.startsWith('#')) {
    normalized = '#' + normalized
  }
  return normalized.toLowerCase()
}

export function ColorPicker({
  value = '#000000',
  onChange,
  mode = 'both',
  presets = DEFAULT_PRESETS,
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}: ColorPickerProps) {
  const [hsl, setHsl] = useState(() => hexToHsl(value))
  const [hexInput, setHexInput] = useState(value)
  const [isDraggingSL, setIsDraggingSL] = useState(false)
  const [isDraggingHue, setIsDraggingHue] = useState(false)
  const slPanelRef = useRef<HTMLDivElement>(null)
  const hueSliderRef = useRef<HTMLDivElement>(null)

  // Sync internal state when value prop changes
  useEffect(() => {
    if (isValidHex(value)) {
      setHsl(hexToHsl(value))
      setHexInput(value)
    }
  }, [value])

  const updateColor = useCallback((newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl)
    const hex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    setHexInput(hex)
    onChange?.(hex)
  }, [onChange])

  // Saturation/Lightness panel handlers
  const handleSLChange = useCallback((clientX: number, clientY: number) => {
    if (!slPanelRef.current || disabled) return
    const rect = slPanelRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))

    // Convert x,y to saturation and lightness
    // x = saturation (0-100), y = lightness (100-0)
    const s = Math.round(x * 100)
    const l = Math.round((1 - y) * 100)
    updateColor({ ...hsl, s, l })
  }, [hsl, updateColor, disabled])

  const handleSLMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    setIsDraggingSL(true)
    handleSLChange(e.clientX, e.clientY)
  }

  // Hue slider handlers
  const handleHueChange = useCallback((clientX: number) => {
    if (!hueSliderRef.current || disabled) return
    const rect = hueSliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const h = Math.round(x * 360)
    updateColor({ ...hsl, h })
  }, [hsl, updateColor, disabled])

  const handleHueMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    setIsDraggingHue(true)
    handleHueChange(e.clientX)
  }

  // Global mouse handlers for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSL) {
        handleSLChange(e.clientX, e.clientY)
      } else if (isDraggingHue) {
        handleHueChange(e.clientX)
      }
    }

    const handleMouseUp = () => {
      setIsDraggingSL(false)
      setIsDraggingHue(false)
    }

    if (isDraggingSL || isDraggingHue) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDraggingSL, isDraggingHue, handleSLChange, handleHueChange])

  // Hex input handler
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setHexInput(newValue)
    const normalized = normalizeHex(newValue)
    if (isValidHex(normalized)) {
      setHsl(hexToHsl(normalized))
      onChange?.(normalized)
    }
  }

  // Preset click handler
  const handlePresetClick = (color: string) => {
    if (disabled) return
    const normalized = normalizeHex(color)
    setHsl(hexToHsl(normalized))
    setHexInput(normalized)
    onChange?.(normalized)
  }

  // Size configurations
  const sizeConfig = {
    xs: { panel: 'w-32 h-32', hue: 'h-3', swatch: 'w-4 h-4', input: 'input-xs' },
    sm: { panel: 'w-40 h-40', hue: 'h-4', swatch: 'w-5 h-5', input: 'input-sm' },
    md: { panel: 'w-48 h-48', hue: 'h-5', swatch: 'w-6 h-6', input: 'input-md' },
    lg: { panel: 'w-56 h-56', hue: 'h-6', swatch: 'w-7 h-7', input: 'input-lg' },
  }

  const config = sizeConfig[size]
  const showPicker = mode === 'picker' || mode === 'both'
  const showSwatches = mode === 'swatches' || mode === 'both'

  // Calculate picker position
  const slX = hsl.s / 100
  const slY = 1 - hsl.l / 100
  const hueX = hsl.h / 360

  return (
    <div className={`inline-flex flex-col gap-3 ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`} {...rest}>
      {showPicker && (
        <>
          {/* Saturation/Lightness Panel */}
          <div
            ref={slPanelRef}
            className={`${config.panel} relative rounded cursor-crosshair select-none`}
            style={{
              background: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))
              `,
            }}
            onMouseDown={handleSLMouseDown}
          >
            {/* Picker indicator */}
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none"
              style={{
                left: `calc(${slX * 100}% - 8px)`,
                top: `calc(${slY * 100}% - 8px)`,
                boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          </div>

          {/* Hue Slider */}
          <div
            ref={hueSliderRef}
            className={`${config.hue} w-full relative rounded cursor-pointer select-none`}
            style={{
              background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
            }}
            onMouseDown={handleHueMouseDown}
          >
            {/* Hue indicator */}
            <div
              className="absolute top-1/2 w-3 h-full border-2 border-white rounded-sm shadow-md pointer-events-none"
              style={{
                left: `calc(${hueX * 100}% - 6px)`,
                transform: 'translateY(-50%)',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          </div>

          {/* Hex Input and Preview */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded border border-base-300 flex-shrink-0"
              style={{ backgroundColor: isValidHex(normalizeHex(hexInput)) ? normalizeHex(hexInput) : value }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              className={`input input-bordered ${config.input} w-full font-mono uppercase`}
              placeholder="#000000"
              maxLength={7}
              disabled={disabled}
            />
          </div>
        </>
      )}

      {showSwatches && (
        <div className="grid grid-cols-10 gap-1">
          {presets.map((color, index) => (
            <button
              key={`${color}-${index}`}
              type="button"
              className={`${config.swatch} rounded border border-base-300 cursor-pointer hover:scale-110 transition-transform ${
                value.toLowerCase() === color.toLowerCase() ? 'ring-2 ring-primary ring-offset-1' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handlePresetClick(color)}
              disabled={disabled}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
