import { ColorPicker, Space, Form, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'
import { useState } from 'react'

const colorPickerApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled color value (hex format)',
    type: 'string',
    default: "'#000000'",
  },
  {
    property: 'onChange',
    description: 'Callback when color changes',
    type: '(color: string) => void',
  },
  {
    property: 'mode',
    description: 'Display mode for the picker',
    type: "'swatches' | 'picker' | 'both'",
    default: "'both'",
  },
  {
    property: 'presets',
    description: 'Array of preset color swatches (hex)',
    type: 'string[]',
    default: '80 color palette',
  },
  {
    property: 'size',
    description: 'Size of the picker',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'disabled',
    description: 'Disable the picker',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function ColorPickerPage() {
  const [basicColor, setBasicColor] = useState('#3b82f6')
  const [swatchesColor, setSwatchesColor] = useState('#ef4444')
  const [pickerColor, setPickerColor] = useState('#8b5cf6')
  const [customPresetsColor, setCustomPresetsColor] = useState('#3b82f6')
  const [previewColor, setPreviewColor] = useState('#10b981')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">ColorPicker</h1>
        <p className="text-base-content/70">Color selection with picker panel and preset swatches.</p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic ColorPicker"
          description="Full picker with saturation/lightness panel, hue slider, and swatches."
          code={`import React, { useState } from 'react'
import { ColorPicker } from '@edadma/bloomui'

const App: React.FC = () => {
  const [color, setColor] = useState('#3b82f6')

  return (
    <div>
      <ColorPicker value={color} onChange={setColor} />
      <p className="mt-4">Selected: {color}</p>
    </div>
  )
}

export default App`}
        >
          <div>
            <ColorPicker value={basicColor} onChange={setBasicColor} />
            <p className="mt-4">Selected: <span className="font-mono">{basicColor}</span></p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Swatches Only"
          description="Simple swatch grid without the full picker."
          code={`import React, { useState } from 'react'
import { ColorPicker } from '@edadma/bloomui'

const App: React.FC = () => {
  const [color, setColor] = useState('#ef4444')

  return (
    <ColorPicker
      mode="swatches"
      value={color}
      onChange={setColor}
    />
  )
}

export default App`}
        >
          <ColorPicker mode="swatches" value={swatchesColor} onChange={setSwatchesColor} />
        </ExampleSection>

        <ExampleSection
          title="Picker Only"
          description="Full picker without preset swatches."
          code={`import React, { useState } from 'react'
import { ColorPicker } from '@edadma/bloomui'

const App: React.FC = () => {
  const [color, setColor] = useState('#8b5cf6')

  return (
    <ColorPicker
      mode="picker"
      value={color}
      onChange={setColor}
    />
  )
}

export default App`}
        >
          <ColorPicker mode="picker" value={pickerColor} onChange={setPickerColor} />
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="ColorPicker in various sizes."
          code={`import React from 'react'
import { ColorPicker, Space } from '@edadma/bloomui'

const App: React.FC = () => (
  <Space direction="vertical" size="large">
    <div>
      <p className="mb-2 text-sm">Extra Small</p>
      <ColorPicker size="xs" mode="picker" />
    </div>
    <div>
      <p className="mb-2 text-sm">Small</p>
      <ColorPicker size="sm" mode="picker" />
    </div>
    <div>
      <p className="mb-2 text-sm">Medium (default)</p>
      <ColorPicker size="md" mode="picker" />
    </div>
    <div>
      <p className="mb-2 text-sm">Large</p>
      <ColorPicker size="lg" mode="picker" />
    </div>
  </Space>
)

export default App`}
        >
          <Space direction="vertical" size="lg">
            <div>
              <p className="mb-2 text-sm">Extra Small</p>
              <ColorPicker size="xs" mode="picker" />
            </div>
            <div>
              <p className="mb-2 text-sm">Small</p>
              <ColorPicker size="sm" mode="picker" />
            </div>
          </Space>
        </ExampleSection>

        <ExampleSection
          title="Custom Presets"
          description="Provide your own color swatches."
          code={`import React, { useState } from 'react'
import { ColorPicker } from '@edadma/bloomui'

const App: React.FC = () => {
  const [color, setColor] = useState('#3b82f6')

  const brandColors = [
    '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd',
    '#166534', '#22c55e', '#86efac', '#bbf7d0',
    '#9f1239', '#f43f5e', '#fb7185', '#fda4af',
    '#92400e', '#f59e0b', '#fbbf24', '#fde68a',
  ]

  return (
    <ColorPicker
      mode="swatches"
      presets={brandColors}
      value={color}
      onChange={setColor}
    />
  )
}

export default App`}
        >
          <ColorPicker
            mode="swatches"
            presets={[
              '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd',
              '#166534', '#22c55e', '#86efac', '#bbf7d0',
              '#9f1239', '#f43f5e', '#fb7185', '#fda4af',
              '#92400e', '#f59e0b', '#fbbf24', '#fde68a',
            ]}
            value={customPresetsColor}
            onChange={setCustomPresetsColor}
          />
        </ExampleSection>

        <ExampleSection
          title="Disabled State"
          description="ColorPicker in disabled state."
          code={`import React from 'react'
import { ColorPicker } from '@edadma/bloomui'

const App: React.FC = () => (
  <ColorPicker value="#6366f1" disabled />
)

export default App`}
        >
          <ColorPicker value="#6366f1" disabled />
        </ExampleSection>

        <ExampleSection
          title="Form Integration"
          description="Use ColorPicker with Form.Item for form validation."
          code={`import React from 'react'
import { Form, ColorPicker, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Form
    initialValues={{ themeColor: '#10b981' }}
    onFinish={(values) => console.log(values)}
  >
    <Form.Item name="themeColor" label="Theme Color">
      <ColorPicker mode="picker" />
    </Form.Item>
    <Button type="submit" color="primary">
      Submit
    </Button>
  </Form>
)

export default App`}
        >
          <Form
            initialValues={{ themeColor: '#10b981' }}
            onFinish={(values) => alert(JSON.stringify(values))}
          >
            <Form.Item name="themeColor" label="Theme Color">
              <ColorPicker mode="picker" />
            </Form.Item>
            <Button htmlType="submit" color="primary">
              Submit
            </Button>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Live Preview"
          description="Use the selected color in real-time."
          code={`import React, { useState } from 'react'
import { ColorPicker } from '@edadma/bloomui'

const App: React.FC = () => {
  const [bgColor, setBgColor] = useState('#3b82f6')

  return (
    <div className="flex gap-4 items-start">
      <ColorPicker
        mode="picker"
        size="sm"
        value={bgColor}
        onChange={setBgColor}
      />
      <div
        className="w-32 h-32 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: bgColor }}
      >
        Preview
      </div>
    </div>
  )
}

export default App`}
        >
          <div className="flex gap-4 items-start">
            <ColorPicker
              mode="picker"
              size="sm"
              value={previewColor}
              onChange={setPreviewColor}
            />
            <div
              className="w-32 h-32 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: previewColor }}
            >
              Preview
            </div>
          </div>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="ColorPicker" data={colorPickerApi} />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use <code>mode="swatches"</code> for quick color selection from presets</li>
              <li>Use <code>mode="picker"</code> for precise color selection</li>
              <li>Use <code>mode="both"</code> (default) for maximum flexibility</li>
              <li>The hex input field accepts values with or without the # prefix</li>
              <li>Drag on the saturation/lightness panel or hue slider for smooth selection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
