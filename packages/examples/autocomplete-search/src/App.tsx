import { useState, useEffect } from 'react'
import { Navbar, Hero, ThemeController, Autocomplete, Card, Space } from '@edadma/bloomui'

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
  'caramellatte',
  'abyss',
  'silk',
]

interface Country {
  name: {
    common: string
    official: string
  }
  capital?: string[]
  region: string
  population: number
  flags: {
    svg: string
    alt?: string
  }
  cca2: string
}

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca2')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common)))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch countries:', err)
        setLoading(false)
      })
  }, [])

  const handleCountrySelect = (value: string) => {
    const country = countries.find((c) => c.name.common === value)
    setSelectedCountry(country || null)
  }

  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">Autocomplete Search Test</a>}
        end={<ThemeController.Dropdown themes={THEMES} />}
      />

      <Hero className="bg-base-200 !min-h-[calc(100vh-4rem)]" contentClassName="text-center" wrapperClassName="max-w-2xl">
        <Space size="lg">
          <h1 className="text-5xl font-bold">Country Search</h1>
          <p className="text-lg">
            Search and explore countries using the RESTCountries API with real-time autocomplete filtering.
          </p>

          <div className="w-full max-w-md mx-auto">
          <label className="label">
            <span className="label-text">Search for a country</span>
          </label>
          {loading ? (
            <div className="skeleton h-12 w-full"></div>
          ) : (
            <Autocomplete
              options={countries.map((c) => c.name.common)}
              placeholder="Type to search countries..."
              onChange={handleCountrySelect}
              className="w-full"
            />
          )}
        </div>

        {selectedCountry && (
          <Card className="shadow-xl max-w-md mx-auto" title={selectedCountry.name.common}>
            <div className="flex items-start gap-4">
              <img
                src={selectedCountry.flags.svg}
                alt={selectedCountry.flags.alt || `Flag of ${selectedCountry.name.common}`}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="text-left">
                <p><strong>Official Name:</strong> {selectedCountry.name.official}</p>
                <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
                <p><strong>Region:</strong> {selectedCountry.region}</p>
                <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        )}

          {!selectedCountry && !loading && (
            <div className="text-base-content/60">
              Select a country from the autocomplete to see details
            </div>
          )}
        </Space>
      </Hero>
    </>
  )
}

export default App
