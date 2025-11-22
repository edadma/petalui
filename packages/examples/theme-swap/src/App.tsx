import { Hero, ThemeController } from '@edadma/petalui'

function App() {
  return (
    <Hero className="min-h-screen bg-base-200" contentClassName="text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Theme Swap Test</h1>
        <p className="py-6">
          Testing the sun/moon swap theme switcher.
        </p>
        <ThemeController.Swap lightTheme="light" darkTheme="dark" defaultTheme="light" />
      </div>
    </Hero>
  )
}

export default App
