import { Navbar, Hero, ThemeController, Button, Badge, Card } from '@edadma/petalui'

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
    <div className="min-h-screen">
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">Theme Dropdown Test</a>}
        end={<ThemeController.Dropdown themes={THEMES} defaultTheme="light" />}
      />

      <Hero className="min-h-[calc(100vh-4rem)] bg-base-200" contentClassName="text-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl font-bold">Theme Showcase</h1>
          <p className="text-lg">
            Use the theme dropdown in the navbar to test all 32 daisyUI themes.
            Watch the colors change instantly!
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="accent">Accent</Button>
            <Button type="neutral">Neutral</Button>
            <Button type="info">Info</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="error">Error</Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge type="primary">Primary</Badge>
            <Badge type="secondary">Secondary</Badge>
            <Badge type="accent">Accent</Badge>
            <Badge type="info">Info</Badge>
            <Badge type="success">Success</Badge>
            <Badge type="warning">Warning</Badge>
            <Badge type="error">Error</Badge>
          </div>

          <Card className="shadow-xl" title="Theme Colors">
            <p>This card demonstrates base-100 background with themed text and borders.</p>
          </Card>
        </div>
      </Hero>
    </div>
  )
}

export default App
