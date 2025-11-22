import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ExampleSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  code?: string
  language?: string
  noColumnBreak?: boolean
}

export function ExampleSection({
  title,
  description,
  children,
  code,
  language = 'tsx',
  noColumnBreak = false
}: ExampleSectionProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isDarkTheme = document.documentElement.getAttribute('data-theme')?.includes('dark') ||
                      document.documentElement.getAttribute('data-theme') === 'night' ||
                      document.documentElement.getAttribute('data-theme') === 'dracula' ||
                      document.documentElement.getAttribute('data-theme') === 'synthwave' ||
                      document.documentElement.getAttribute('data-theme') === 'halloween' ||
                      document.documentElement.getAttribute('data-theme') === 'forest' ||
                      document.documentElement.getAttribute('data-theme') === 'black' ||
                      document.documentElement.getAttribute('data-theme') === 'luxury' ||
                      document.documentElement.getAttribute('data-theme') === 'business' ||
                      document.documentElement.getAttribute('data-theme') === 'coffee' ||
                      document.documentElement.getAttribute('data-theme') === 'dim'

  return (
    <div className={`border border-base-content/10 rounded-lg break-inside-avoid mb-4 ${noColumnBreak ? 'inline-block w-full' : ''}`}>
      <div className="p-4 bg-base-100 overflow-visible">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-base-content/70 mt-1">{description}</p>
            )}
          </div>
          {code && (
            <button
              className={`btn btn-sm btn-square ${showCode ? 'btn-active' : 'btn-ghost'}`}
              onClick={() => setShowCode(!showCode)}
              title={showCode ? 'Hide code' : 'Show code'}
            >
              {showCode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              )}
            </button>
          )}
        </div>
        <div className="flex gap-4 flex-wrap items-center">{children}</div>
      </div>
      {code && showCode && (
        <div className="border-t border-base-content/10 bg-base-200 relative">
          <button
            className="btn btn-ghost btn-sm absolute top-2 right-2 z-10"
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            )}
          </button>
          <SyntaxHighlighter
            language={language}
            style={isDarkTheme ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: 'transparent',
            }}
            codeTagProps={{
              style: {
                fontSize: '0.875rem',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  )
}
