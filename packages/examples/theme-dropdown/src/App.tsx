import { Hero, ThemeController } from '@edadma/petalui'

const THEMES = [
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
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
]

function App() {
  return (
    <Hero className="min-h-screen bg-base-200" contentClassName="text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Theme Dropdown Test</h1>
        <p className="py-6">
          Testing the dropdown theme switcher with all daisyUI themes.
        </p>
        <ThemeController.Dropdown themes={THEMES} defaultTheme="light" />
      </div>
    </Hero>
  )
}

export default App
