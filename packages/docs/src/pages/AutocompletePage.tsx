import { useState } from 'react'
import { Autocomplete, Form, Button, Modal } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const autocompleteApi: ApiProperty[] = [
  {
    property: 'value',
    description: 'Controlled value',
    type: 'string',
  },
  {
    property: 'defaultValue',
    description: 'Default value (uncontrolled)',
    type: 'string',
    default: "''",
  },
  {
    property: 'onChange',
    description: 'Callback when value changes',
    type: '(value: string) => void',
  },
  {
    property: 'options',
    description: 'Array of options to display',
    type: 'string[] | AutocompleteOption[]',
  },
  {
    property: 'placeholder',
    description: 'Input placeholder text',
    type: 'string',
    default: '"Type to search..."',
  },
  {
    property: 'disabled',
    description: 'Disable the autocomplete',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'size',
    description: 'Input size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'allowCustomValue',
    description: 'Allow user to enter custom values not in options',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'filterOption',
    description: 'Custom filter function',
    type: '(option: AutocompleteOption, inputValue: string) => boolean',
  },
  {
    property: 'notFoundContent',
    description: 'Content to show when no options match',
    type: 'React.ReactNode',
    default: '"No results found"',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'South Africa',
  'Russia',
]

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' },
]

const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'PHP',
  'Scala',
  'Haskell',
]

export function AutocompletePage() {
  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('')
  const [email, setEmail] = useState('')
  const [submittedData, setSubmittedData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (values: any) => {
    console.log('Form values:', values)
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Autocomplete</h1>
        <p className="text-base-content/70">
          Search and select from a list of options with keyboard navigation and filtering.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Autocomplete"
          description="Simple autocomplete with string array options."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
]

const App: React.FC = () => (
  <Autocomplete
    options={countries}
    placeholder="Select a country"
  />
)

export default App`}
        >
          <Autocomplete options={countries} placeholder="Select a country" />
        </ExampleSection>

        <ExampleSection
          title="With Object Options"
          description="Autocomplete with value/label object options."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'orange', label: 'Orange' },
]

const App: React.FC = () => (
  <Autocomplete
    options={fruits}
    placeholder="Select a fruit"
  />
)

export default App`}
        >
          <Autocomplete options={fruits} placeholder="Select a fruit" />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description="Controlled autocomplete with state management."
          code={`import React, { useState } from 'react'
import { Autocomplete } from '@edadma/petalui'

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
]

const App: React.FC = () => {
  const [country, setCountry] = useState('')

  return (
    <div>
      <Autocomplete
        value={country}
        onChange={setCountry}
        options={countries}
        placeholder="Select a country"
      />
      <p className="mt-2 text-sm">
        Selected: {country || 'None'}
      </p>
    </div>
  )
}

export default App`}
        >
          <div>
            <Autocomplete
              value={country}
              onChange={setCountry}
              options={countries}
              placeholder="Select a country"
            />
            <p className="mt-2 text-sm text-base-content/70">Selected: {country || 'None'}</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="No Custom Values"
          description="Autocomplete that only allows selection from options."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
]

const App: React.FC = () => (
  <Autocomplete
    options={languages}
    allowCustomValue={false}
    placeholder="Select a language"
  />
)

export default App`}
        >
          <Autocomplete
            options={programmingLanguages}
            allowCustomValue={false}
            placeholder="Select a language"
          />
        </ExampleSection>

        <ExampleSection
          title="Custom Filter"
          description="Autocomplete with custom filtering logic (starts with)."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
]

const App: React.FC = () => (
  <Autocomplete
    options={countries}
    filterOption={(option, input) =>
      option.label.toLowerCase().startsWith(input.toLowerCase())
    }
    placeholder="Type to filter (starts with)"
  />
)

export default App`}
        >
          <Autocomplete
            options={countries}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            placeholder="Type to filter (starts with)"
          />
        </ExampleSection>

        <ExampleSection
          title="Different Sizes"
          description="Autocomplete in various sizes."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const options = ['Option 1', 'Option 2', 'Option 3']

const App: React.FC = () => (
  <div className="flex flex-col gap-4">
    <Autocomplete size="xs" options={options} placeholder="Extra small" />
    <Autocomplete size="sm" options={options} placeholder="Small" />
    <Autocomplete size="md" options={options} placeholder="Medium" />
    <Autocomplete size="lg" options={options} placeholder="Large" />
  </div>
)

