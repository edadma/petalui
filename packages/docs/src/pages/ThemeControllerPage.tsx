import { ThemeController } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const swapApi: ApiProperty[] = [
  {
    property: 'lightTheme',
    description: 'Theme name for light mode',
    type: 'string',
    default: "'light'",
  },
  {
    property: 'darkTheme',
    description: 'Theme name for dark mode',
    type: 'string',
    default: "'dark'",
  },
  {
    property: 'defaultTheme',
    description: 'Initial theme',
    type: 'string',
  },
  {
    property: 'onChange',
    description: 'Callback when theme changes',
    type: '(theme: string) => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const dropdownApi: ApiProperty[] = [
  {
    property: 'themes',
    description: 'Array of available theme names',
    type: 'string[]',
  },
  {
    property: 'defaultTheme',
    description: 'Initial theme',
    type: 'string',
  },
  {
    property: 'onChange',
    description: 'Callback when theme changes',
    type: '(theme: string) => void',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function ThemeControllerPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Theme Controller</h1>
        <p className="text-base-content/70">
          Components for switching between daisyUI themes.
        </p>
      </div>

      <div className="columns-1 gap-x-4">
        <ExampleSection
          title="Swap (Sun/Moon)"
          description="Toggle between light and dark themes with animated icons."
          code={`import React from 'react'
import { ThemeController } from '@edadma/petalui'

const App: React.FC = () => (
  <ThemeController.Swap />
)

export default App`}
          noColumnBreak
        >
          <ThemeController.Swap />
        </ExampleSection>

        <ExampleSection
          title="Custom Themes"
          description="Use custom theme names for light and dark modes."
          code={`import React from 'react'
import { ThemeController } from '@edadma/petalui'

const App: React.FC = () => (
  <ThemeController.Swap
    lightTheme="cupcake"
    darkTheme="dracula"
  />
)

export default App`}
          noColumnBreak
        >
          <ThemeController.Swap lightTheme="cupcake" darkTheme="dracula" />
        </ExampleSection>

        <ExampleSection
          title="With onChange Callback"
          description="Handle theme changes with a callback."
          code={`import React from 'react'
import { ThemeController } from '@edadma/petalui'

const App: React.FC = () => (
  <ThemeController.Swap
    onChange={(theme) => {
      console.log('Theme changed to:', theme)
      localStorage.setItem('theme', theme)
    }}
  />
)

export default App`}
          noColumnBreak
        >
          <ThemeController.Swap
            onChange={(theme) => {
              console.log('Theme changed to:', theme)
            }}
          />
        </ExampleSection>

        <ExampleSection
          title="Dropdown (Multiple Themes)"
          description="Select from multiple themes using a dropdown menu."
          code={`import React from 'react'
import { ThemeController } from '@edadma/petalui'

const App: React.FC = () => (
  <ThemeController.Dropdown
    themes={[
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
    ]}
  />
)

export default App`}
          noColumnBreak
        >
          <ThemeController.Dropdown
            themes={[
              'light',
              'dark',
              'cupcake',
              'bumblebee',
              'emerald',
              'corporate',
              'synthwave',
              'retro',
              'cyberpunk',
              'valentine',
              'halloween',
              'garden',
              'forest',
              'aqua',
              'lofi',
              'pastel',
              'fantasy',
              'wireframe',
              'black',
              'luxury',
              'dracula',
            ]}
          />
        </ExampleSection>

        <ExampleSection
          title="Dropdown with Default Theme"
          description="Set an initial theme for the dropdown."
          code={`import React from 'react'
import { ThemeController } from '@edadma/petalui'

const App: React.FC = () => (
  <ThemeController.Dropdown
    themes={['light', 'dark', 'synthwave', 'retro', 'cyberpunk']}
    defaultTheme="synthwave"
  />
)

export default App`}
          noColumnBreak
        >
          <ThemeController.Dropdown
            themes={['light', 'dark', 'synthwave', 'retro', 'cyberpunk']}
            defaultTheme="synthwave"
          />
        </ExampleSection>

        <ExampleSection
          title="Dropdown with onChange"
          description="Handle theme selection changes."
          code={`import React from 'react'
import { ThemeController } from '@edadma/petalui'

const App: React.FC = () => (
  <ThemeController.Dropdown
    themes={['light', 'dark', 'cupcake', 'dracula']}
    onChange={(theme) => {
      console.log('Selected theme:', theme)
      localStorage.setItem('theme', theme)
    }}
  />
)

export default App`}
          noColumnBreak
        >
          <ThemeController.Dropdown
            themes={['light', 'dark', 'cupcake', 'dracula']}
            onChange={(theme) => {
              console.log('Selected theme:', theme)
            }}
          />
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="ThemeController.Swap" data={swapApi} />

        <ApiTable title="ThemeController.Dropdown" data={dropdownApi} className="mt-8" />

        <div className="alert alert-info mt-8">
          <div>
            <strong>Available Themes:</strong>
            <p className="mt-2">
              daisyUI includes 35+ built-in themes: light, dark, cupcake, bumblebee, emerald,
              corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua,
              lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business,
              acid, lemonade, night, coffee, winter, dim, nord, sunset, and more.
            </p>
            <strong className="mt-4 block">Usage Tips:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Use ThemeController.Swap for simple light/dark toggle</li>
              <li>Use ThemeController.Dropdown when offering multiple theme choices</li>
              <li>Persist theme selection in localStorage using onChange callback</li>
              <li>Theme changes apply to the entire document using data-theme attribute</li>
              <li>All daisyUI components automatically adapt to the selected theme</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
