import { Navbar, Hero, ThemeController } from '@edadma/petalui'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">Theme Swap Test</a>}
        end={<ThemeController.Swap lightTheme="light" darkTheme="dark" defaultTheme="light" />}
      />

      <Hero className="min-h-[calc(100vh-4rem)] bg-base-200" contentClassName="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">
            Use the sun/moon toggle in the navbar to swap between light and dark themes.
            The entire app will update with smooth transitions.
          </p>
        </div>
      </Hero>
    </div>
  )
}

export default App
