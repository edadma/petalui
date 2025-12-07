import { createRoot } from 'react-dom/client'
import React, { useState } from 'react'
import { Masonry, Button } from 'asterui'
import { CheckIconSvg } from './icons'

const COLORS = ['#0092ff', '#00d084', '#ff6b6b', '#ffd93d', '#a29bfe', '#fd79a8']
const HEIGHTS = [100, 120, 140, 160, 180, 200]

interface Item { id: number; color: string; height: number }

function DynamicMasonryDemo() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, color: COLORS[0], height: 120 },
    { id: 2, color: COLORS[1], height: 180 },
    { id: 3, color: COLORS[2], height: 140 },
  ])
  const [nextId, setNextId] = useState(4)

  const addItem = () => {
    setItems([...items, {
      id: nextId,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      height: HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)],
    }])
    setNextId(nextId + 1)
  }

  const removeItem = (id: number) => setItems(items.filter(item => item.id !== id))

  return (
    <div>
      <div className="mb-4">
        <Button type="primary" onClick={addItem}>Add Item</Button>
      </div>
      <Masonry columns={3} gap={16}>
        {items.map(item => (
          <div
            key={item.id}
            className="relative rounded-lg"
            style={{ background: item.color, padding: '16px', color: 'white', height: item.height }}
          >
            <Button
              type="ghost"
              size="sm"
              shape="circle"
              className="absolute top-1 right-1 min-h-0 h-6 w-6 text-white hover:bg-black/20"
              onClick={() => removeItem(item.id)}
            >
              ×
            </Button>
            Item {item.id}
          </div>
        ))}
      </Masonry>
    </div>
  )
}

// Demo components for each example
const demos: Record<string, React.ReactNode> = {
  dynamic: <DynamicMasonryDemo />,
  basic: (
    <Masonry columns={3} gap={16}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white', height: '120px' }}>
        Item 1
      </div>
      <div style={{ background: '#00d084', padding: '16px', color: 'white', height: '180px' }}>
        Item 2
      </div>
      <div style={{ background: '#ff6b6b', padding: '16px', color: 'white', height: '140px' }}>
        Item 3
      </div>
      <div style={{ background: '#ffd93d', padding: '16px', color: 'white', height: '200px' }}>
        Item 4
      </div>
      <div style={{ background: '#a29bfe', padding: '16px', color: 'white', height: '160px' }}>
        Item 5
      </div>
      <div style={{ background: '#fd79a8', padding: '16px', color: 'white', height: '130px' }}>
        Item 6
      </div>
    </Masonry>
  ),
  responsive: (
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white', height: '120px' }}>
        Item 1
      </div>
      <div style={{ background: '#00d084', padding: '16px', color: 'white', height: '180px' }}>
        Item 2
      </div>
      <div style={{ background: '#ff6b6b', padding: '16px', color: 'white', height: '140px' }}>
        Item 3
      </div>
      <div style={{ background: '#ffd93d', padding: '16px', color: 'white', height: '200px' }}>
        Item 4
      </div>
      <div style={{ background: '#a29bfe', padding: '16px', color: 'white', height: '160px' }}>
        Item 5
      </div>
      <div style={{ background: '#fd79a8', padding: '16px', color: 'white', height: '130px' }}>
        Item 6
      </div>
      <div style={{ background: '#74b9ff', padding: '16px', color: 'white', height: '150px' }}>
        Item 7
      </div>
      <div style={{ background: '#fab1a0', padding: '16px', color: 'white', height: '170px' }}>
        Item 8
      </div>
    </Masonry>
  ),
  'custom-gap': (
    <Masonry columns={3} gap={32}>
      <div style={{ background: '#0092ff', padding: '16px', color: 'white', height: '120px' }}>
        Item 1
      </div>
      <div style={{ background: '#00d084', padding: '16px', color: 'white', height: '180px' }}>
        Item 2
      </div>
      <div style={{ background: '#ff6b6b', padding: '16px', color: 'white', height: '140px' }}>
        Item 3
      </div>
      <div style={{ background: '#ffd93d', padding: '16px', color: 'white', height: '200px' }}>
        Item 4
      </div>
      <div style={{ background: '#a29bfe', padding: '16px', color: 'white', height: '160px' }}>
        Item 5
      </div>
      <div style={{ background: '#fd79a8', padding: '16px', color: 'white', height: '130px' }}>
        Item 6
      </div>
    </Masonry>
  ),
}

// Mount React demos
document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && demos[exampleId]) {
    const root = createRoot(container as HTMLElement)
    root.render(demos[exampleId])
  }
})

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML =
        CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
