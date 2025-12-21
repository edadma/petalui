import { Navbar, ThemeController } from 'asterui'

function App() {
  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">AsterUI App</a>}
        end={<ThemeController.Swap className="scale-75" />}
      />

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to AsterUI</h1>
          <p className="text-base-content/70">
            Start building your app by editing <code className="bg-base-300 px-1 rounded">src/App.tsx</code>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