export default App`}
        >
          <div className="flex flex-col gap-4">
            <Autocomplete size="xs" options={fruits} placeholder="Extra small" />
            <Autocomplete size="sm" options={fruits} placeholder="Small" />
            <Autocomplete size="md" options={fruits} placeholder="Medium" />
            <Autocomplete size="lg" options={fruits} placeholder="Large" />
          </div>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled autocomplete."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const App: React.FC = () => (
  <Autocomplete
    options={['Option 1', 'Option 2']}
    disabled
    defaultValue="Option 1"
  />
)

export default App`}
        >
          <Autocomplete options={fruits} disabled defaultValue="apple" />
        </ExampleSection>

        <ExampleSection
          title="Custom Not Found Content"
          description="Autocomplete with custom message when no results."
          code={`import React from 'react'
import { Autocomplete } from '@edadma/petalui'

const App: React.FC = () => (
  <Autocomplete
    options={['Apple', 'Banana', 'Cherry']}
    notFoundContent="Sorry, no matches found!"
    placeholder="Search fruits"
  />
)

export default App`}
        >
          <Autocomplete
            options={fruits}
            notFoundContent={
              <div className="py-2">
                <div className="text-warning">Sorry, no matches found!</div>
                <div className="text-xs mt-1">Try searching for something else</div>
              </div>
            }
            placeholder="Search fruits"
          />
        </ExampleSection>

        <ExampleSection
          title="Email Domain Autocomplete"
          description="Practical example with email domain suggestions."
          code={`import React, { useState } from 'react'
import { Autocomplete } from '@edadma/petalui'

const App: React.FC = () => {
  const [email, setEmail] = useState('')

  const domains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com']

  const emailOptions = email.includes('@')
    ? domains.map(domain => email.split('@')[0] + domain)
    : domains.map(domain => email + domain)

  return (
    <Autocomplete
      value={email}
      onChange={setEmail}
      options={emailOptions}
      placeholder="Enter email address"
    />
  )
}

export default App`}
        >
          <div>
            <Autocomplete
              value={email}
              onChange={setEmail}
              options={
                email.includes('@')
                  ? ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com'].map(
                      (domain) => email.split('@')[0] + domain
                    )
                  : ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com'].map(
                      (domain) => email + domain
                    )
              }
              placeholder="Enter email address"
            />
            <p className="mt-2 text-sm text-base-content/70">Email: {email || 'None'}</p>
          </div>
        </ExampleSection>

        <ExampleSection
          title="In Form"
          description="Autocomplete integrated with Form component."
          code={`import React from 'react'
import { Autocomplete, Form, Button } from '@edadma/petalui'

const App: React.FC = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onFinish={handleSubmit} initialValues={{ country: 'Canada' }}>
      <Form.Item
        name="country"
        label="Country"
        required
        rules={{ required: 'Please select a country' }}
      >
        <Autocomplete
          options={['United States', 'Canada', 'United Kingdom']}
          placeholder="Select a country"
        />
      </Form.Item>

      <Form.Item name="language" label="Programming Language">
        <Autocomplete
          options={['JavaScript', 'Python', 'Java']}
          allowCustomValue={false}
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App`}
        >
          <Form onFinish={handleSubmit} initialValues={{ country: 'Canada' }}>
            <Form.Item
              name="country"
              label="Country"
              required
              rules={{ required: 'Please select a country' }}
            >
              <Autocomplete options={countries} placeholder="Select a country" />
            </Form.Item>

            <Form.Item name="language" label="Programming Language">
              <Autocomplete
                options={programmingLanguages}
                allowCustomValue={false}
                placeholder="Select a language"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ExampleSection>

        <ExampleSection
          title="Search with Highlighting"
          description="Controlled autocomplete for search functionality."
          code={`import React, { useState } from 'react'
import { Autocomplete } from '@edadma/petalui'

const App: React.FC = () => {
  const [language, setLanguage] = useState('')

  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
  ]

  return (
    <div className="p-4 border border-base-300 rounded-lg">
      <label className="label">
        <span className="label-text font-medium">Search Programming Language</span>
      </label>
      <Autocomplete
        value={language}
        onChange={setLanguage}
        options={languages}
        placeholder="Start typing to search..."
        allowCustomValue={false}
      />
      {language && (
        <div className="mt-3 p-3 bg-base-200 rounded">
          <span className="text-sm">You selected: </span>
          <span className="font-bold text-primary">{language}</span>
        </div>
      )}
    </div>
  )
}

export default App`}
        >
          <div className="p-4 border border-base-300 rounded-lg">
            <label className="label">
              <span className="label-text font-medium">Search Programming Language</span>
            </label>
            <Autocomplete
              value={language}
              onChange={setLanguage}
              options={programmingLanguages}
              placeholder="Start typing to search..."
              allowCustomValue={false}
            />
            {language && (
              <div className="mt-3 p-3 bg-base-200 rounded">
                <span className="text-sm">You selected: </span>
                <span className="font-bold text-primary">{language}</span>
              </div>
            )}
          </div>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Autocomplete" data={autocompleteApi} />

        <div className="mt-6 p-4 bg-base-200 rounded-lg">
          <h3 className="font-mono text-lg font-bold mb-2">AutocompleteOption</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>value</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>The value of the option</td>
                </tr>
                <tr>
                  <td>
                    <code>label</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>The display text of the option</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
          <h3 className="font-bold mb-2">Keyboard Navigation</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              <kbd className="kbd kbd-xs">↑</kbd> / <kbd className="kbd kbd-xs">↓</kbd> - Navigate
              through options
            </li>
            <li>
              <kbd className="kbd kbd-xs">Enter</kbd> - Select highlighted option
            </li>
            <li>
              <kbd className="kbd kbd-xs">Esc</kbd> - Close dropdown and blur input
            </li>
          </ul>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Form Submitted"
        footer={null}
      >
        <div className="py-4">
          <p className="mb-4">Form data:</p>
          <pre className="bg-base-200 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      </Modal>
    </div>
  )
}
