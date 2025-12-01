import { Masonry, Card } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const masonryApi: ApiProperty[] = [
  {
    property: 'children',
    description: 'Items to display in masonry layout',
    type: 'React.ReactNode',
  },
  {
    property: 'columns',
    description: 'Number of columns or responsive configuration object',
    type: "number | { xs?: number, sm?: number, md?: number, lg?: number, xl?: number, '2xl'?: number }",
    default: '3',
  },
  {
    property: 'gap',
    description: 'Gap between items (Tailwind gap value)',
    type: 'number | string',
    default: '4',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

export function MasonryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Masonry</h1>
        <p className="text-base-content/70">
          Display items of varying heights in a fluid, column-based layout using CSS columns.
        </p>
      </div>

      <div className="mb-8 p-6 bg-info/10 rounded-lg border border-info/20">
        <h2 className="text-xl font-bold mb-3 text-info">CSS Columns Approach</h2>
        <p className="text-base-content/70 mb-4">
          This component uses CSS multi-column layout (columns) for masonry-style layouts. This
          approach is:
        </p>
        <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
          <li>
            <strong>Production-ready:</strong> Well-supported across all modern browsers
          </li>
          <li>
            <strong>No JavaScript:</strong> Pure CSS solution with automatic reflow
          </li>
          <li>
            <strong>Performant:</strong> Browser-native layout engine handles positioning
          </li>
          <li>
            <strong>Responsive:</strong> Built-in support for responsive column counts
          </li>
        </ul>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Masonry"
          description="Simple masonry layout with 3 columns."
          code={`import React from 'react'
import { Masonry, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <Masonry columns={3} gap={4}>
    <Card title="Short Card">
      <p>Just a little bit of content here.</p>
    </Card>
    <Card title="Tall Card">
      <p className="mb-2">This card has significantly more content...</p>
      <p className="mb-2">The CSS columns approach flows content...</p>
      <p>This creates the characteristic Pinterest-style layout...</p>
    </Card>
    <Card title="Medium Card">
      <p className="mb-2">This card has a moderate amount...</p>
      <p>Notice how the masonry layout automatically fills...</p>
    </Card>
    {/* ... more cards with varying heights */}
  </Masonry>
)

export default App`}
        >
          <Masonry columns={3} gap={4}>
            <Card title="Short Card">
              <p>Just a little bit of content here.</p>
            </Card>
            <Card title="Tall Card">
              <p className="mb-2">
                This card has significantly more content to demonstrate the masonry layout effect.
                When cards have different heights, the masonry algorithm arranges them efficiently
                to minimize empty space.
              </p>
              <p className="mb-2">
                The CSS columns approach flows content from top to bottom within each column, then
                moves to the next column.
              </p>
              <p>
                This creates the characteristic Pinterest-style layout where items of varying
                heights create an organic, flowing appearance.
              </p>
            </Card>
            <Card title="Medium Card">
              <p className="mb-2">
                This card has a moderate amount of content - more than the short card but less than
                the tall one.
              </p>
              <p>
                Notice how the masonry layout automatically fills in gaps and creates a balanced
                appearance.
              </p>
            </Card>
            <Card title="Another Short">
              <p>Compact content.</p>
            </Card>
            <Card title="Variable Height">
              <p className="mb-2">
                Cards with different content lengths showcase the power of masonry layouts.
              </p>
              <p className="mb-2">
                Unlike traditional grids where all items in a row have the same height, masonry
                layouts allow each item to be its natural height.
              </p>
              <p>
                This creates a more dynamic and visually interesting layout, especially for content
                galleries and Pinterest-style interfaces.
              </p>
            </Card>
            <Card title="Tiny">
              <p>Small.</p>
            </Card>
            <Card title="Large Content">
              <p className="mb-2">
                This card demonstrates how the masonry layout handles larger content blocks
                gracefully.
              </p>
              <p>
                The column-based approach ensures efficient use of space while maintaining visual
                balance across all columns.
              </p>
            </Card>
            <Card title="Medium-Sized">
              <p>A reasonable amount of content that fills the card without being too tall.</p>
            </Card>
          </Masonry>
        </ExampleSection>

        <ExampleSection
          title="2 Columns"
          description="Two-column masonry layout."
          code={`import React from 'react'
import { Masonry, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <Masonry columns={2} gap={4}>
    <Card title="Tiny">
      <p>One line.</p>
    </Card>
    <Card title="Very Tall Card">
      <p className="mb-2">This card has significantly more content...</p>
      <p className="mb-2">The CSS columns approach automatically...</p>
      <p className="mb-2">Unlike traditional grids where all items...</p>
      <p className="mb-2">This is perfect for content galleries...</p>
      <p>The two-column version makes the height distribution...</p>
    </Card>
    {/* ... more cards with varying heights */}
  </Masonry>
)

export default App`}
        >
          <Masonry columns={2} gap={4}>
            <Card title="Tiny">
              <p>One line.</p>
            </Card>
            <Card title="Very Tall Card">
              <p className="mb-2">
                This card has significantly more content to demonstrate extreme height variation. In
                a masonry layout, items of dramatically different heights create the characteristic
                flowing appearance that makes these layouts so popular.
              </p>
              <p className="mb-2">
                The CSS columns approach automatically balances content across columns, flowing from
                top to bottom in each column before moving to the next. This creates a natural,
                organic layout.
              </p>
              <p className="mb-2">
                Unlike traditional grids where all items in a row must have equal height, masonry
                layouts allow each item to occupy only the vertical space it needs.
              </p>
              <p className="mb-2">
                This is perfect for content galleries, Pinterest-style layouts, blog post previews,
                and any interface where content items have unpredictable heights.
              </p>
              <p>The two-column version makes the height distribution especially clear.</p>
            </Card>
            <Card title="Short">
              <p className="mb-1">This is line one of brief content.</p>
              <p>And here is line two.</p>
            </Card>
            <Card title="Medium Height">
              <p className="mb-2">
                This card has a moderate amount of content - more than the short cards but
                significantly less than the tall one.
              </p>
              <p className="mb-2">
                Medium height cards help fill gaps and create visual balance in the masonry layout.
              </p>
              <p>They're essential for achieving that organic, flowing appearance.</p>
            </Card>
            <Card title="Compact">
              <p>Three words only.</p>
            </Card>
            <Card title="Tall">
              <p className="mb-2">
                Another tall card to showcase how masonry handles multiple items of varying heights
                within the same layout.
              </p>
              <p className="mb-2">
                Notice how the vertical space is used efficiently, with shorter items fitting
                naturally alongside taller ones.
              </p>
              <p>This creates a balanced, visually appealing layout automatically.</p>
            </Card>
          </Masonry>
        </ExampleSection>

        <ExampleSection
          title="Responsive Columns"
          description="Adjust column count based on screen size."
          code={`import React from 'react'
import { Masonry, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={4}>
    <Card title="Item 1">
      <p>Content here...</p>
    </Card>
    <Card title="Item 2">
      <p>Longer content that spans multiple lines...</p>
    </Card>
    <Card title="Item 3">
      <p>Medium content...</p>
    </Card>
    {/* ... more cards */}
  </Masonry>
)

export default App`}
        >
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={4}>
            <Card title="Card 1">
              <p>This layout automatically adjusts from 1 column on mobile to 5 columns on extra-large screens.</p>
            </Card>
            <Card title="Card 2">
              <p className="mb-2">
                Resize your browser window to see the responsive behavior in action.
              </p>
              <p>
                The masonry layout seamlessly transitions between different column counts while maintaining the characteristic flowing appearance.
              </p>
            </Card>
            <Card title="Card 3">
              <p>Compact content that adapts to any screen size.</p>
            </Card>
            <Card title="Card 4">
              <p className="mb-2">
                On mobile (xs), content stacks in a single column for easy reading.
              </p>
              <p className="mb-2">
                On tablets (sm/md), it expands to 2-3 columns for better use of space.
              </p>
              <p>
                On desktops (lg/xl), it can show 4-5 columns for maximum content density.
              </p>
            </Card>
            <Card title="Card 5">
              <p>Simple content here.</p>
            </Card>
            <Card title="Card 6">
              <p className="mb-2">
                Responsive masonry layouts are perfect for content galleries that need to work across all device sizes.
              </p>
              <p>
                The CSS columns approach handles the responsiveness natively without any JavaScript.
              </p>
            </Card>
            <Card title="Card 7">
              <p>Short text.</p>
            </Card>
            <Card title="Card 8">
              <p className="mb-2">
                Notice how items maintain their natural heights while the number of columns changes.
              </p>
              <p>
                This creates a fluid, adaptive layout that always looks balanced.
              </p>
            </Card>
          </Masonry>
        </ExampleSection>

        <ExampleSection
          title="Custom Gap"
          description="Control spacing between items."
          code={`import React from 'react'
import { Masonry, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold mb-2">Gap: 2 (tight spacing)</h3>
      <Masonry columns={3} gap={2}>
        <Card title="Short"><p>Minimal content.</p></Card>
        <Card title="Very Tall Card">
          <p className="mb-2">This card demonstrates how the gap spacing...</p>
          <p className="mb-2">With gap-2, items are closer together...</p>
          <p className="mb-2">Notice how the different card heights...</p>
          <p>Multiple paragraphs showcase the height variation...</p>
        </Card>
        {/* ... more cards */}
      </Masonry>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Gap: 8 (spacious)</h3>
      <Masonry columns={3} gap={8}>
        <Card title="Short"><p>Minimal content.</p></Card>
        <Card title="Very Tall Card">
          <p className="mb-2">This card demonstrates how the gap spacing...</p>
          <p className="mb-2">With gap-8, items have more breathing room...</p>
          <p className="mb-2">Notice how the increased spacing makes...</p>
          <p>The masonry effect is still prominent...</p>
        </Card>
        {/* ... more cards */}
      </Masonry>
    </div>
  </div>
)

export default App`}
        >
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Gap: 2 (tight spacing)</h3>
              <Masonry columns={3} gap={2}>
                <Card title="Short">
                  <p>Minimal content.</p>
                </Card>
                <Card title="Very Tall Card">
                  <p className="mb-2">
                    This card demonstrates how the gap spacing affects the visual appearance of the
                    masonry layout with tighter spacing.
                  </p>
                  <p className="mb-2">
                    With gap-2, items are closer together, creating a more compact layout that's
                    useful when screen space is limited.
                  </p>
                  <p className="mb-2">
                    Notice how the different card heights create the masonry effect even with tight
                    spacing.
                  </p>
                  <p>Multiple paragraphs showcase the height variation clearly.</p>
                </Card>
                <Card title="Medium Height">
                  <p className="mb-2">
                    This card has moderate content to fill the middle ground between short and tall
                    cards.
                  </p>
                  <p>Two paragraphs total.</p>
                </Card>
                <Card title="Tiny">
                  <p>One line.</p>
                </Card>
                <Card title="Tall">
                  <p className="mb-2">
                    Another tall card to showcase how gap-2 affects spacing between items of varying
                    heights.
                  </p>
                  <p>The tight spacing creates a dense, efficient layout.</p>
                </Card>
                <Card title="Brief">
                  <p>Short content here.</p>
                </Card>
              </Masonry>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Gap: 8 (spacious)</h3>
              <Masonry columns={3} gap={8}>
                <Card title="Short">
                  <p>Minimal content.</p>
                </Card>
                <Card title="Very Tall Card">
                  <p className="mb-2">
                    This card demonstrates how the gap spacing affects the visual appearance of the
                    masonry layout with generous spacing.
                  </p>
                  <p className="mb-2">
                    With gap-8, items have more breathing room, creating an airy, spacious layout
                    that's easier on the eyes.
                  </p>
                  <p className="mb-2">
                    Notice how the increased spacing makes each card feel more distinct and
                    separate.
                  </p>
                  <p>The masonry effect is still prominent with varied heights.</p>
                </Card>
                <Card title="Medium Height">
                  <p className="mb-2">
                    This card has moderate content to fill the middle ground between short and tall
                    cards.
                  </p>
                  <p>Two paragraphs total.</p>
                </Card>
                <Card title="Tiny">
                  <p>One line.</p>
                </Card>
                <Card title="Tall">
                  <p className="mb-2">
                    Another tall card to showcase how gap-8 affects spacing between items of varying
                    heights.
                  </p>
                  <p>The generous spacing creates a more relaxed, readable layout.</p>
                </Card>
                <Card title="Brief">
                  <p>Short content here.</p>
                </Card>
              </Masonry>
            </div>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Images"
          description="Masonry layout with cards containing images of varying heights."
          code={`import React from 'react'
import { Masonry, Card } from '@edadma/bloomui'

const App: React.FC = () => (
  <Masonry columns={3}>
    <Card title="Image Card 1">
      <div className="bg-primary/20 h-32 rounded-lg mb-2 flex items-center justify-center text-sm">
        Tall
      </div>
      <p>Content below image</p>
    </Card>
    <Card title="Image Card 2">
      <div className="bg-secondary/20 h-20 rounded-lg mb-2 flex items-center justify-center text-sm">
        Short
      </div>
      <p>Different height</p>
    </Card>
    <Card title="Image Card 3">
      <div className="bg-accent/20 h-48 rounded-lg mb-2 flex items-center justify-center text-sm">
        Very Tall
      </div>
      <p>More content here</p>
    </Card>
    {/* ... more cards with varying image heights */}
  </Masonry>
)

export default App`}
        >
          <Masonry columns={3}>
            <Card title="Image Card 1">
              <div className="bg-primary/20 h-32 rounded-lg mb-2 flex items-center justify-center text-sm">
                Tall
              </div>
              <p>Content below image</p>
            </Card>
            <Card title="Image Card 2">
              <div className="bg-secondary/20 h-20 rounded-lg mb-2 flex items-center justify-center text-sm">
                Short
              </div>
              <p>Different height</p>
            </Card>
            <Card title="Image Card 3">
              <div className="bg-accent/20 h-48 rounded-lg mb-2 flex items-center justify-center text-sm">
                Very Tall
              </div>
              <p>More content here</p>
            </Card>
            <Card title="Image Card 4">
              <div className="bg-success/20 h-28 rounded-lg mb-2 flex items-center justify-center text-sm">
                Medium
              </div>
              <p>Variable heights</p>
            </Card>
            <Card title="Image Card 5">
              <div className="bg-warning/20 h-40 rounded-lg mb-2 flex items-center justify-center text-sm">
                Tall
              </div>
              <p>Content</p>
            </Card>
            <Card title="Image Card 6">
              <div className="bg-info/20 h-24 rounded-lg mb-2 flex items-center justify-center text-sm">
                Short
              </div>
              <p>More text here</p>
            </Card>
          </Masonry>
        </ExampleSection>

        <ExampleSection
          title="Pinterest-style Gallery"
          description="Classic masonry gallery layout with colored blocks showing height variation."
          code={`import React from 'react'
import { Masonry, Card } from '@edadma/bloomui'

const items = [
  { id: 1, height: 'h-32', bg: 'bg-primary/20', title: 'Gallery 1', desc: 'Short item' },
  { id: 2, height: 'h-72', bg: 'bg-secondary/20', title: 'Gallery 2', desc: 'Very tall item...' },
  { id: 3, height: 'h-24', bg: 'bg-accent/20', title: 'Gallery 3', desc: 'Tiny' },
  { id: 4, height: 'h-56', bg: 'bg-success/20', title: 'Gallery 4', desc: 'Medium height item' },
  { id: 5, height: 'h-40', bg: 'bg-warning/20', title: 'Gallery 5', desc: 'Moderate height' },
  // ... 12 items total with varying heights
]

const App: React.FC = () => (
  <Masonry columns={{ xs: 2, sm: 3, lg: 4, xl: 5 }} gap={3}>
    {items.map((item) => (
      <Card key={item.id} title={item.title}>
        <div className={\`\${item.bg} rounded-lg \${item.height} flex items-center justify-center text-sm font-semibold mb-2\`}>
          {item.height}
        </div>
        <p className="text-sm opacity-70">{item.desc}</p>
      </Card>
    ))}
  </Masonry>
)

export default App`}
        >
          <Masonry columns={{ xs: 2, sm: 3, lg: 4, xl: 5 }} gap={3}>
            {[
              {
                id: 1,
                height: 'h-32',
                bg: 'bg-primary/20',
                title: 'Gallery 1',
                desc: 'Short item',
              },
              {
                id: 2,
                height: 'h-72',
                bg: 'bg-secondary/20',
                title: 'Gallery 2',
                desc: 'Very tall item with more content to demonstrate the masonry effect',
              },
              { id: 3, height: 'h-24', bg: 'bg-accent/20', title: 'Gallery 3', desc: 'Tiny' },
              {
                id: 4,
                height: 'h-56',
                bg: 'bg-success/20',
                title: 'Gallery 4',
                desc: 'Medium height item',
              },
              {
                id: 5,
                height: 'h-40',
                bg: 'bg-warning/20',
                title: 'Gallery 5',
                desc: 'Moderate height',
              },
              { id: 6, height: 'h-28', bg: 'bg-info/20', title: 'Gallery 6', desc: 'Small' },
              {
                id: 7,
                height: 'h-64',
                bg: 'bg-error/20',
                title: 'Gallery 7',
                desc: 'Tall item showing height variation',
              },
              {
                id: 8,
                height: 'h-36',
                bg: 'bg-primary/30',
                title: 'Gallery 8',
                desc: 'Medium-small',
              },
              {
                id: 9,
                height: 'h-48',
                bg: 'bg-secondary/30',
                title: 'Gallery 9',
                desc: 'Mid-size item',
              },
              {
                id: 10,
                height: 'h-20',
                bg: 'bg-accent/30',
                title: 'Gallery 10',
                desc: 'Very short',
              },
              {
                id: 11,
                height: 'h-60',
                bg: 'bg-success/30',
                title: 'Gallery 11',
                desc: 'Large item to showcase the layout',
              },
              {
                id: 12,
                height: 'h-44',
                bg: 'bg-warning/30',
                title: 'Gallery 12',
                desc: 'Medium height',
              },
            ].map((item) => (
              <Card key={item.id} title={item.title}>
                <div
                  className={`${item.bg} rounded-lg ${item.height} flex items-center justify-center text-sm font-semibold mb-2`}
                >
                  {item.height}
                </div>
                <p className="text-sm opacity-70">{item.desc}</p>
              </Card>
            ))}
          </Masonry>
        </ExampleSection>

        <ExampleSection
          title="Simple Div Items"
          description="Masonry works with any content, not just cards."
          code={`import React from 'react'
import { Masonry } from '@edadma/bloomui'

const App: React.FC = () => (
  <Masonry columns={4} gap={3}>
    <div className="bg-primary text-primary-content p-4 rounded-lg">
      <h3 className="font-bold">Item 1</h3>
      <p>One line</p>
    </div>
    <div className="bg-secondary text-secondary-content p-4 rounded-lg">
      <h3 className="font-bold">Item 2</h3>
      <p>
        Line one<br />
        Line two<br />
        Line three<br />
        Line four<br />
        Line five
      </p>
    </div>
    <div className="bg-accent text-accent-content p-4 rounded-lg">
      <h3 className="font-bold">Item 3</h3>
      <p>One line</p>
    </div>
    {/* ... 8 items total with varying line counts */}
  </Masonry>
)

export default App`}
        >
          <Masonry columns={4} gap={3}>
            <div className="bg-primary text-primary-content p-4 rounded-lg">
              <h3 className="font-bold">Item 1</h3>
              <p>One line</p>
            </div>
            <div className="bg-secondary text-secondary-content p-4 rounded-lg">
              <h3 className="font-bold">Item 2</h3>
              <p>
                Line one<br />
                Line two<br />
                Line three<br />
                Line four<br />
                Line five
              </p>
            </div>
            <div className="bg-accent text-accent-content p-4 rounded-lg">
              <h3 className="font-bold">Item 3</h3>
              <p>One line</p>
            </div>
            <div className="bg-success text-success-content p-4 rounded-lg">
              <h3 className="font-bold">Item 4</h3>
              <p>
                Line one<br />
                Line two
              </p>
            </div>
            <div className="bg-warning text-warning-content p-4 rounded-lg">
              <h3 className="font-bold">Item 5</h3>
              <p>
                Line one<br />
                Line two<br />
                Line three
              </p>
            </div>
            <div className="bg-info text-info-content p-4 rounded-lg">
              <h3 className="font-bold">Item 6</h3>
              <p>One line</p>
            </div>
            <div className="bg-error text-error-content p-4 rounded-lg">
              <h3 className="font-bold">Item 7</h3>
              <p>
                Line one<br />
                Line two<br />
                Line three<br />
                Line four
              </p>
            </div>
            <div className="bg-primary text-primary-content p-4 rounded-lg">
              <h3 className="font-bold">Item 8</h3>
              <p>
                Line one<br />
                Line two
              </p>
            </div>
          </Masonry>
        </ExampleSection>
      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Masonry" data={masonryApi} />

        <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
          <h3 className="text-lg font-bold mb-2 text-info">How It Works</h3>
          <p className="text-sm text-base-content/70 mb-3">
            The Masonry component uses CSS multi-column layout under the hood:
          </p>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
            <li>
              <strong>Columns:</strong> Uses Tailwind's{' '}
              <span className="font-mono text-xs">columns-*</span> utilities
            </li>
            <li>
              <strong>Break Control:</strong> Applies{' '}
              <span className="font-mono text-xs">break-inside-avoid</span> to prevent items from
              splitting
            </li>
            <li>
              <strong>Responsive:</strong> Supports different column counts at each breakpoint (xs,
              sm, md, lg, xl, 2xl)
            </li>
            <li>
              <strong>Gap:</strong> Uses Tailwind's <span className="font-mono text-xs">gap-*</span>{' '}
              utilities for spacing
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <h3 className="text-lg font-bold mb-2 text-warning">Best Practices</h3>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
            <li>Items are arranged top-to-bottom, then left-to-right (column-first order)</li>
            <li>Best for static content where item order is less critical</li>
            <li>
              Each child automatically gets{' '}
              <span className="font-mono text-xs">break-inside-avoid</span> and bottom margin
            </li>
            <li>Works great with cards, images, and any variable-height content</li>
            <li>No JavaScript required - pure CSS solution</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
