import { Footer } from '@edadma/petalui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const footerApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Footer content',
    type: 'React.ReactNode',
  },
  {
    property: 'center',
    description: 'Center align content',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'horizontal',
    description: 'Horizontal layout',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'vertical',
    description: 'Vertical layout',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function FooterPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Footer</h1>
        <p className="text-base-content/70">
          Site footer with navigation, links, and company information.
        </p>
      </div>

      <div className="columns-1 lg:columns-2 gap-x-4">
        <ExampleSection
          title="Basic Footer"
          description="Simple footer with navigation sections."
          code={`import React from 'react'
import { Footer } from '@edadma/petalui'

const App: React.FC = () => (
  <Footer className="bg-base-200 text-base-content p-10">
    <nav>
      <Footer.Title>Services</Footer.Title>
      <a className="link link-hover">Branding</a>
      <a className="link link-hover">Design</a>
      <a className="link link-hover">Marketing</a>
    </nav>
    <nav>
      <Footer.Title>Company</Footer.Title>
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">Jobs</a>
    </nav>
    <nav>
      <Footer.Title>Legal</Footer.Title>
      <a className="link link-hover">Terms of use</a>
      <a className="link link-hover">Privacy policy</a>
    </nav>
  </Footer>
)

export default App`}
        >
          <Footer className="bg-base-200 text-base-content p-10">
            <nav>
              <Footer.Title>Services</Footer.Title>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
            </nav>
            <nav>
              <Footer.Title>Company</Footer.Title>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
            </nav>
            <nav>
              <Footer.Title>Legal</Footer.Title>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
            </nav>
          </Footer>
        </ExampleSection>

        <ExampleSection
          title="Centered Footer"
          description="Center aligned content."
          code={`import React from 'react'
import { Footer } from '@edadma/petalui'

const App: React.FC = () => (
  <Footer center className="bg-base-200 text-base-content p-10">
    <nav>
      <Footer.Title>Services</Footer.Title>
      <a className="link link-hover">Branding</a>
      <a className="link link-hover">Design</a>
      <a className="link link-hover">Marketing</a>
    </nav>
    <nav>
      <Footer.Title>Company</Footer.Title>
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
    </nav>
  </Footer>
)

export default App`}
        >
          <Footer center className="bg-base-200 text-base-content p-10">
            <nav>
              <Footer.Title>Services</Footer.Title>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
            </nav>
            <nav>
              <Footer.Title>Company</Footer.Title>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
            </nav>
          </Footer>
        </ExampleSection>

        <ExampleSection
          title="With Logo"
          description="Footer with brand logo and social links."
          code={`import React from 'react'
import { Footer } from '@edadma/petalui'

const App: React.FC = () => (
  <Footer className="bg-neutral text-neutral-content p-10">
    <aside>
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
        LOGO
      </div>
      <p>
        ACME Industries Ltd.
        <br />
        Providing reliable tech since 1992
      </p>
    </aside>
    <nav>
      <Footer.Title>Social</Footer.Title>
      <div className="grid grid-flow-col gap-4">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
      </div>
    </nav>
  </Footer>
)

export default App`}
        >
          <Footer className="bg-neutral text-neutral-content p-10">
            <aside>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                LOGO
              </div>
              <p>
                ACME Industries Ltd.
                <br />
                Providing reliable tech since 1992
              </p>
            </aside>
            <nav>
              <Footer.Title>Social</Footer.Title>
              <div className="grid grid-flow-col gap-4">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
              </div>
            </nav>
          </Footer>
        </ExampleSection>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>

        <ApiTable title="Footer" data={footerApi} />

        <h3 className="text-xl font-bold mb-4 mt-8">Subcomponents</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>Footer.Title</code>
                </td>
                <td>Section title heading</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
